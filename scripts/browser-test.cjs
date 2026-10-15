const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const base = process.env.BASE_URL || "http://127.0.0.1:4173";
(async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      (require("node:fs").existsSync("/usr/bin/chromium")
        ? "/usr/bin/chromium"
        : undefined),
    args: ["--no-sandbox"],
  });
  let checks = 0;
  const errors = [];
  try {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
    });
    page.on("pageerror", (e) => errors.push(e.message));
    for (const width of [320, 390, 600, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of [
        "/",
        "/start/",
        "/work/northern-stay/",
        "/work/local-practice/",
        "/privacy/",
        "/concepts/retreat/",
        "/concepts/practice/",
      ]) {
        const r = await page.goto(base + route);
        assert.equal(r.status(), 200, route);
        await page.evaluate(() => document.fonts.ready);
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          `Overflow: ${route} ${width}`,
        );
        assert.equal(
          await page
            .locator("img")
            .evaluateAll(
              (imgs) =>
                imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
            ),
          0,
        );
        checks++;
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + "/");
    await page.getByRole("button", { name: /^Menu/ }).click();
    assert.equal(
      await page.locator(".menu-toggle").getAttribute("aria-expanded"),
      "true",
    );
    await page.keyboard.press("Escape");
    assert.equal(
      await page.locator(".menu-toggle").getAttribute("aria-expanded"),
      "false",
    );
    assert.equal(
      await page
        .locator(".menu-toggle")
        .evaluate((e) => e === document.activeElement),
      true,
    );
    checks++;
    await page
      .getByRole("button", { name: "Rearrange the Radu sculpture" })
      .click();
    assert.equal(
      await page.locator(".architecture").getAttribute("data-composition"),
      "1",
    );
    await page
      .getByRole("button", { name: "Rearrange the Radu sculpture" })
      .click();
    assert.equal(
      await page.locator(".architecture").getAttribute("data-composition"),
      "2",
    );
    checks++;
    await page.goto(base + "/start/");
    let posts = 0;
    page.on("request", (r) => {
      if (r.method() === "POST") posts++;
    });
    await page.getByRole("button", { name: "Prepare my enquiry" }).click();
    assert.equal(await page.locator('[aria-invalid="true"]').count(), 3);
    assert.equal(
      await page.locator("#name").evaluate((e) => e === document.activeElement),
      true,
    );
    await page.locator("#name").fill("Review Test");
    await page.locator("#email").fill("review@example.test");
    await page
      .locator("#message")
      .fill("A fictional enquiry used only for browser testing.");
    await page.getByRole("button", { name: "Prepare my enquiry" }).click();
    assert(await page.locator("#form-result").isVisible());
    const draft = await page.locator("#email-draft").getAttribute("href");
    assert(draft.startsWith("mailto:team@radu.studio?subject="));
    assert(
      draft.includes(
        encodeURIComponent(
          "A fictional enquiry used only for browser testing.",
        ),
      ),
    );
    await page
      .locator("#message")
      .fill("Updated fictional enquiry used only for browser testing.");
    assert(
      await page.locator("#form-result").isHidden(),
      "Stale draft hidden after edit",
    );
    await page.getByRole("button", { name: "Prepare my enquiry" }).click();
    assert(
      (await page.locator("#email-draft").getAttribute("href")).includes(
        encodeURIComponent("Updated fictional enquiry"),
      ),
    );
    assert.equal(posts, 0);
    checks++;
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(base + "/");
    assert.equal(await page.locator(".js-motion").count(), 0);
    assert(await page.locator("h1").isVisible());
    assert.equal(
      await page
        .locator(".module")
        .first()
        .evaluate((e) => getComputedStyle(e).transitionDuration),
      "1e-05s",
    );
    checks++;
    const plain = await browser.newContext({ javaScriptEnabled: false });
    const plainPage = await plain.newPage();
    await plainPage.goto(base + "/");
    assert(await plainPage.locator("h1").isVisible());
    await plainPage.goto(base + "/start/");
    assert(await plainPage.locator("noscript").isVisible());
    await plain.close();
    checks++;
    assert.equal(errors.length, 0, errors.join("\n"));
    await fs.mkdir("qa", { recursive: true });
    await fs.writeFile(
      "qa/browser-results.json",
      JSON.stringify(
        {
          base,
          date: new Date().toISOString(),
          checks,
          passed: true,
          pageErrors: errors,
        },
        null,
        2,
      ),
    );
    console.log(
      `PASS: ${checks} viewport/route and journey checks; no browser errors; no email sent.`,
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
