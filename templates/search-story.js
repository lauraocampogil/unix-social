import { page, badge, centeredLogo, esc, C, A } from '../src/brand.js';

// Animated 9:16 story — a search query is typed, the competitor shows up first.
export default {
  name: 'search-story',
  kind: 'video',
  size: { w: 1080, h: 1920 },
  duration: 8,
  igPostType: 'story',
  example: {
    headline: 'Someone is looking for you right now.',
    query: 'carwash near me',
    result1Title: 'Your competitor',
    result1Sub: 'Shows up first. Gets the call.',
    result2Title: 'You',
    result2Sub: 'Somewhere on page two.',
    closing: 'Let’s make sure your name comes up first.'
  },
  build(f) {
    const chars = Math.max(1, [...f.query].length);
    const css = `
@keyframes type{0%,6%{width:0}34%,92%{width:${Math.min(700, chars * 30)}px}100%{width:0}}
@keyframes caret{0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes in1{0%,38%{opacity:0;transform:translateY(50px)}44%,92%{opacity:1;transform:none}100%{opacity:0}}
@keyframes in2{0%,46%{opacity:0;transform:translateY(50px)}52%,92%{opacity:.55;transform:none}100%{opacity:0}}
@keyframes in3{0%,58%{opacity:0;transform:scale(.85)}64%,92%{opacity:1;transform:scale(1)}100%{opacity:0}}
@keyframes head{0%{opacity:0;transform:translateY(30px)}6%,100%{opacity:1;transform:none}}
@keyframes sway{0%,100%{transform:translateX(0)}50%{transform:translateX(-24px)}}
.card{background:${C.cream};color:${C.dark};border-radius:30px;padding:28px 36px;display:flex;align-items:center;gap:24px}`;
    const body = `
<img src="${A.blobTop}" class="abs" style="left:-40px;top:-20px;width:1200px;animation:sway 8s ease-in-out infinite">
<img src="${A.blobBottom}" class="abs" style="left:-60px;bottom:-10px;width:1200px;animation:sway 8s ease-in-out infinite reverse">
${centeredLogo(90, 240)}
<div class="abs display" style="left:70px;top:560px;width:940px;text-align:center;font-size:112px;animation:head 8s ease-out infinite">${esc(f.headline)}</div>
<div class="abs" style="left:110px;top:950px;width:860px;height:120px;background:${C.cream};border-radius:999px;display:flex;align-items:center;gap:22px;padding:0 44px;color:${C.dark}">
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${C.dark}" stroke-width="2.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg>
  <div style="display:flex;align-items:center"><span style="display:block;overflow:hidden;white-space:nowrap;font-weight:700;font-size:52px;animation:type 8s steps(${chars},end) infinite">${esc(f.query)}</span><span style="display:block;width:5px;height:58px;background:${C.dark};margin-left:4px;animation:caret .9s steps(1) infinite"></span></div>
</div>
<div class="abs" style="left:110px;top:1110px;width:860px;display:flex;flex-direction:column;gap:18px">
  <div class="card" style="animation:in1 8s ease-out infinite">${badge(A.badgePink, '1.', 70, C.cream, 28)}<div><div style="font-weight:700;font-size:44px">${esc(f.result1Title)}</div><div style="font-weight:500;font-size:30px">${esc(f.result1Sub)}</div></div></div>
  <div class="card" style="animation:in2 8s ease-out infinite">${badge(A.badgeAccent, '9.', 70, C.cream, 28)}<div><div style="font-weight:700;font-size:44px">${esc(f.result2Title)}</div><div style="font-weight:500;font-size:30px">${esc(f.result2Sub)}</div></div></div>
</div>
<div class="abs" style="left:0;top:1560px;width:1080px;display:flex;justify-content:center;animation:in3 8s ease-out infinite">
  <div style="background:${C.dark};font-weight:700;font-size:46px;line-height:1.2;text-align:center;padding:26px 48px 30px;border-radius:40px;max-width:820px">${esc(f.closing)}</div>
</div>`;
    return page({ ...this.size, bg: C.primary, body, css });
  }
};
