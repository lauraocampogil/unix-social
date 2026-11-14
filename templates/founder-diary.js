import { page, esc, C, A, timeline, SPIN_CSS, outro } from '../src/brand.js';

// "Building Unix" — the founder's diary, faceless: a note written line by line over a real screen of the work.
// Only real events from the Notion "Diario" base. 3 to 5 lines.
export default {
  name: 'founder-diary',
  kind: 'video',
  size: { w: 1080, h: 1920 },
  duration: 15,
  igPostType: 'post',
  example: {
    day: 'Day 1',
    url: 'https://unixcreativestudio.com/en',
    lines: [
      'I just graduated. Today I’m starting a design studio in Brussels.',
      'No investors. One laptop. One idea:',
      'help small businesses get found, without the tech talk.',
      'I’ll share everything here: the wins, the mistakes, the numbers.'
    ],
    sign: 'Building Unix',
    closing: 'Follow along. Day by day.'
  },
  async prepare(f, cap) {
    if (f.url && !f.captureImage) f.captureImage = await cap.still(f.url);
    return f;
  },
  build(f) {
    const D = this.duration;
    const tl = timeline(D);
    const lines = f.lines.slice(0, 5);
    const step = 8.2 / lines.length;
    const paras = lines
      .map((l, i) => `<p style="margin:0 0 30px;${tl.show(2 + i * step, D, { dy: 16, fade: 0.6 })}">${esc(l)}</p>`)
      .join('');
    const zoom = tl.keys([[0, 'transform:scale(1.05)'], [D, 'transform:scale(1.18)']]);
    const body = `
${f.captureImage ? `<img src="${f.captureImage}" class="abs" style="left:0;top:0;width:1080px;height:1920px;object-fit:cover;object-position:top;filter:blur(6px) saturate(.9);${zoom}">` : ''}
<div class="abs" style="inset:0;background:${C.dark};opacity:.55"></div>
<div class="abs" style="left:70px;right:70px;top:360px;background:${C.cream};color:#1E2140;border-radius:44px;padding:60px 56px 50px;box-shadow:0 40px 80px rgba(30,33,64,.35);${tl.show(0.2, 12.6, { dy: 120 })}">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:40px">
    <div style="font-weight:700;font-size:34px;color:${C.dark}">${esc(f.sign)}</div>
    <div style="background:${C.pink};color:#1E2140;border-radius:999px;padding:10px 26px;font-weight:700;font-size:32px">${esc(f.day)}</div>
  </div>
  <div style="font-weight:500;font-size:58px;line-height:1.28">${paras}</div>
  <img src="${A.mascot}" style="width:110px;float:right;${tl.show(10.4, D, { dy: 30, scale: 0.6 })}">
  <div style="clear:both"></div>
</div>
${outro(tl, 12.8, f.closing, D)}`;
    return page({ ...this.size, bg: C.dark, body, css: SPIN_CSS + tl.css });
  }
};
