// Minimal Notion REST client for the "Posts" database.
const API = process.env.NOTION_API || 'https://api.notion.com/v1';
const VERSION = '2022-06-28';

const headers = () => ({
  Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
  'Notion-Version': VERSION,
  'Content-Type': 'application/json'
});

async function call(method, url, body) {
  const res = await fetch(API + url, { method, headers: headers(), body: body ? JSON.stringify(body) : undefined });
  if (!res.ok) throw new Error(`Notion ${method} ${url} → ${res.status} ${await res.text()}`);
  return res.json();
}

const text = (p) => (p?.rich_text || p?.title || []).map((t) => t.plain_text).join('');

function toPost(page) {
  const p = page.properties;
  return {
    id: page.id,
    url: page.url,
    title: text(p['Post']),
    template: p['Template']?.select?.name,
    platforms: (p['Platforms']?.multi_select || []).map((o) => o.name),
    publishAt: p['Publish at']?.date?.start || null,
    language: p['Language']?.select?.name || 'EN',
    fieldsRaw: text(p['Fields (JSON)']),
    caption: text(p['Caption']),
    hashtags: text(p['Hashtags'])
  };
}

export async function approvedPosts() {
  const db = process.env.NOTION_POSTS_DB;
  const out = [];
  let cursor;
  do {
    const r = await call('POST', `/databases/${db}/query`, {
      filter: { property: 'Status', status: { equals: 'Approved' } },
      sorts: [{ property: 'Publish at', direction: 'ascending' }],
      start_cursor: cursor
    });
    out.push(...r.results.map(toPost));
    cursor = r.has_more ? r.next_cursor : undefined;
  } while (cursor);
  return out;
}

const rt = (s) => ({ rich_text: [{ type: 'text', text: { content: String(s).slice(0, 1990) } }] });

export async function markScheduled(id, { postizIds, preview }) {
  await call('PATCH', `/pages/${id}`, {
    properties: {
      Status: { status: { name: 'Scheduled' } },
      'Postiz ID': rt(postizIds),
      Preview: { url: preview || null },
      Error: rt('')
    }
  });
}

export async function markError(id, message) {
  await call('PATCH', `/pages/${id}`, {
    properties: { Status: { status: { name: 'Error' } }, Error: rt(message) }
  });
}
