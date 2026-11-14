import { page, esc, C, A, timeline, reelBackdrop, SPIN_CSS, outro } from '../src/brand.js';

// "Clear prices" — a quote that fills itself in line by line.
// Prices are optional: only real Unix prices, never invented. Without prices it explains what's included.
export default {
  name: 'price-breakdown',
  kind: 'video',
  size: { w: 1080, h: 1920 },
  duration: 13,
  igPostType: 'post',
  example: {
    hook: 'What’s really inside a website price?',
    title: 'A website for a small business',
    items: [
      { label: 'A plan for what your clients need', price: '' },
      { label: 'Design that looks like you', price: '' },
      { label: 'Words that say what you do', price: '' },
      { label: 'Built to load fast on a phone', price: '' },
      { label: 'Found on Google and ChatGPT', price: '' }
    ],
    total: 'Fixed price, in writing, within 48 hours',
    closing: 'Clear prices. No surprises.'
  },
  build(f) {
    const D = this.duration;
    const tl = timeline(D);
    const items = f.items.slice(0, 6);
    const step = 5.4 / items.length;
    const rows = items
      .map((it, i) => {
        const from = 3.4 + i * step;
        return `<div style="display:flex;justify-content:space-between;align-items:baseline;gap:24px;padding:22px 0;border-bottom:3px dashed ${C.mascot};${tl.show(from, D, { dy: 24 })}">
          <div style="display:flex;gap:18px;align-items:baseline"><span style="color:${C.accent};font-weight:700">✓</span><span>${esc(it.label)}</span></div>
          ${it.price ? `<span style="font-weight:700;white-space:nowrap">${esc(it.price)}</span>` : ''}</div>`;
      })
      .join('');
    const body = `
<img src="${A.blobTop}" class="abs" style="left:0;top:0;width:1080px">
<img src="${A.blobBottom}" class="abs" style="left:0;bottom:0;width:1080px">
${reelBackdrop(70)}
<div class="abs display" style="left:80px;right:80px;top:640px;text-align:center;font-size:96px;${tl.show(0.2, 3)}">${esc(f.hook)}</div>
<div class="abs" style="left:80px;right:80px;top:440px;background:${C.cream};color:${C.dark};border-radius:48px;padding:56px 52px;box-shadow:0 30px 60px rgba(30,33,64,.25);${tl.show(2.6, 10.8, { dy: 240 })}">
  <div style="display:flex;justify-content:space-between;align-items:center"><div style="font-weight:700;font-size:30px;letter-spacing:.08em;text-transform:uppercase;opacity:.7">Quote</div><img src="${A.logoBlue}" style="height:70px"></div>
  <div style="font-weight:700;font-size:52px;line-height:1.1;margin:30px 0 16px">${esc(f.title)}</div>
  <div style="font-weight:600;font-size:38px;line-height:1.2">${rows}</div>
  <div style="margin-top:36px;background:${C.primary};color:${C.cream};border-radius:28px;padding:30px 34px;font-weight:700;font-size:42px;line-height:1.15;${tl.show(9, D, { dy: 20, scale: 0.9 })}">${esc(f.total)}</div>
</div>
${outro(tl, 11, f.closing, D)}`;
    return page({ ...this.size, bg: C.primary, body, css: SPIN_CSS + tl.css });
  }
};
