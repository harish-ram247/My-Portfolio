// Turns a transparent portrait cutout (PNG with alpha) into the site's assets:
// trims the empty margin, keeps the bottom edge flush (the shoulders are cut by
// the frame), and writes two WebP sizes. Prints the final width and height.
// Usage: node scripts/export-portrait.mjs "<cutout.png>"
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const src = process.argv[2];
if (!src) {
  console.error("Pass the path of a transparent PNG cutout.");
  process.exit(1);
}
const OUT_DIR = "public/portrait";

const trimmed = await sharp(src).ensureAlpha().trim({ threshold: 4 }).png().toBuffer({ resolveWithObject: true });
const { width, height } = trimmed.info;

await mkdir(OUT_DIR, { recursive: true });
const base = sharp(trimmed.data);
await base.clone().resize({ width: Math.min(1100, width) }).webp({ quality: 88, alphaQuality: 95 }).toFile(`${OUT_DIR}/harish-cutout.webp`);
await base.clone().resize({ width: 640 }).webp({ quality: 85, alphaQuality: 92 }).toFile(`${OUT_DIR}/harish-cutout-640.webp`);

const out = await sharp(`${OUT_DIR}/harish-cutout.webp`).metadata();
console.log(`trimmed ${width}x${height}; wrote ${OUT_DIR}/harish-cutout.webp at ${out.width}x${out.height}`);
