import { page, esc, C, A, timeline, reelBackdrop, SPIN_CSS, outro } from '../src/brand.js';

// "What could a computer do for you?" — an animated chat: a client asks, the AI assistant answers on its own.
// Always labelled as a demo. 3 to 5 messages, alternating client / ai.
export default {
  name: 'ai-demo',
  kind: 'video',
  size: { w: 1080, h: 1920 },
  duration: 14,
  igPostType: 'post',
  example: {
    hook: 'Hairdressers: stop answering “open on Sunday?”',
    business: 'Your salon',
    messages: [
      { from: 'client', text: 'Hi! Are you open on Sunday?' },
      { from: 'ai', text: 'Hi! We’re closed on Sundays, but Saturday at 10:00 is free. Shall I book it?' },
      { from: 'client', text: 'Yes please!' },
      { from: 'ai', text: 'Done ✓ See you Saturday at 10:00.' }
    ],
    label: 'Demo · an AI assistant on your website',
    closing: 'You get your Sundays back.'
  },
  build(f) {
    const D = this.duration;
    const tl = timeline(D);
    const msgs = f.messages.slice(0, 5);
    const step = 7.6 / msgs.length;
    const bubbles = msgs
      .map((m, i) => {
        const from = 3.2 + i * step;
        const ai = m.from === 'ai';
        return `<div style="display:flex;justify-content:${ai ? 'flex-start' : 'flex-end'};${tl.show(from, D, { dy: 30 })}">
          <div style="max-width:720px;border-radius:36px;${ai ? `border-bottom-left-radius:10px;background:${C.mascot};color:${C.dark}` : `border-bottom-right-radius:10px;background:${C.dark};color:${C.cream}`};padding:26px 34px;font-weight:600;font-size:40px;line-height:1.25">
            ${ai ? `<div style="font-size:26px;font-weight:700;opacity:.7;margin-bottom:6px">Assistant</div>` : ''}${esc(m.text)}
          </div></div>`;
      })
      .join('');
    const body = `
${reelBackdrop(70)}
<div class="abs display" style="left:80px;right:80px;top:620px;text-align:center;font-size:92px;${tl.show(0.2, 3)}">${esc(f.hook)}</div>
<div class="abs" style="left:70px;right:70px;top:380px;bottom:300px;background:${C.cream};border-radius:56px;padding:40px 36px;display:flex;flex-direction:column;${tl.show(2.6, 12, { dy: 200 })}">
  <div style="display:flex;align-items:center;gap:20px;padding-bottom:28px;border-bottom:3px solid ${C.mascot}">
    <img src="${A.mascot}" style="width:84px">
    <div style="color:${C.dark}"><div style="font-weight:700;font-size:40px">${esc(f.business)}</div><div style="font-weight:500;font-size:28px;opacity:.75">replies in seconds · day and night</div></div>
  </div>
  <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;gap:24px;padding-top:24px">${bubbles}</div>
</div>
<div class="abs" style="left:0;right:0;bottom:200px;text-align:center;font-weight:600;font-style:italic;font-size:32px;${tl.show(3, 12)}">${esc(f.label)}</div>
${outro(tl, 12.2, f.closing, D)}`;
    return page({ ...this.size, bg: C.violet, body, css: SPIN_CSS + tl.css });
  }
};
