import { page, esc, C, A } from '../src/brand.js';

// Animated 9:16 reel — diagonal marquee rows on violet with a central card.
export default {
  name: 'marquee-reel',
  kind: 'video',
  size: { w: 1080, h: 1920 },
  duration: 12,
  igPostType: 'post',
  example: {
    words: ['Bloom your business', 'Get found', 'Get clients', 'Save time', 'Stress less'],
    tagline: 'Websites · AI · Apps'
  },
  build(f) {
    const words = f.words.map(esc);
    const css = `
@keyframes left{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes right{from{transform:translateX(-50%)}to{transform:translateX(0)}}
@keyframes pulse{0%,100%{transform:rotate(-4deg) scale(1)}50%{transform:rotate(3deg) scale(1.05)}}
.w{font-family:"Apfel Grotezk";font-weight:900;font-size:150px;line-height:1;text-transform:uppercase}`;
    let rows = '';
    for (let i = 0; i < 9; i++) {
      const s = i % words.length;
      const set = words.slice(s).concat(words.slice(0, s));
      const band = i % 3 === 1;
      const fl = band ? A.mascot : A.mascotCream;
      const items = set.concat(set).map((w) => `<span class="w">${w}</span><img src="${fl}" style="width:120px;flex-shrink:0">`).join('');
      const anim = `${i % 2 ? 'right' : 'left'} ${34 + (i % 3) * 6}s linear infinite`;
      rows += `<div style="height:250px;display:flex;align-items:center;overflow:hidden;background:${band ? C.dark : 'transparent'}"><div style="display:flex;align-items:center;gap:44px;white-space:nowrap;padding-left:44px;animation:${anim}">${items}</div></div>`;
    }
    const body = `
<div class="abs" style="left:-400px;top:-160px;width:1880px;display:flex;flex-direction:column;transform:rotate(-10deg)">${rows}</div>
<div class="abs" style="left:240px;top:760px;width:600px;height:400px;background:${C.cream};border-radius:30px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;color:${C.dark};box-shadow:0 30px 60px -30px rgba(0,0,0,.35);animation:pulse 6s ease-in-out infinite">
  <img src="${A.logoBlue}" style="width:300px"><div style="font-weight:700;font-size:36px">${esc(f.tagline)}</div>
</div>`;
    return page({ ...this.size, bg: C.violet, body, css });
  }
};
