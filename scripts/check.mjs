import { readdir, readFile, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
const root = resolve(".");
async function walk(dir) {
  const out = [];
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    if ([".git", "node_modules", "dist", "qa"].includes(ent.name)) continue;
    const p = dir + "/" + ent.name;
    if (ent.isDirectory()) out.push(...(await walk(p)));
    else if (ent.name.endsWith(".html")) out.push(p);
  }
  return out;
}
let failures = [];
let refs = 0;
const pages = await walk(root);
for (const file of pages) {
  const html = await readFile(file, "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  if (new Set(ids).size !== ids.length) failures.push(file + ": duplicate id");
  if (!html.includes('lang="en"'))
    failures.push(file + ": missing document language");
  if (!/<title>[^<]+<\/title>/.test(html))
    failures.push(file + ": missing title");
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const ref = match[1];
    if (/^(?:https?:|mailto:|data:)/.test(ref) || ref === "#") continue;
    refs++;
    const [raw, fragment] = ref.split("#");
    let target = resolve(
      raw?.startsWith("/") ? root : dirname(file),
      raw?.startsWith("/") ? "." + raw : raw || file,
    );
    try {
      if ((await stat(target)).isDirectory()) target += "/index.html";
      await stat(target);
      if (fragment) {
        const content = await readFile(target, "utf8");
        if (!content.includes(`id="${decodeURIComponent(fragment)}"`))
          failures.push(`${file}: missing fragment ${ref}`);
      }
    } catch {
      failures.push(`${file}: broken ${ref}`);
    }
  }
}
const home = await readFile("index.html", "utf8");
if (home.includes("hello@radustudio.com"))
  failures.push("Obsolete contact address");
if (!home.includes("fictional businesses"))
  failures.push("Missing concept disclosure");
for (const file of [
  "assets/social.jpg",
  "assets/favicon.svg",
  "assets/fonts/OFL-Instrument-Sans.txt",
  "assets/fonts/OFL-Instrument-Serif.txt",
]) {
  if ((await stat(file)).size < 100) failures.push("Missing asset: " + file);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(
  `PASS: ${pages.length} HTML documents; ${refs} local links/assets; document metadata, IDs and concept/contact safeguards.`,
);
