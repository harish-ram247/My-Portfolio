// Builds a transparent cutout of the studio portrait.
// The white backdrop is removed by flood-filling from the image border, so the
// white shirt (enclosed by the blazer) is kept. Edges are feathered slightly.
// Usage: node scripts/make-cutout.mjs "<source image>"
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const src = process.argv[2] ?? "Professional photo  Harish Ram S.jpeg";
const OUT_DIR = "public/portrait";
const SCALE = 2; // upscale first so the matte edge is smoother

const meta = await sharp(src).metadata();
const W = meta.width * SCALE;
const H = meta.height * SCALE;

const { data } = await sharp(src)
  .resize(W, H, { kernel: "lanczos3" })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

// "Backdrop-like": bright and nearly colourless.
const isBackdrop = (i) => {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const min = Math.min(r, g, b), max = Math.max(r, g, b);
  return min > 208 && max - min < 26;
};

const mask = new Uint8Array(W * H); // 1 = background
const stack = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const p = y * W + x;
  if (mask[p]) return;
  if (!isBackdrop(p * 3)) return;
  mask[p] = 1;
  stack.push(p);
};
// Seed from the top and side borders only: the bottom edge is the subject.
for (let x = 0; x < W; x++) push(x, 0);
for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y); }
while (stack.length) {
  const p = stack.pop();
  const x = p % W, y = (p / W) | 0;
  push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
}

const alpha = Buffer.alloc(W * H);
for (let p = 0; p < W * H; p++) alpha[p] = mask[p] ? 0 : 255;

// Feather, then pull the edge inward a little to remove the white fringe.
const soft = await sharp(alpha, { raw: { width: W, height: H, channels: 1 } })
  .blur(2.2)
  .linear(1.9, -115)
  .extractChannel(0)
  .raw()
  .toBuffer();

const rgba = Buffer.alloc(W * H * 4);
for (let p = 0; p < W * H; p++) {
  rgba[p * 4] = data[p * 3];
  rgba[p * 4 + 1] = data[p * 3 + 1];
  rgba[p * 4 + 2] = data[p * 3 + 2];
  rgba[p * 4 + 3] = soft[p];
}

await mkdir(OUT_DIR, { recursive: true });
const base = sharp(rgba, { raw: { width: W, height: H, channels: 4 } });
await base.clone().resize({ width: 1100 }).webp({ quality: 86, alphaQuality: 92 }).toFile(`${OUT_DIR}/harish-cutout.webp`);
await base.clone().resize({ width: 640 }).webp({ quality: 84, alphaQuality: 92 }).toFile(`${OUT_DIR}/harish-cutout-640.webp`);
await base.clone().resize({ width: 1100 }).png().toFile(`${OUT_DIR}/harish-cutout.png`);
console.log(`cutout written to ${OUT_DIR} (${W}x${H} source matte)`);
