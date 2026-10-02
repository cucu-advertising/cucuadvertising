// Generates right-sized WebP copies of the site's public images.
//   public/<path>.webp  ->  public/optimized/w<width>/<path>.webp
// It finds every "/Clientwork/…", "/workbranding/…", "/brands/…" or "/videos/…" image path
// written anywhere in src/, so new images are picked up automatically.
// Originals are never modified. Re-run after adding or replacing images:
//   npm run optimize-images
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const WIDTHS = [600, 1200, 2000];
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(dir, e.name)) : /\.(jsx?|tsx?)$/.test(e.name) ? [path.join(dir, e.name)] : []);

const pattern = /["'`](\/(?:Clientwork|workbranding|brands|videos)\/[^"'`]+?\.(?:webp|jpe?g|png))["'`]/g;
const images = new Set();
for (const file of walk(path.join(root, "src"))) {
  for (const m of fs.readFileSync(file, "utf8").matchAll(pattern)) images.add(m[1]);
}

let made = 0, skipped = 0, missing = 0;
for (const url of images) {
  const input = path.join(root, "public", url);
  if (!fs.existsSync(input)) { missing++; continue; }
  const meta = await sharp(input).metadata();
  for (const w of WIDTHS) {
    const out = path.join(root, "public/optimized", `w${w}`, url.replace(/\.(jpe?g|png)$/i, ".webp"));
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(input).mtimeMs) { skipped++; continue; }
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(input).resize({ width: Math.min(w, meta.width) }).webp({ quality: w >= 2000 ? 80 : 78 }).toFile(out);
    made++;
  }
}
console.log(`images found: ${images.size} | copies written: ${made}, up to date: ${skipped}` + (missing ? ` | referenced but missing on disk: ${missing}` : ""));
