// Renders a template + fields to PNG (image / carousel) or MP4 (video).
// Videos are rendered frame by frame: all CSS animations are paused and seeked,
// so the output is identical every time, whatever the machine speed.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, writeFile, rm } from 'node:fs/promises';
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

async function video(html, size, seconds, out) {
  const { page, cleanup } = await openPage(html, size);
  await page.evaluate(() => document.getAnimations().forEach((a) => a.pause()));
  const ff = spawn('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo',
    '-shortest', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'medium', '-crf', '18',
    '-c:a', 'aac', '-b:a', '64k', '-movflags', '+faststart', out
  ], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => ff.on('close', (c) => (c === 0 ? res() : rej(new Error('ffmpeg exited ' + c)))));
  const frames = Math.round(seconds * FPS);
  for (let i = 0; i < frames; i++) {
    const t = (i / FPS) * 1000;
    await page.evaluate((ms) => document.getAnimations().forEach((a) => (a.currentTime = ms)), t);
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
  const built = tpl.build({ ...tpl.example, ...fields });
  const files = [];
  if (tpl.kind === 'video') {
    files.push(await video(built, tpl.size, Number(fields.duration || tpl.duration), path.join(outDir, `${slug}.mp4`)));
  } else {
    const pages = Array.isArray(built) ? built : [built];
    for (let i = 0; i < pages.length; i++) {
      const name = pages.length > 1 ? `${slug}-${String(i + 1).padStart(2, '0')}.png` : `${slug}.png`;
      files.push(await shot(pages[i], tpl.size, path.join(outDir, name)));
    }
  }
  return { kind: tpl.kind, files, template: tpl };
}
