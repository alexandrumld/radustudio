const { chromium } = require("playwright");
const sharp = require("sharp");
(async () => {
  const b = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  for (const demo of ["retreat", "practice"]) {
    const p = await b.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 1,
    });
    await p.goto("http://127.0.0.1:4173/concepts/" + demo + "/");
    await p.waitForTimeout(1400);
    await p.evaluate(() => scrollTo(0, 0));
    await sharp(await p.screenshot())
      .webp({ quality: 88 })
      .toFile("assets/" + demo + "-mobile.webp");
    await p.setViewportSize({ width: 1200, height: 800 });
    await p.reload();
    await p.waitForTimeout(1200);
    await p
      .locator(demo === "retreat" ? "#the-stay" : "#services")
      .scrollIntoViewIfNeeded();
    await p.waitForTimeout(300);
    await sharp(await p.screenshot())
      .webp({ quality: 86 })
      .toFile("assets/" + demo + "-detail.webp");
    await p.close();
  }
  await b.close();
})();
