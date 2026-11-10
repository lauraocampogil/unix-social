import { page, badge, arrowBadge, esc, C, A } from '../src/brand.js';

// 4:5 carousel — cover on the blue pattern, one tilted card per point, CTA slide.
// A #CEDAFF mascot is split across slide edges so the carousel reads as one strip.
const W = 1080, H = 1350;
const edge = (side) =>
  `<img src="${A.mascot}" class="abs" style="left:${side === 'right' ? W - 160 : -160}px;top:1110px;width:320px">`;

export default {
  name: 'signs-carousel',
  kind: 'carousel',
  size: { w: W, h: H },
  igPostType: 'post',
  example: {
    cover: { title: '3 signs your website is losing you clients', sub: 'And how to fix each one.', swipe: 'Swipe' },
    section: 'Website check',
    items: [
      { title: 'It’s hard to use on a phone.', body: 'Most people look you up on their phone. If they need to zoom in to read your prices, they leave.', fix: 'The fix: design for the phone first' },
      { title: 'Nobody can find it.', body: 'When someone searches for what you do on Google or asks ChatGPT, your name should come up. If it doesn’t, they pick someone else.', fix: 'The fix: say clearly what you do and where' },
      { title: 'There’s no clear next step.', body: 'In a few seconds, visitors should know how to book, call or ask for a price. One clear button beats ten links.', fix: 'The fix: one obvious button on every page' }
    ],
    cta: { title: 'Recognised one?', body: 'We fix that. Clear prices, no tech talk, no stress.', button: 'unixcreativestudio.com', note: 'Not sure? Take the 3-question quiz. No call needed.' }
  },
  build(f) {
    const total = f.items.length + 2;
    const slides = [];
    slides.push(page({ w: W, h: H, bg: C.primary, body: `
<img src="${A.blobTop}" class="abs" style="left:-60px;top:-90px;width:1200px">
<img src="${A.blobBottom}" class="abs" style="left:-60px;bottom:-60px;width:1200px">
<img src="${A.logoCream}" class="abs" style="left:440px;top:64px;width:200px">
<div class="abs" style="left:70px;top:430px;width:940px;display:flex;flex-direction:column;align-items:center;gap:28px;text-align:center">
  <div class="display" style="font-size:108px">${esc(f.cover.title)}</div>
  <div style="font-weight:500;font-size:42px">${esc(f.cover.sub)}</div>
</div>
<div class="abs" style="right:70px;bottom:70px;display:flex;align-items:center;gap:18px"><span style="font-weight:700;font-size:34px">${esc(f.cover.swipe || 'Swipe')}</span>${arrowBadge(A.badgeCream, 'right', C.dark, 110)}</div>`}));

    f.items.forEach((it, i) => {
      const tilt = i % 2 ? 2 : -2;
      slides.push(page({ w: W, h: H, bg: C.accent, body: `
<div class="abs display" style="left:0;top:80px;width:${W}px;text-align:center;font-size:96px;line-height:1">${esc(f.section)}</div>
<div class="abs" style="left:110px;top:300px;width:860px;height:760px;background:${C.primary};opacity:.6;border-radius:30px;transform:rotate(${-tilt * 1.5}deg)"></div>
<div class="abs" style="left:90px;top:290px;width:900px;height:780px;background:${C.primary};border-radius:30px;padding:60px;overflow:hidden;transform:rotate(${tilt}deg);box-shadow:0 20px 50px -25px rgba(0,0,0,.3);display:flex;flex-direction:column;align-items:flex-start">
  <img src="${A.ghost}" class="abs" style="right:-170px;top:120px;width:600px">
  ${badge(A.badgePink, `${i + 1}.`, 96)}
  <div style="position:relative;margin-top:44px;font-weight:700;font-size:70px;line-height:1.05;letter-spacing:-1px;max-width:700px">${esc(it.title)}</div>
  <div style="position:relative;margin-top:26px;font-weight:500;font-size:40px;line-height:1.35;max-width:660px">${esc(it.body)}</div>
  <div style="position:relative;margin-top:auto;background:${C.cream};color:${C.accent};font-weight:700;font-size:34px;padding:18px 32px 22px;border-radius:40px">${esc(it.fix)}</div>
</div>
${i > 0 ? edge('left') : ''}${edge('right')}
<img src="${A.logoCream}" class="abs" style="left:200px;bottom:64px;width:150px">
<div class="abs" style="left:0;bottom:84px;width:${W}px;text-align:center;font-weight:700;font-size:30px">${i + 2}/${total}</div>`}));
    });

    slides.push(page({ w: W, h: H, bg: C.dark, body: `
${edge('left')}
<img src="${A.mascot}" class="abs" style="right:-230px;top:150px;width:560px;transform:rotate(-14deg)">
<img src="${A.logoCream}" class="abs" style="left:90px;top:80px;width:200px">
<div class="abs" style="left:90px;top:470px;width:800px;display:flex;flex-direction:column;align-items:flex-start;gap:30px">
  <div class="display" style="font-size:128px;line-height:.92">${esc(f.cta.title)}</div>
  <div style="font-weight:500;font-size:46px;line-height:1.3">${esc(f.cta.body)}</div>
  <div style="margin-top:10px;background:${C.cream};color:${C.dark};font-weight:700;font-size:40px;padding:22px 40px 26px;border-radius:40px">${esc(f.cta.button)}</div>
  <div style="font-style:italic;font-weight:600;font-size:34px;line-height:1.3;color:${C.mascot}">${esc(f.cta.note)}</div>
</div>
<div class="abs" style="right:90px;bottom:84px;font-weight:700;font-size:30px">${total}/${total}</div>`}));
    return slides;
  }
};
