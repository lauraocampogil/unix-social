import { page, esc, C, A, timeline, phoneScreen, reelBackdrop, SPIN_CSS, outro, badge } from '../src/brand.js';

// "Fix it in 60" — a website its owner sent us (with permission), and 3 calm, concrete fixes.
export default {
  name: 'site-fix',
  kind: 'video',
  size: { w: 1080, h: 1920 },
  duration: 16,
  igPostType: 'post',
  example: {
    url: 'https://yaniswash.be',
    hook: 'You sent us your website. 3 small fixes.',
    site: 'yaniswash.be',
    fixes: [
      { title: 'Prices higher up', body: 'Most people scroll for the price. Show it in the first screen.' },
      { title: 'One button, always visible', body: '“Book a wash” should follow you down the page.' },
      { title: 'Say where you work', body: 'Add “Brussels and around” so Google and ChatGPT know.' }
    ],
    closing: 'Want yours checked? Send it on our website.'
  },
  async prepare(f, cap) {
    if (f.url && !f.captureImage) f._cap = await cap.scroll(f.url, { seconds: 12, holdStart: 1 });
    return f;
  },
  build(f) {
    const D = this.duration;
    const tl = timeline(D);
    const fixes = f.fixes.slice(0, 3);
    const cards = fixes
      .map((x, i) => {
        const from = 4.2 + i * 2.9;
        return `<div class="abs" style="left:60px;right:60px;top:1420px;background:${C.cream};color:${C.dark};border-radius:36px;padding:32px 36px;display:flex;gap:28px;align-items:flex-start;${tl.show(from, from + 2.8)}">${badge(A.badgePink, i + 1, 96, C.dark, 38)}<div><div style="font-weight:700;font-size:46px;line-height:1.1">${esc(x.title)}</div><div style="font-weight:500;font-size:34px;line-height:1.3;margin-top:10px">${esc(x.body)}</div></div></div>`;
      })
      .join('');
    const body = `
${reelBackdrop(70)}
<div class="abs display" style="left:80px;right:80px;top:620px;text-align:center;font-size:96px;${tl.show(0.2, 3)}">${esc(f.hook)}</div>
<div class="abs" style="left:0;right:0;top:0;bottom:0;${tl.show(2.6, D, { dy: 300 })}">
  ${phoneScreen({ f, tl, x: 320, y: 250, w: 440, start: 2.6, scrollTo: 13.4, D })}
  <div class="abs" style="left:0;right:0;top:1230px;text-align:center;font-weight:700;font-size:34px">${esc(f.site)}</div>
</div>
${cards}
${outro(tl, 13.4, f.closing, D)}`;
    return page({ ...this.size, bg: C.violet, body, css: SPIN_CSS + tl.css });
  }
};
