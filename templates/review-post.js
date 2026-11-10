import { page, arrowBadge, esc, C, A } from '../src/brand.js';

// 4:5 post — cream review card on dark blue, #CEDAFF mascots peeking from both sides.
export default {
  name: 'review-post',
  kind: 'image',
  size: { w: 1080, h: 1350 },
  igPostType: 'post',
  example: {
    label: 'What our client says',
    quote: 'Best designer in town, good job, good person, always listening. Thanks to Unix we have a lot more views from all over.',
    author: 'InessCoach',
    role: 'Founder · Football mental coaching',
    footer: 'unixcreativestudio.com'
  },
  build(f) {
    const len = f.quote.length;
    const fs = len > 200 ? 46 : len > 140 ? 52 : 60;
    const body = `
<img src="${A.mascot}" class="abs" style="left:-330px;top:380px;width:620px;transform:rotate(8deg)">
<img src="${A.mascot}" class="abs" style="right:-340px;top:420px;width:640px;transform:rotate(-10deg)">
<img src="${A.logoCream}" class="abs" style="left:440px;top:70px;width:200px">
<div class="abs" style="left:120px;top:300px;width:840px;height:800px;background:${C.cream};border-radius:30px;padding:64px;display:flex;flex-direction:column;color:${C.dark}">
  <div style="display:flex;align-items:center;justify-content:space-between">
    <div style="font-weight:500;font-size:32px">${esc(f.label)}</div>
    <div style="display:flex;gap:10px">${arrowBadge(A.badgeAccent, 'left', C.cream, 72)}${arrowBadge(A.badgeAccent, 'right', C.cream, 72)}</div>
  </div>
  <div style="margin-top:70px;font-weight:700;font-size:${fs}px;line-height:1.12;letter-spacing:-1px">${esc(f.quote)}</div>
  <div style="margin-top:auto;display:flex;flex-direction:column;gap:4px">
    <div style="font-weight:700;font-size:36px">${esc(f.author)}</div>
    <div style="font-weight:500;font-size:30px;color:${C.accent}">${esc(f.role)}</div>
  </div>
</div>
<div class="abs" style="left:0;bottom:70px;width:1080px;text-align:center;font-weight:700;font-size:32px">${esc(f.footer)}</div>`;
    return page({ ...this.size, bg: C.dark, body });
  }
};
