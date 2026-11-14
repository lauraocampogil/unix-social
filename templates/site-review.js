import { page, esc, C, A, timeline, phoneScreen, reelBackdrop, SPIN_CSS, outro, badge } from '../src/brand.js';

// "Websites we love" — a great public website scrolling + 3 ideas a small business can reuse. Always credit the makers.
export default {
  name: 'site-review',
  kind: 'video',
  size: { w: 1080, h: 1920 },
  duration: 15,
  igPostType: 'post',
  example: {
    url: 'https://unixcreativestudio.com/en',
    hook: 'This website says it all in 4 seconds.',
    points: ['One clear sentence on top', 'Soft colours, one style', 'Prices and next step, no hunting'],
    credit: 'Example site · credit the studio that made it',
    closing: 'Good ideas work for small businesses too.'
  },
  async prepare(f, cap) {
    if (f.url && !f.captureImage) f._cap = await cap.scroll(f.url, { seconds: 11, holdStart: 1.5 });
    return f;
  },
  build(f) {
    const D = this.duration;
    const tl = timeline(D);
    const pts = f.points.slice(0, 3);
    const badges = [A.badgePink, A.badgeAccent, A.badgePink];
    const colors = [C.dark, C.cream, C.dark];
    const cards = pts
      .map((p, i) => {
        const from = 4.6 + i * 2.4;
        return `<div class="abs" style="left:70px;right:70px;top:1500px;display:flex;align-items:center;gap:28px;background:${C.cream};color:${C.dark};border-radius:36px;padding:30px 36px;${tl.show(from, from + 2.3)}">${badge(badges[i], i + 1, 92, colors[i], 36)}<div style="font-weight:700;font-size:44px;line-height:1.15">${esc(p)}</div></div>`;
      })
      .join('');
    const body = `
${reelBackdrop(70)}
<div class="abs display" style="left:80px;right:80px;top:640px;text-align:center;font-size:100px;${tl.show(0.2, 3)}">${esc(f.hook)}</div>
<div class="abs" style="left:0;right:0;top:0;bottom:0;${tl.show(2.6, D, { dy: 300 })}">
  ${phoneScreen({ f, tl, x: 300, y: 270, w: 480, start: 2.6, scrollTo: 13, D })}
</div>
<div class="abs" style="left:90px;right:90px;top:1330px;text-align:center;font-weight:600;font-style:italic;font-size:30px;opacity:.85;${tl.show(3, 12.2)}">${esc(f.credit)}</div>
${cards}
${outro(tl, 12.5, f.closing, D)}`;
    return page({ ...this.size, bg: C.dark, body, css: SPIN_CSS + tl.css });
  }
};
