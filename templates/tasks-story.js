import { page, centeredLogo, esc, C, A } from '../src/brand.js';

// Animated 9:16 story — a list of tasks gets crossed off one by one (3 to 5 tasks).
export default {
  name: 'tasks-story',
  kind: 'video',
  size: { w: 1080, h: 1920 },
  duration: 9,
  igPostType: 'story',
  example: {
    headline: 'Things a computer could do for you',
    tasks: ['Answering “open on Sunday?”', 'Copying emails into Excel', 'Chasing quotes and reminders', 'Rebooking the same client'],
    closing: 'You get your time back.',
    sub: 'AI consulting · unixcreativestudio.com'
  },
  build(f) {
    const tasks = f.tasks.slice(0, 5);
    let css = `
@keyframes endIn{0%,68%{opacity:0;transform:translateY(40px)}74%,94%{opacity:1;transform:none}100%{opacity:0}}
@keyframes spin{to{transform:rotate(360deg)}}
.task{background:${C.cream};color:${C.dark};border-radius:30px;padding:30px 36px;display:flex;align-items:center;gap:26px}`;
    const rows = tasks
      .map((t, i) => {
        const s = 14 + i * Math.round(42 / tasks.length);
        css += `
@keyframes l${i}{0%,${s}%{transform:scaleX(0)}${s + 5}%,94%{transform:scaleX(1)}100%{transform:scaleX(0)}}
@keyframes b${i}{0%,${s + 2}%{transform:scale(0) rotate(-40deg)}${s + 7}%{transform:scale(1.2) rotate(8deg)}${s + 10}%,94%{transform:scale(1)}100%{transform:scale(0)}}`;
        return `<div class="task"><img src="${A.badgePink}" style="width:72px;flex-shrink:0;transform:scale(0);animation:b${i} 9s ease-out infinite"><div style="position:relative;font-weight:700;font-size:44px;line-height:1.15;white-space:nowrap">${esc(t)}<span style="position:absolute;left:0;right:0;top:52%;height:5px;background:${C.violet};border-radius:4px;transform-origin:left;transform:scaleX(0);animation:l${i} 9s ease-out infinite"></span></div></div>`;
      })
      .join('');
    const body = `
<img src="${A.ghost}" class="abs" style="right:-260px;bottom:-200px;width:900px;animation:spin 40s linear infinite">
<img src="${A.ghost}" class="abs" style="left:-180px;top:120px;width:420px;animation:spin 30s linear infinite reverse">
${centeredLogo(90, 240)}
<div class="abs display" style="left:90px;top:360px;width:900px;font-size:100px">${esc(f.headline)}</div>
<div class="abs" style="left:90px;top:720px;width:900px;display:flex;flex-direction:column;gap:20px">${rows}</div>
<div class="abs" style="left:90px;top:1440px;width:900px;display:flex;flex-direction:column;gap:14px;animation:endIn 9s ease-out infinite">
  <div class="display" style="font-size:92px">${esc(f.closing)}</div>
  <div style="font-weight:500;font-size:38px">${esc(f.sub)}</div>
</div>`;
    return page({ ...this.size, bg: C.violet, body, css });
  }
};
