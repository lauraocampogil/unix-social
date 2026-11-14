// Unix Studio brand: colors, fonts, assets and a few shared building blocks.
// Rules (do not break):
//  - Blob pattern only in blue (#466FF8 / #6B8BF7) and only on the #94ADFF background.
//  - Mascot eyes are always transparent. Mascot is #CEDAFF or the translucent "ghost" version.
//  - Numbered / arrow flowers use the eyeless badge shape (pink, accent or cream).

export const C = {
  primary: '#94ADFF',
  accent: '#6B8BF7',
  dark: '#466FF8',
  violet: '#8F7DFF',
  pink: '#FFBCF9',
  cream: '#FEFBF4',
  mascot: '#CEDAFF'
};

export const A = {
  logoCream: 'logo-cream.svg',
  logoBlue: 'logo-blue.svg',
  blobTop: 'blob-top.svg',
  blobBottom: 'blob-bottom.svg',
  mascot: 'm-cedaff.svg',
  ghost: 'm-ghost.svg',
  mascotCream: 'm-cream.svg',
  badgePink: 'b-pink.svg',
  badgeAccent: 'b-accent.svg',
  badgeCream: 'b-cream.svg'
};

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function page({ w, h, bg, body, css = '' }) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<style>
@font-face{font-family:"Apfel Grotezk";src:url(ApfelGrotezk-Satt.woff2) format("woff2");font-weight:900}
@font-face{font-family:"Haskoy";src:url(Haskoy-Medium.woff2) format("woff2");font-weight:500}
@font-face{font-family:"Haskoy";src:url(Haskoy-Bold.woff2) format("woff2");font-weight:700}
@font-face{font-family:"Haskoy";src:url(Haskoy-SemiBoldItalic.woff2) format("woff2");font-weight:600;font-style:italic}
@font-face{font-family:"TikTok Sans";src:url(tiktok-sans-latin-700-normal.woff2) format("woff2");font-weight:700}
@font-face{font-family:"TikTok Sans";src:url(tiktok-sans-latin-800-normal.woff2) format("woff2");font-weight:800}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
#frame{width:${w}px;height:${h}px;position:relative;overflow:hidden;background:${bg};font-family:Haskoy,system-ui,sans-serif;color:${C.cream}}
.display{font-family:"Apfel Grotezk",sans-serif;font-weight:900;text-transform:uppercase;line-height:.95}
.abs{position:absolute}
${css}
</style></head><body><div id="frame">${body}</div></body></html>`;
}

export const badge = (src, label, size = 96, color = C.cream, fs = 34) =>
  `<div style="position:relative;width:${size}px;height:${Math.round(size * 0.96)}px;flex-shrink:0;display:flex;align-items:center;justify-content:center"><img src="${src}" style="position:absolute;inset:0;width:100%;height:100%"><span style="position:relative;font-weight:700;font-size:${fs}px;color:${color}">${label}</span></div>`;

const ARROWS = { right: 'M5 12h14M13 6l6 6-6 6', left: 'M19 12H5M11 6l-6 6 6 6', down: 'M12 5v14M6 13l6 6 6-6' };
export const arrowBadge = (src, dir, stroke, size = 104) =>
  `<div style="position:relative;width:${size}px;height:${Math.round(size * 0.96)}px;flex-shrink:0;display:flex;align-items:center;justify-content:center"><img src="${src}" style="position:absolute;inset:0;width:100%;height:100%"><svg width="${Math.round(size * 0.38)}" height="${Math.round(size * 0.38)}" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" style="position:relative"><path d="${ARROWS[dir]}"/></svg></div>`;

export const centeredLogo = (top = 90, width = 240, src = A.logoCream) =>
  `<img src="${src}" class="abs" style="left:${(1080 - width) / 2}px;top:${top}px;width:${width}px">`;

// ---------- Video helpers (used by the faceless reel templates) ----------

/**
 * Timeline for one video of D seconds. tl.show(from, to) returns an inline style that fades/slides an element
 * in at `from` and out at `to` (seconds). `to >= D` keeps it on screen until the end. Put tl.css in the page css.
 */
export function timeline(D) {
  let css = '';
  let n = 0;
  const pct = (s) => Math.max(0, Math.min(100, (s / D) * 100)).toFixed(2);
  return {
    get css() { return css; },
    show(from, to = D, { dy = 40, scale = 1, fade = 0.45 } = {}) {
      const k = `t${n++}`;
      const hidden = `opacity:0;transform:translateY(${dy}px) scale(${scale})`;
      const out = to >= D ? '' : `${pct(to - 0.01)}%{opacity:1;transform:none}${pct(to + fade * 0.6)}%,100%{opacity:0;transform:translateY(${-dy / 2}px)}`;
      css += `@keyframes ${k}{0%,${pct(from)}%{${hidden}}${pct(from + fade)}%{opacity:1;transform:none}${out}${to >= D ? '100%{opacity:1;transform:none}' : ''}}\n`;
      return `opacity:0;animation:${k} ${D}s cubic-bezier(.2,.8,.2,1) infinite both`;
    },
    /** Raw keyframes helper: steps = [[seconds, 'css'], ...] */
    keys(steps) {
      const k = `t${n++}`;
      css += `@keyframes ${k}{${steps.map(([s, v]) => `${pct(s)}%{${v}}`).join('')}}\n`;
      return `animation:${k} ${D}s cubic-bezier(.2,.8,.2,1) infinite both`;
    }
  };
}

