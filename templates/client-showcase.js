import { page, esc, C, A, timeline, phoneScreen, reelBackdrop, SPIN_CSS, outro } from '../src/brand.js';

// "Bloom a business" — a real client website scrolling in a phone, with before / after captions.
// The robot records the live site from `url`. Only real clients and real facts (from the Clients base).
export default {
  name: 'client-showcase',
  kind: 'video',
  size: { w: 1080, h: 1920 },
  duration: 15,
  igPostType: 'post',
  example: {
    url: 'https://yaniswash.be',
    business: 'Yaniswash',
    sector: 'Carwash · Brussels',
    hook: 'This carwash had no website.',
    before: 'People called all day just to ask the price.',
    after: 'Now the prices are online. One button to book.',
    closing: 'Small business, big bloom.'
  },
  async prepare(f, cap) {
    if (f.url && !f.captureImage) f._cap = await cap.scroll(f.url, { seconds: 10, holdStart: 1.2 });
    return f;
  },
  build(f) {
    const D = this.duration;
    const tl = timeline(D);
    const caption = (text, from, to) =>
      `<div class="abs display" style="left:80px;right:80px;top:250px;height:300px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:${text.length > 34 ? 74 : 92}px;${tl.show(from, to)}">${esc(text)}</div>`;
    const body = `
<img src="${A.blobTop}" class="abs" style="left:0;top:0;width:1080px">
<img src="${A.blobBottom}" class="abs" style="left:0;bottom:0;width:1080px">
${reelBackdrop(70)}
${caption(f.hook, 0.2, 4.4)}
${caption(f.before, 4.6, 8.2)}
${caption(f.after, 8.4, 12)}
<div style="${tl.show(2.2, D, { dy: 400 })}" class="abs">${phoneScreen({ f, tl, x: 270, y: 590, w: 540, start: 2.4, scrollTo: 12, D })}</div>
<div class="abs" style="left:0;right:0;top:1790px;display:flex;justify-content:center;${tl.show(2.8, D)}">
  <div style="background:${C.cream};color:${C.dark};border-radius:999px;padding:18px 36px;font-weight:700;font-size:36px">${esc(f.business)} · <span style="font-weight:500">${esc(f.sector)}</span></div>
</div>
${outro(tl, 12.3, f.closing, D)}`;
    return page({ ...this.size, bg: C.primary, body, css: SPIN_CSS + tl.css });
  }
};
