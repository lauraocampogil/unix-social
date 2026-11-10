// Postiz public API (self-hosted): https://<your-postiz>/api/public/v1
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const base = () => process.env.POSTIZ_URL.replace(/\/$/, '') + '/api/public/v1';
const auth = () => ({ Authorization: process.env.POSTIZ_API_KEY });

async function call(method, url, body, isForm = false) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(base() + url, {
      method,
      headers: isForm ? auth() : { ...auth(), 'Content-Type': 'application/json' },
      body: isForm ? body : body ? JSON.stringify(body) : undefined
    });
    if (res.ok) return res.json();
    const msg = `Postiz ${method} ${url} → ${res.status} ${await res.text()}`;
    if ((res.status >= 500 || res.status === 429) && attempt < 3) {
      await new Promise((r) => setTimeout(r, 2000 * 2 ** attempt));
      continue;
    }
    throw new Error(msg);
  }
}

let integrationsCache;
export async function integrations() {
  integrationsCache ??= await call('GET', '/integrations');
  return integrationsCache;
}

// Which Postiz channel to use for each Notion platform.
// Override with POSTIZ_INTEGRATION_INSTAGRAM / _TIKTOK / _LINKEDIN (integration ids) if needed.
const PREFERRED = {
  Instagram: ['instagram-standalone', 'instagram'],
  TikTok: ['tiktok'],
  LinkedIn: ['linkedin-page', 'linkedin']
};

export async function findIntegration(platform) {
  const list = await integrations();
  const forced = process.env[`POSTIZ_INTEGRATION_${platform.toUpperCase()}`];
  const found = forced
    ? list.find((i) => i.id === forced)
    : PREFERRED[platform].map((id) => list.find((i) => (i.identifier || i.providerIdentifier) === id && !i.disabled)).find(Boolean);
  if (!found) throw new Error(`No Postiz channel connected for ${platform}. Connect it in Postiz first.`);
  return { id: found.id, type: found.identifier || found.providerIdentifier };
}

export async function upload(file) {
  const form = new FormData();
  const mime = file.endsWith('.mp4') ? 'video/mp4' : 'image/png';
  form.append('file', new Blob([await readFile(file)], { type: mime }), path.basename(file));
  const r = await call('POST', '/upload', form, true);
  return { id: r.id, path: r.path };
}

function settingsFor(type, { kind, igPostType, caption }) {
  if (type.startsWith('instagram')) return { __type: type, post_type: igPostType, is_trial_reel: false, collaborators: [] };
  if (type === 'tiktok') {
    const isVideo = kind === 'video';
    return {
      __type: 'tiktok',
      title: caption.split('\n')[0].slice(0, 90),
      privacy_level: process.env.TIKTOK_PRIVACY || 'PUBLIC_TO_EVERYONE',
      duet: false,
      stitch: false,
      comment: true,
      autoAddMusic: isVideo ? 'no' : 'yes',
      brand_content_toggle: false,
      brand_organic_toggle: false,
      content_posting_method: 'DIRECT_POST'
    };
  }
  if (type.startsWith('linkedin')) return { __type: type, post_as_images_carousel: kind === 'carousel', carousel_name: 'Unix Studio' };
  return { __type: type };
}

/** Schedules one post on several platforms in a single API call (the create endpoint is rate-limited). */
export async function schedule({ date, caption, media, platforms, kind, igPostType }) {
  const posts = [];
  for (const platform of platforms) {
    const integ = await findIntegration(platform);
    posts.push({
      integration: { id: integ.id },
      value: [{ content: caption, image: media }],
      settings: settingsFor(integ.type, { kind, igPostType, caption })
    });
  }
  return call('POST', '/posts', { type: 'schedule', date, shortLink: false, tags: [], posts });
}
