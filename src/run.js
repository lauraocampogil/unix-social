// One pass: every "Approved" post in Notion → rendered → uploaded → scheduled in Postiz → "Scheduled".
import { rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { approvedPosts, markScheduled, markError } from './notion.js';
import { upload, schedule } from './postiz.js';
import { render, closeBrowser } from './render.js';

const REQUIRED = ['NOTION_TOKEN', 'NOTION_POSTS_DB', 'POSTIZ_URL', 'POSTIZ_API_KEY'];

function publishDate(publishAt) {
  const soon = Date.now() + 10 * 60 * 1000;
  if (!publishAt) return new Date(soon).toISOString();
  // A date without time ("2026-11-10") → 10:00 Brussels time is a good default slot.
  const d = new Date(publishAt.length === 10 ? `${publishAt}T10:00:00+01:00` : publishAt);
  return new Date(Math.max(d.getTime(), soon)).toISOString();
}

export async function runOnce() {
  const missing = REQUIRED.filter((k) => !process.env[k]);
  if (missing.length) throw new Error('Missing env vars: ' + missing.join(', '));

  const posts = await approvedPosts();
  console.log(`[run] ${posts.length} approved post(s)`);
  for (const post of posts) {
    const dir = `out/${post.id}`;
    try {
      if (!post.template) throw new Error('No template selected');
      if (!post.platforms.length) throw new Error('No platform selected');
      let fields = {};
      if (post.fieldsRaw.trim()) {
        try { fields = JSON.parse(post.fieldsRaw); } catch (e) { throw new Error('Fields (JSON) is not valid JSON: ' + e.message); }
      }
      console.log(`[run] rendering "${post.title}" with ${post.template}`);
      const { kind, files, template } = await render(post.template, fields, dir, 'unix');
      const media = [];
      for (const f of files) media.push(await upload(f));
      const res = await schedule({
        date: publishDate(post.publishAt),
        caption: post.caption || post.title,
        media,
        platforms: post.platforms,
        kind,
        igPostType: template.igPostType
      });
      const ids = (Array.isArray(res) ? res : [res]).map((r) => r.postId || r.id || r.group).filter(Boolean).join(', ');
      await markScheduled(post.id, { postizIds: ids || JSON.stringify(res).slice(0, 500), preview: media[0]?.path });
      console.log(`[run] ✓ scheduled "${post.title}"`);
    } catch (err) {
      console.error(`[run] ✗ "${post.title}":`, err.message);
      await markError(post.id, err.message).catch((e) => console.error('[run] could not write error to Notion', e.message));
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }
  await closeBrowser();
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runOnce().catch((e) => { console.error(e); process.exit(1); });
}
