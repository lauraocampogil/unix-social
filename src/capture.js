// Captures real websites for the video templates (client-showcase, site-review, site-fix, founder-diary).
// A capture = a folder of JPEG frames of the live site scrolling smoothly in a phone-size viewport.
// Recording the live page (instead of one full-page screenshot) keeps animated / GSAP sites working.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const FPS = Number(process.env.VIDEO_FPS || 30);
const COOKIE_WORDS = /cookie|consent|gdpr|rgpd|privacy/i;

async function hideClutter(page) {
  await page.evaluate((src) => {
    const re = new RegExp(src, 'i');
    for (const el of document.querySelectorAll('body *')) {
      const s = getComputedStyle(el);
      const fixed = s.position === 'fixed' || s.position === 'sticky';
      const label = `${el.id} ${typeof el.className === 'string' ? el.className : ''}`;
      if (re.test(label) || (fixed && re.test((el.innerText || '').slice(0, 300)) && el.innerText.length < 1500)) el.style.setProperty('display', 'none', 'important');
    }
    document.documentElement.style.scrollBehavior = 'auto';
  }, COOKIE_WORDS.source);
}

const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/**
 * Records `seconds` of the site scrolling from top to (at most) `maxScroll` px.
 * @returns {{dir:string, count:number, fps:number}} frames named 0000.jpg, 0001.jpg …
 */
export async function captureScroll(url, outDir, { seconds = 10, width = 390, height = 844, holdStart = 1, maxScroll = 4200 } = {}) {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'en-US' });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => page.waitForLoadState('load'));
    await page.waitForTimeout(1500);
    await hideClutter(page);
    // Pre-scroll once so lazy images and scroll animations are loaded, then back to top.
    const total = await page.evaluate(async () => {
      const h = document.documentElement.scrollHeight;
      for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 600));
      return document.documentElement.scrollHeight - window.innerHeight;
    });
    await hideClutter(page);
    const distance = Math.max(0, Math.min(total, maxScroll));
    const count = Math.round(seconds * FPS);
    const hold = Math.round(holdStart * FPS);
    for (let i = 0; i < count; i++) {
      const p = i < hold ? 0 : ease((i - hold) / Math.max(1, count - hold - 1));
      await page.evaluate((y) => new Promise((r) => { window.scrollTo(0, y); requestAnimationFrame(() => requestAnimationFrame(r)); }), Math.round(p * distance));
      await page.screenshot({ path: path.join(outDir, `${String(i).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 85 });
    }
    return { dir: outDir, count, fps: FPS };
  } finally {
    await browser.close();
  }
}

/** One screenshot of the top of the page (phone size). */
export async function captureStill(url, outFile, { width = 390, height = 844, scrollTo = 0 } = {}) {
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => page.waitForLoadState('load'));
    await page.waitForTimeout(1500);
    await hideClutter(page);
    if (scrollTo) { await page.evaluate((y) => window.scrollTo(0, y), scrollTo); await page.waitForTimeout(800); }
    await page.screenshot({ path: outFile, type: 'jpeg', quality: 88 });
    return outFile;
  } finally {
    await browser.close();
  }
}
