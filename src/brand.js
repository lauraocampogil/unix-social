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
