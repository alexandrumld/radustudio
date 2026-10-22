// Render current work; no external services, messages or deployment.
const { chromium } = require("playwright");
const fs = require("node:fs/promises");
const sharp = require("sharp");
(async () => {
  const cycle = process.argv[2] || "final";
  const dir = "docs/review-2026-10-22";
  await fs.mkdir(dir, { recursive: true });
  const b = await chromium.launch({
    executablePath: process.env.CHROME_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const p = await b.newPage({ reducedMotion: "reduce" });
  for (const [name, route] of [
    ["home", "/"],
    ["enquiry", "/start/"],
    ["retreat", "/work/northern-stay/"],
    ["practice", "/work/local-practice/"],
  ]) {
    for (const [size, width, height] of [
      ["desktop", 1440, 1000],
      ["mobile", 390, 844],
    ]) {
      await p.setViewportSize({ width, height });
      await p.goto("http://127.0.0.1:4173" + route);
      await p.evaluate(() => document.fonts.ready);
      await p.evaluate(async () => {
        for (const img of document.images) {
          img.loading = "eager";
        }
        await Promise.all(
          [...document.images].map((img) => img.decode().catch(() => {})),
        );
      });
      await p.waitForTimeout(150);
      await sharp(await p.screenshot({ fullPage: true }))
        .webp({ quality: 84 })
        .toFile(`${dir}/${cycle}-${name}-${size}.webp`);
    }
  }
  await b.close();
  console.log(`Captured ${cycle}: four routes, desktop and mobile.`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
