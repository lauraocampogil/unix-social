import { page, badge, esc, C, A } from '../src/brand.js';

// 1:1 post — cream, big title, numbered list with a right-hand label (3 to 6 rows).
export default {
  name: 'list-linkedin',
  kind: 'image',
  size: { w: 1080, h: 1080 },
  igPostType: 'post',
  example: {
    kicker: 'Our work',
    title: 'Businesses we’ve helped grow',
    items: [
      { name: 'Brussels Summit Academy', label: 'Football academy' },
      { name: 'Shiynelly Lashes', label: 'Lash studio' },
      { name: 'Entraide Bruxelles', label: 'Non-profit' },
      { name: 'Yaniswash', label: 'Carwash' },
      { name: 'InessCoach', label: 'Football mental coaching' }
    ]
  },
  build(f) {
    const rows = f.items
      .slice(0, 6)
      .map((it, i) => `<div style="display:flex;align-items:center;gap:24px;padding:20px 0;border-top:3px solid ${C.primary}">${badge(A.badgePink, `${i + 1}.`, 64, C.cream, 24)}<div style="flex:1;font-weight:700;font-size:38px">${esc(it.name)}</div><div style="font-weight:500;font-size:28px;color:${C.accent}">${esc(it.label || '')}</div></div>`)
      .join('');
    const body = `
<img src="${A.mascot}" class="abs" style="right:-150px;bottom:-150px;width:440px;transform:rotate(-12deg)">
<div class="abs" style="left:80px;top:80px;width:920px;display:flex;flex-direction:column;gap:14px;color:${C.dark}">
  <div style="font-weight:500;font-size:30px;color:${C.accent}">${esc(f.kicker)}</div>
  <div class="display" style="font-size:84px">${esc(f.title)}</div>
</div>
<div class="abs" style="left:80px;top:345px;width:920px;display:flex;flex-direction:column;color:${C.dark}">${rows}</div>
<img src="${A.logoBlue}" class="abs" style="left:80px;bottom:60px;width:150px">`;
    return page({ ...this.size, bg: C.cream, body });
  }
};