/**
 * Phone mockup showing a website: either live-capture frames (f._cap from prepare) or a tall still image
 * (f.captureImage, path relative to assets) scrolled with CSS. Returns HTML.
 */
export function phoneScreen({ f, tl, x, y, w = 560, start = 0, scrollFrom = 0, scrollTo, D }) {
  const h = Math.round(w * 2.164);
  const sw = w - 36, sh = h - 36;
  let inner = '';
  if (f._cap) {
    inner = `<img data-frames="${f._cap.frames}" data-count="${f._cap.count}" data-fps="${f._cap.fps}" data-start="${start}" src="${f._cap.frames}/0000.jpg" style="width:100%;height:100%;object-fit:cover;object-position:top">`;
  } else if (f.captureImage) {
    const end = scrollTo ?? D;
    const style = tl.keys([[0, 'transform:translateY(0)'], [start + 1, 'transform:translateY(0)'], [end, `transform:translateY(calc(-100% + ${sh}px))`], [D, `transform:translateY(calc(-100% + ${sh}px))`]]);
    inner = `<img src="${f.captureImage}" style="width:100%;display:block;${style}">`;
  } else {
    inner = `<div style="width:100%;height:100%;background:${C.cream};display:flex;align-items:center;justify-content:center;color:${C.dark};font-size:30px;font-weight:700;text-align:center;padding:40px">${esc(f.url || 'website')}</div>`;
  }
  return `<div class="abs" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:72px;background:#1E2140;padding:18px;box-shadow:0 40px 80px rgba(30,33,64,.35)">
  <div style="width:${sw}px;height:${sh}px;border-radius:56px;overflow:hidden;background:#fff;position:relative">${inner}
    <div style="position:absolute;left:50%;top:14px;transform:translateX(-50%);width:150px;height:40px;border-radius:24px;background:#1E2140"></div>
  </div></div>`;
}

/** Shared reel chrome: soft ghost mascots + logo. */
export const reelBackdrop = (logoTop = 80) => `
<img src="${A.ghost}" class="abs" style="right:-280px;bottom:-240px;width:920px;animation:spin 48s linear infinite">
<img src="${A.ghost}" class="abs" style="left:-200px;top:160px;width:440px;animation:spin 36s linear infinite reverse">
${centeredLogo(logoTop, 220)}`;
export const SPIN_CSS = '@keyframes spin{to{transform:rotate(360deg)}}';

/** Closing card used at the end of every reel. */
export const outro = (tl, from, line, D) => `
<div class="abs" style="left:0;right:0;top:0;bottom:0;background:${C.primary};${tl.show(from, D, { dy: 0 })}">
  <img src="${A.blobTop}" class="abs" style="left:0;top:0;width:1080px">
  <img src="${A.blobBottom}" class="abs" style="left:0;bottom:0;width:1080px">
  <img src="${A.mascot}" class="abs" style="left:390px;top:560px;width:300px;${tl.show(from + 0.2, D, { dy: 60, scale: 0.6 })}">
  <img src="${A.logoCream}" class="abs" style="left:290px;top:900px;width:500px">
  <div class="abs" style="left:110px;right:110px;top:1120px;display:flex;flex-direction:column;align-items:center;gap:22px;text-align:center">
    <div style="font-weight:700;font-size:46px;line-height:1.2">${esc(line)}</div>
    <div style="font-weight:500;font-size:38px;opacity:.9">unixcreativestudio.com</div>
  </div>
</div>`;

// ---------- Organic / native TikTok look (no brand chrome) ----------

/** Caption the way TikTok's own text tool draws it. style: 'box' (white boxes, black text) | 'plain' (white text, soft outline). */
export function nativeCaption(text, { style = 'box', size = 58, align = 'center' } = {}) {
  const t = esc(text);
  if (style === 'plain') {
    return `<div style="font-family:'TikTok Sans',sans-serif;font-weight:800;font-size:${size}px;line-height:1.18;color:#fff;text-align:${align};text-shadow:0 0 3px #000,0 0 6px rgba(0,0,0,.6),0 2px 2px rgba(0,0,0,.7)">${t}</div>`;
  }
  return `<div style="text-align:${align};line-height:1.42"><span style="font-family:'TikTok Sans',sans-serif;font-weight:700;font-size:${size}px;background:#fff;color:#161823;padding:6px 18px;border-radius:14px;-webkit-box-decoration-break:clone;box-decoration-break:clone">${t}</span></div>`;
}

/** A full-screen clip made of frames (from prepare) with optional slow push-in, or a still fallback. */
export function fullscreenFrames(cap, { start = 0, tl, D, zoom = true } = {}) {
  const z = zoom && tl ? tl.keys([[0, 'transform:scale(1)'], [D, 'transform:scale(1.06)']]) : '';
  if (!cap) return '';
  if (cap.frames) return `<img data-frames="${cap.frames}" data-count="${cap.count}" data-fps="${cap.fps}" data-start="${start}" src="${cap.frames}/0000.jpg" class="abs" style="left:0;top:0;width:1080px;height:1920px;object-fit:cover;${z}">`;
  return `<img src="${cap}" class="abs" style="left:0;top:0;width:1080px;height:1920px;object-fit:cover;${z}">`;
}
