import { page, esc, C, timeline, nativeCaption, fullscreenFrames } from '../src/brand.js';

// Organic TikTok made only from a screen recording: a real website scrolling full screen (like a phone screen
// recording) + native TikTok text. No logo, no phone mockup, no brand animation.
export default {
  name: 'screen-native',
  kind: 'video',
  size: { w: 1080, h: 1920 },
  duration: 10,
  igPostType: 'post',
  example: {
    url: 'https://yaniswash.be',
    lines: [
      'we made a website for a carwash in brussels',
      'prices right there. no calling to ask.',
      'one button to book',
      'small business, big bloom 🌸'
    ],
    style: 'box',
    position: 'top'
  },
  async prepare(f, cap) {
    if (f.url && !f.captureImage) f._cap = await cap.scroll(f.url, { seconds: Number(f.duration || this.duration), holdStart: 1.5 });
    return f;
  },
  build(f) {
    const D = Number(f.duration || this.duration);
    const tl = timeline(D);
    let screen = '';
    if (f._cap) screen = fullscreenFrames(f._cap, { tl, D, zoom: false });
    else if (f.captureImage) {
      const s = tl.keys([[0, 'transform:translateY(0)'], [1.5, 'transform:translateY(0)'], [D, 'transform:translateY(calc(-100% + 1920px))']]);
      screen = `<img src="${f.captureImage}" class="abs" style="left:0;top:0;width:1080px;${s}">`;
    }
    const lines = f.lines.slice(0, 6);
    const per = D / lines.length;
    const top = f.position === 'center' ? 760 : f.position === 'bottom' ? 1180 : 300;
    const caps = lines
      .map((l, i) => {
        const from = i * per, to = i === lines.length - 1 ? D : (i + 1) * per;
        return `<div class="abs" style="left:90px;right:90px;top:${top}px;${tl.show(from + (i ? 0 : 0.15), to, { dy: 0, fade: 0.12 })}">${nativeCaption(l, { style: f.style, size: i === 0 ? 62 : 56 })}</div>`;
      })
      .join('');
    return page({ ...this.size, bg: '#fff', body: `${screen}${caps}`, css: tl.css });
  }
};
