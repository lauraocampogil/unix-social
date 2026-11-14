import { page, esc, C, A, timeline, reelBackdrop, SPIN_CSS, outro } from '../src/brand.js';

// "No tech talk" — one tech word explained with an everyday object. 3 short lines, then the outro.
export default {
  name: 'explainer-reel',
  kind: 'video',
  size: { w: 1080, h: 1920 },
  duration: 13,
  igPostType: 'post',
  example: {
    term: 'SEO',
    object: '🥐',
    hook: 'SEO explained with a croissant.',
    lines: [
      'You’re the best bakery in town… in a back street.',
      'SEO is the sign on the main street: croissants this way.',
      'Say what you do, where you are, and load fast on a phone.'
    ],
    closing: 'No tech talk. That’s the whole thing.'
  },
  build(f) {
    const D = this.duration;
    const tl = timeline(D);
    const lines = f.lines.slice(0, 3);
    const steps = lines
      .map((l, i) => {
        const from = 3.4 + i * 2.6;
        return `<div class="abs" style="left:90px;right:90px;top:1180px;height:420px;display:flex;align-items:center;justify-content:center;text-align:center;font-weight:700;font-size:64px;line-height:1.15;${tl.show(from, from + 2.5)}">${esc(l)}</div>`;
      })
      .join('');
    const bob = tl.keys([[0, 'transform:translateY(0) rotate(-6deg)'], [1.5, 'transform:translateY(-30px) rotate(6deg)'], [3, 'transform:translateY(0) rotate(-6deg)'], [4.5, 'transform:translateY(-30px) rotate(6deg)'], [6, 'transform:translateY(0) rotate(-6deg)'], [7.5, 'transform:translateY(-30px) rotate(6deg)'], [9, 'transform:translateY(0) rotate(-6deg)'], [10.5, 'transform:translateY(-30px) rotate(6deg)'], [D, 'transform:translateY(0) rotate(-6deg)']]);
    const body = `
<img src="${A.blobTop}" class="abs" style="left:0;top:0;width:1080px">
<img src="${A.blobBottom}" class="abs" style="left:0;bottom:0;width:1080px">
${reelBackdrop(70)}
<div class="abs" style="left:0;right:0;top:300px;display:flex;justify-content:center;${tl.show(0.1, 10.9, { dy: 0 })}">
  <div style="background:${C.cream};color:${C.dark};border-radius:999px;padding:14px 34px;font-weight:700;font-size:36px">No tech talk · ${esc(f.term)}</div>
</div>
<div class="abs" style="left:0;right:0;top:440px;display:flex;justify-content:center;${tl.show(0.2, 10.9, { dy: 80, scale: 0.4 })}">
  <div style="position:relative;width:520px;height:520px;display:flex;align-items:center;justify-content:center">
    <img src="${A.mascot}" style="position:absolute;inset:0;width:100%;height:100%;opacity:.55">
    <div style="font-size:300px;line-height:1;${bob}">${esc(f.object)}</div>
  </div>
</div>
<div class="abs display" style="left:80px;right:80px;top:1180px;height:420px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:96px;${tl.show(0.4, 3.2)}">${esc(f.hook)}</div>
${steps}
${outro(tl, 11.1, f.closing, D)}`;
    return page({ ...this.size, bg: C.primary, body, css: SPIN_CSS + tl.css });
  }
};
