import { page, badge, esc, C, A } from '../src/brand.js';

// 1:1 post — title + 3 tilted numbered cards (services-section style).
export default {
  name: 'cards-linkedin',
  kind: 'image',
  size: { w: 1080, h: 1080 },
  igPostType: 'post',
  example: {
    title: 'You run it.\nWe help it grow.',
    cards: [
      { title: 'Web design & development', body: 'So people find you, and choose you.' },
      { title: 'AI consulting', body: 'So the boring tasks stop being yours.' },
      { title: 'Mobile app', body: 'So your clients come back to you, not someone else.' }
    ],
    footer: 'Clear prices · No tech talk · No stress'
  },
  build(f) {
    const tilts = [-2, 1.5, -1];
    const cards = f.cards
      .slice(0, 3)
      .map((c, i) => `<div class="abs" style="left:90px;top:${320 + i * 220}px;width:900px;height:190px;background:${C.primary};border-radius:30px;padding:34px 44px;overflow:hidden;transform:rotate(${tilts[i]}deg);box-shadow:0 16px 40px -22px rgba(0,0,0,.3);display:flex;align-items:center;gap:30px">
  <img src="${A.ghost}" class="abs" style="right:-60px;top:-40px;width:280px">
  ${badge(A.badgePink, `${i + 1}.`, 84, C.cream, 30)}
  <div style="position:relative;display:flex;flex-direction:column;gap:6px"><div style="font-weight:700;font-size:44px">${esc(c.title)}</div><div style="font-weight:500;font-size:28px">${esc(c.body)}</div></div>
</div>`)
      .join('');
    const body = `
<div class="abs display" style="left:0;top:70px;width:1080px;text-align:center;font-size:84px;white-space:pre-line">${esc(f.title)}</div>
${cards}
<img src="${A.logoCream}" class="abs" style="left:90px;bottom:36px;width:120px">
<div class="abs" style="right:90px;bottom:50px;font-style:italic;font-weight:600;font-size:28px">${esc(f.footer)}</div>`;
    return page({ ...this.size, bg: C.accent, body });
  }
};
