import { page, centeredLogo, esc, C, A } from '../src/brand.js';

// Animated 9:16 story — 3 questions appear one after the other, an answer gets picked.
export default {
  name: 'quiz-story',
  kind: 'video',
  size: { w: 1080, h: 1920 },
  duration: 9,
  igPostType: 'story',
  example: {
    headline: 'Not sure where to start?',
    sub: 'That’s okay, most people aren’t.',
    label: 'Quiz',
    questions: [
      { q: 'Do you have a website?', options: ['Not yet', 'Yes, but I don’t love it', 'Yes, and I love it'], pick: 1 },
      { q: 'What would help you most?', options: ['More time, less busywork', 'New clients', 'An app for my clients'], pick: 1 },
      { q: 'When would you like to start?', options: ['As soon as possible', 'In 1–2 months', 'No rush'], pick: 0 }
    ],
    cta: 'Take it on unixcreativestudio.com',
    note: 'No call needed.'
  },
  build(f) {
    const qs = f.questions.slice(0, 3);
    const n = qs.length;
    const win = 99 / n;
    let css = `
@keyframes f1{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-40px) rotate(4deg)}}
@keyframes f2{0%,100%{transform:translateY(0) rotate(10deg)}50%{transform:translateY(36px) rotate(-4deg)}}
.opt{border:3px solid ${C.primary};border-radius:40px;padding:16px 32px 20px;font-weight:700;font-size:38px;background:${C.cream}}`;
    const blocks = qs
      .map((q, i) => {
        const a = (i * win).toFixed(1), b = ((i + 1) * win - 3).toFixed(1), c = ((i + 1) * win).toFixed(1);
        const pickAt = (i * win + win * 0.5).toFixed(1), pickEnd = (i * win + win * 0.5 + 3).toFixed(1);
        css += i === 0
          ? `\n@keyframes q0{0%,${b}%{opacity:1;transform:none}${c}%,100%{opacity:0;transform:translateX(-60px)}}`
          : `\n@keyframes q${i}{0%,${a}%{opacity:0;transform:translateX(60px)}${(+a + 3).toFixed(1)}%,${b}%{opacity:1;transform:none}${c}%,100%{opacity:0;transform:translateX(-60px)}}`;
        css += `\n@keyframes s${i}{0%,${pickAt}%{background:${C.cream};color:${C.dark}}${pickEnd}%,100%{background:${C.primary};color:${C.cream}}}`;
        const opts = q.options
          .map((o, j) => `<div class="opt"${j === q.pick ? ` style="animation:s${i} 9s ease-out infinite"` : ''}>${esc(o)}</div>`)
          .join('');
        return `<div class="abs" style="left:56px;top:56px;right:56px;display:flex;flex-direction:column;gap:22px;animation:q${i} 9s ease-in-out infinite${i ? ';opacity:0' : ''}">
  <div style="font-weight:500;font-size:32px;color:${C.accent}">${i + 1}/${n} · ${esc(f.label || 'Quiz')}</div>
  <div style="font-weight:700;font-size:60px;line-height:1.08;letter-spacing:-1px">${esc(q.q)}</div>
  <div style="display:flex;flex-direction:column;align-items:flex-start;gap:16px;margin-top:14px">${opts}</div></div>`;
      })
      .join('');
    const body = `
<img src="${A.mascot}" class="abs" style="left:-300px;top:760px;width:560px;animation:f1 7s ease-in-out infinite">
<img src="${A.mascot}" class="abs" style="right:-320px;top:1140px;width:600px;animation:f2 8s ease-in-out infinite">
${centeredLogo(90, 240)}
<div class="abs" style="left:90px;top:330px;width:900px;display:flex;flex-direction:column;align-items:center;gap:20px;text-align:center">
  <div class="display" style="font-size:100px">${esc(f.headline)}</div>
  <div style="font-weight:500;font-size:40px">${esc(f.sub)}</div>
</div>
<div class="abs" style="left:140px;top:720px;width:800px;height:640px;background:${C.cream};border-radius:30px;color:${C.dark};overflow:hidden">${blocks}</div>
<div class="abs" style="left:0;top:1450px;width:1080px;display:flex;flex-direction:column;align-items:center;gap:18px">
  <div style="background:${C.cream};color:${C.dark};font-weight:700;font-size:40px;padding:22px 44px 26px;border-radius:40px">${esc(f.cta)}</div>
  <div style="font-style:italic;font-weight:600;font-size:34px">${esc(f.note)}</div>
</div>`;
    return page({ ...this.size, bg: C.dark, body, css });
  }
};
