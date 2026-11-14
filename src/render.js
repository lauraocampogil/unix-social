// Renders a template + fields to PNG (image / carousel) or MP4 (video).
// Videos are rendered frame by frame: all CSS animations are paused and seeked,
// so the output is identical every time, whatever the machine speed.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, writeFile, rm, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { captureScroll, captureStill } from './capture.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { templates } from '../templates/index.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = path.join(ROOT, 'assets');
const FPS = Number(process.env.VIDEO_FPS || 30);

let browserPromise;
const browser = () => (browserPromise ??= chromium.launch({ args: ['--font-render-hinting=none'] }));
export async function closeBrowser() {
  if (browserPromise) (await browserPromise).close();
  browserPromise = undefined;
}

async function openPage(html, size) {
  // HTML is written next to the assets so relative urls (fonts, svg) resolve.
  const file = path.join(ASSETS, `.render-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}.html`);
  await writeFile(file, html);
  const ctx = await (await browser()).newContext({ viewport: { width: size.w, height: size.h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto('file://' + file);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => (i.onload = i.onerror = r)))));
  });
  return { page, ctx, cleanup: async () => { await ctx.close(); await rm(file, { force: true }); } };
}

async function shot(html, size, out) {
  const { page, cleanup } = await openPage(html, size);
  await page.evaluate(() => document.getAnimations().forEach((a) => { a.pause(); a.currentTime = 0; }));
  await page.locator('#frame').screenshot({ path: out, type: 'png' });
  await cleanup();
  return out;
}

// Background music: any .mp3/.m4a in assets/music (royalty-free). Same post → same track.
async function pickMusic(seed) {
  const dir = path.join(ASSETS, 'music');
  if (!existsSync(dir)) return null;
  const tracks = (await readdir(dir)).filter((f) => /\.(mp3|m4a|wav)$/i.test(f)).sort();
  if (!tracks.length) return null;
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return path.join(dir, tracks[h % tracks.length]);
}

async function video(html, size, seconds, out, seed = '') {
  const { page, cleanup } = await openPage(html, size);
  await page.evaluate(() => document.getAnimations().forEach((a) => a.pause()));
  const music = await pickMusic(seed);
  const audioIn = music ? ['-stream_loop', '-1', '-i', music] : ['-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo'];
  const audioFx = music ? ['-af', `volume=0.7,afade=t=in:d=0.6,afade=t=out:st=${Math.max(0, seconds - 1.5)}:d=1.5`] : [];
  const ff = spawn('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    ...audioIn,
    '-t', String(seconds), '-map', '0:v', '-map', '1:a', ...audioFx,
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'medium', '-crf', '18',
    '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', out
  ], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => ff.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg exited ' + c)))));
  const frames = Math.round(seconds * FPS);
  for (let i = 0; i < frames; i++) {
    const t = (i / FPS) * 1000;
    await page.evaluate(async (ms) => {
      document.getAnimations().forEach((a) => (a.currentTime = ms));
      // Website captures: <img data-frames="dir" data-count data-fps data-start> shows the frame for this time.
      const waits = [];
      for (const img of document.querySelectorAll('img[data-frames]')) {
        const n = Number(img.dataset.count), fps = Number(img.dataset.fps), st = Number(img.dataset.start || 0);
        const idx = Math.max(0, Math.min(n - 1, Math.floor((ms / 1000 - st) * fps)));
        const src = `${img.dataset.frames}/${String(idx).padStart(4, '0')}.jpg`;
        if (!img.src.endsWith(src)) { waits.push(new Promise((r) => { img.onload = img.onerror = r; })); img.src = src; }
      }
      await Promise.all(waits);
    }, t);
    const buf = await page.locator('#frame').screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await done;
  await cleanup();
  return out;
}

/**
 * @returns {Promise<{kind:'image'|'carousel'|'video', files:string[], template:object}>}
 */
export async function render(templateName, fields, outDir, slug = 'post') {
  const tpl = templates[templateName];
  if (!tpl) throw new Error(`Unknown template "${templateName}". Available: ${Object.keys(templates).join(', ')}`);
  await mkdir(outDir, { recursive: true });
  let merged = { ...tpl.example, ...fields };
  // Templates that show a real website capture it first (frames saved next to the assets, removed after).
  const capDir = path.join(ASSETS, `.cap-${process.pid}-${Date.now()}`);
  if (tpl.prepare) {
    const helpers = {
      scroll: async (url, opts) => {
        const name = `scroll-${Math.random().toString(36).slice(2, 8)}`;
        const r = await captureScroll(url, path.join(capDir, name), opts);
        return { frames: `${path.basename(capDir)}/${name}`, count: r.count, fps: r.fps };
      },
      // A video clip from assets/broll → frames (cropped to 9:16), so the page can show it frame by frame.
      clip: async (file, { seconds, from = 0 } = {}) => {
        const name = `clip-${Math.random().toString(36).slice(2, 8)}`;
        const dir = path.join(capDir, name);
        await mkdir(dir, { recursive: true });
        const src = path.isAbsolute(file) ? file : path.join(ASSETS, 'broll', file);
        if (!existsSync(src)) throw new Error(`B-roll clip not found: ${file} (put it in assets/broll)`);
        await new Promise((res, rej) => {
          const p = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(from), '-stream_loop', '-1', '-i', src, '-t', String(seconds),
            '-vf', `scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=${FPS}`, '-q:v', '3', '-start_number', '0', path.join(dir, '%04d.jpg')]);
          p.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg clip ' + c))));
        });
        const count = (await readdir(dir)).length;
        return { frames: `${path.basename(capDir)}/${name}`, count, fps: FPS };
      },
      still: async (url, opts) => {
        await mkdir(capDir, { recursive: true });
        const name = `still-${Math.random().toString(36).slice(2, 8)}.jpg`;
        await captureStill(url, path.join(capDir, name), opts);
        return `${path.basename(capDir)}/${name}`;
      }
    };
    merged = await tpl.prepare(merged, helpers);
  }
  const built = tpl.build(merged);
  const files = [];
  try {
  if (tpl.kind === 'video') {
    files.push(await video(built, tpl.size, Number(fields.duration || tpl.duration), path.join(outDir, `${slug}.mp4`), `${templateName}:${JSON.stringify(fields).length}:${slug}`));
  } else {
    const pages = Array.isArray(built) ? built : [built];
    for (let i = 0; i < pages.length; i++) {
      const name = pages.length > 1 ? `${slug}-${String(i + 1).padStart(2, '0')}.png` : `${slug}.png`;
      files.push(await shot(pages[i], tpl.size, path.join(outDir, name)));
    }
  }
  } finally {
    await rm(capDir, { recursive: true, force: true });
  }
  return { kind: tpl.kind, files, template: tpl };
}
