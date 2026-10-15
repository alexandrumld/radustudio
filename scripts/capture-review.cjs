const { chromium } = require("playwright");
const sharp = require("sharp");
const fs = require("node:fs/promises");
(async () => {
  await fs.mkdir("docs/screenshots", { recursive: true });
  const b = await chromium.launch({
    executablePath: process.env.CHROME_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const p = await b.newPage();
  for (const [name, path] of [
    ["home", "/"],
    ["enquiry", "/start/"],
    ["northern-stay", "/work/northern-stay/"],
    ["local-practice", "/work/local-practice/"],
    ["privacy", "/privacy/"],
    ["retreat-concept", "/concepts/retreat/"],
    ["practice-concept", "/concepts/practice/"],
  ]) {
    for (const [size, width, height] of [
      ["desktop", 1440, 1000],
      ["mobile", 390, 844],
    ]) {
      await p.setViewportSize({ width, height });
      await p.goto("http://127.0.0.1:4173" + path);
      await p.evaluate(() => document.fonts.ready);
      await p.waitForTimeout(1000);
      const docHeight = await p.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < docHeight; y += 650) {
        await p.evaluate((y) => scrollTo(0, y), y);
        await p.waitForTimeout(100);
      }
      await p.waitForTimeout(850);
      await p.evaluate(() => scrollTo(0, 0));
      await p.waitForTimeout(300);
      await sharp(await p.screenshot({ fullPage: true }))
        .webp({ quality: 85 })
        .toFile(`docs/screenshots/${name}-${size}.webp`);
      if (name === "home")
        await p.screenshot({ path: `qa/screenshots/final-home-${size}.png` });
    }
  }
  for (const [size, width, height] of [
    ["tablet", 768, 1024],
    ["intermediate", 1024, 900],
    ["wide", 1920, 1080],
  ]) {
    await p.setViewportSize({ width, height });
    await p.goto("http://127.0.0.1:4173");
    await p.waitForTimeout(1100);
    await sharp(await p.screenshot())
      .webp({ quality: 85 })
      .toFile(`docs/screenshots/home-${size}.webp`);
  }
  await p.setViewportSize({ width: 1200, height: 1400 });
  await p.goto("http://127.0.0.1:4173/docs/brand-sheet.html");
  await p.evaluate(() => document.fonts.ready);
  await sharp(await p.screenshot({ fullPage: true }))
    .webp({ quality: 90 })
    .toFile("docs/screenshots/brand-sheet.webp");
  await b.close();
  console.log("Saved18 real rendered review captures.");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
