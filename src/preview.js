// Local preview, no Notion / Postiz needed.
//   node src/preview.js                       → renders every template with its example texts
//   node src/preview.js quiz-story            → one template, example texts
//   node src/preview.js quiz-story my.json    → one template with your own fields
import { readFile } from 'node:fs/promises';
import { render, closeBrowser } from './render.js';
import { templates } from '../templates/index.js';

const [name, json] = process.argv.slice(2);
const names = name ? [name] : Object.keys(templates);
const fields = json ? JSON.parse(await readFile(json, 'utf8')) : {};

for (const n of names) {
  const t0 = Date.now();
  const res = await render(n, fields, `out/preview/${n}`, n);
  console.log(`✓ ${n} (${res.kind}) → ${res.files.join(', ')}  [${((Date.now() - t0) / 1000).toFixed(1)}s]`);
}
await closeBrowser();
