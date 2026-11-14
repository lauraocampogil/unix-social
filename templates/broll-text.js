import { page, esc, C, timeline, nativeCaption, fullscreenFrames } from '../src/brand.js';

// Organic TikTok: Laura's own b-roll clips (no face: hands, desk, coffee, Brussels streets, client shops)
// + native TikTok-style text. No logo, no brand animation — it should look filmed on a phone.
// clips = file names in assets/broll (listed in the Notion "B-roll" base). lines = what appears on screen, in order.
export default {
  name: 'broll-text',
  kind: 'video',
  size: { w: 1080, h: 1920 },
  duration: 9,
  igPostType: 'post',
  example: {
    clips: ['sample-desk.mp4', 'sample-scroll.mp4'],
    lines: [
      'pov: you finally have a website that brings clients',
      'not a fancy one.',
      'just clear prices, one button and your name on google',
      'that’s literally it 🌸'
    ],
    style: 'box',
    position: 'center'
  },
  async prepare(f, cap) {
    const D = Number(f.duration || this.duration);
    const clips = (f.clips || []).slice(0, 4);
    const seg = D / Math.max(1, clips.length);
    f._clips = [];
    for (let i = 0; i < clips.length; i++) f._clips.push({ cap: await cap.clip(clips[i], { seconds: seg + 0.2 }), start: i * seg, end: (i + 1) * seg });
    return f;
  },
  build(f) {
    const D = Number(f.duration || this.duration);
    const tl = timeline(D);
    const clips = (f._clips || [])
      .map((c, i) => `<div class="abs" style="inset:0;${i === 0 ? '' : tl.keys([[0, 'opacity:0'], [c.start - 0.001, 'opacity:0'], [c.start, 'opacity:1'], [D, 'opacity:1']])}">${fullscreenFrames(c.cap, { start: c.start, tl, D })}</div>`)
      .join('');
    const lines = f.lines.slice(0, 6);
    const per = D / lines.length;
    const top = f.position === 'top' ? 330 : f.position === 'bottom' ? 1180 : 760;
    const caps = lines
      .map((l, i) => {
        const from = i * per, to = i === lines.length - 1 ? D : (i + 1) * per;
        return `<div class="abs" style="left:90px;right:90px;top:${top}px;${tl.show(from + (i ? 0 : 0.15), to, { dy: 0, fade: 0.12 })}">${nativeCaption(l, { style: f.style, size: i === 0 ? 62 : 56 })}</div>`;
      })
      .join('');
    const body = `${clips || `<div class="abs" style="inset:0;background:${C.dark}"></div>`}${caps}`;
    return page({ ...this.size, bg: '#000', body, css: tl.css });
  }
};
