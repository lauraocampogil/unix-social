// Long-running worker for Coolify: checks Notion every CHECK_EVERY_MINUTES (default 10).
import { runOnce } from './run.js';

const every = Number(process.env.CHECK_EVERY_MINUTES || 10) * 60 * 1000;
let busy = false;

async function tick() {
  if (busy) return;
  busy = true;
  try {
    await runOnce();
  } catch (e) {
    console.error('[cron]', e.message);
  } finally {
    busy = false;
  }
}

console.log(`[cron] unix-social worker started, checking Notion every ${every / 60000} min`);
tick();
setInterval(tick, every);
