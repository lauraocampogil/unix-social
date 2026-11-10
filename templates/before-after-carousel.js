import { page, arrowBadge, esc, C, A } from '../src/brand.js';

// 4:5 carousel — violet cover, "Before → After" cream slides, violet CTA.
const W = 1080, H = 1350;
const edge = (side) =>
  `<img src="${A.mascot}" class="abs" style="left:${side === 'right' ? W - 160 : -160}px;top:1060px;width:320px">`;

export default {
  name: 'before-after-carousel',
  kind: 'carousel',
  size: { w: W, h: H },
  igPostType: 'post',
  example: {
    cover: { tag: 'AI consulting', title: 'What can AI do for a small business?', sub: 'Three real examples. No robots, no tech talk.', swipe: 'Swipe' },
    labels: { item: 'Example', before: 'Before', after: 'After' },
    items: [
      { before: 'Answering the same questions all day.', after: 'An assistant on your website answers them, day and night, in your words.' },
      { before: 'Writing every quote by hand.', after: 'Your client fills in a short form. The quote is ready for you to check and send.' },
      { before: 'Copying info from emails into a spreadsheet.', after: 'The spreadsheet fills itself in. You just take a look.' }
    ],
    cta: { title: 'Start with one task.', body: 'We find your biggest time-waster and build the AI system that takes it off your plate.', button: 'unixcreativestudio.com', note: 'You don’t need to know anything about AI.' }
  },
  build(f) {
    const total = f.items.length + 2;
    const L = f.labels || { item: 'Example', before: 'Before', after: 'After' };
    const slides = [];
    slides.push(page({ w: W, h: H, bg: C.violet, body: `
<img src="${A.ghost}" class="abs" style="left:-220px;top:760px;width:700px;transform:rotate(18deg)">
<img src="${A.ghost}" class="abs" style="right:-120px;top:-120px;width:460px;transform:rotate(-12deg)">
${edge('right')}
<img src="${A.logoCream}" class="abs" style="left:90px;top:80px;width:200px">
<div class="abs" style="left:90px;top:380px;width:900px;display:flex;flex-direction:column;align-items:flex-start;gap:30px">
  <div style="background:${C.cream};color:${C.violet};font-weight:700;font-size:32px;padding:12px 28px 14px;border-radius:40px">${esc(f.cover.tag)}</div>
  <div class="display" style="font-size:116px;line-height:.92">${esc(f.cover.title)}</div>
  <div style="font-weight:500;font-size:42px;line-height:1.3;max-width:760px">${esc(f.cover.sub)}</div>
</div>
<div class="abs" style="left:90px;bottom:80px;display:flex;align-items:center;gap:18px">${arrowBadge(A.badgeCream, 'right', C.violet, 110)}<span style="font-weight:700;font-size:34px">${esc(f.cover.swipe || 'Swipe')}</span></div>`}));

    f.items.forEach((it, i) => {
      slides.push(page({ w: W, h: H, bg: C.cream, body: `
${edge('left')}${edge('right')}
<div class="abs" style="left:90px;top:90px;width:900px;display:flex;align-items:center;justify-content:space-between;color:${C.dark}">
  <div style="background:${C.violet};color:${C.cream};font-weight:700;font-size:30px;padding:12px 26px 14px;border-radius:40px">${esc(L.item)} ${i + 1}</div>
  <div style="font-weight:700;font-size:30px">${i + 2}/${total}</div>
</div>
<div class="abs" style="left:90px;top:250px;width:900px;display:flex;flex-direction:column;gap:28px;color:${C.dark}">
  <div style="font-style:italic;font-weight:600;font-size:38px;color:${C.accent}">${esc(L.before)}</div>
  <div style="font-weight:700;font-size:76px;line-height:1.04;letter-spacing:-1.5px">${esc(it.before)}</div>
  <div style="margin:10px 0">${arrowBadge(A.badgeAccent, 'down', C.cream, 104)}</div>
  <div style="background:${C.dark};color:${C.cream};border-radius:30px;padding:44px 48px 50px;display:flex;flex-direction:column;gap:16px">
    <div style="font-style:italic;font-weight:600;font-size:34px;color:${C.mascot}">${esc(L.after)}</div>
    <div style="font-weight:700;font-size:54px;line-height:1.12;letter-spacing:-.5px">${esc(it.after)}</div>
  </div>
</div>`}));
    });

    slides.push(page({ w: W, h: H, bg: C.violet, body: `
${edge('left')}
<img src="${A.ghost}" class="abs" style="right:-260px;bottom:-200px;width:820px;transform:rotate(-16deg)">
<img src="${A.logoCream}" class="abs" style="left:90px;top:80px;width:200px">
<div class="abs" style="right:90px;top:110px;font-weight:700;font-size:30px">${total}/${total}</div>
<div class="abs" style="left:90px;top:400px;width:860px;display:flex;flex-direction:column;align-items:flex-start;gap:30px">
  <div class="display" style="font-size:124px;line-height:.92">${esc(f.cta.title)}</div>
  <div style="font-weight:500;font-size:44px;line-height:1.3;max-width:800px">${esc(f.cta.body)}</div>
  <div style="margin-top:10px;background:${C.cream};color:${C.violet};font-weight:700;font-size:40px;padding:22px 40px 26px;border-radius:40px">${esc(f.cta.button)}</div>
  <div style="font-style:italic;font-weight:600;font-size:34px">${esc(f.cta.note)}</div>
</div>`}));
    return slides;
  }
};
