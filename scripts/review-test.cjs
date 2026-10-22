const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const sharp = require("sharp");
const axe = require.resolve("axe-core/axe.min.js");
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const results = [];
  const errors = [];
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  page.on("pageerror", (e) => errors.push(e.message));
  let posts = 0;
  page.on("request", (r) => {
    if (r.method() === "POST") posts++;
  });
  const base = process.env.BASE_URL || "http://127.0.0.1:4173";
  try {
    for (const route of [
      "/",
      "/start/",
      "/work/northern-stay/",
      "/work/local-practice/",
      "/privacy/",
      "/concepts/retreat/",
      "/concepts/practice/",
    ]) {
      await page.goto(base + route);
      await page.addScriptTag({ path: axe });
      const a = await page.evaluate(
        async () =>
          await axe.run(document, {
            runOnly: {
              type: "tag",
              values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
            },
          }),
      );
      results.push({
        check: "axe",
        route,
        violations: a.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          targets: v.nodes.map((n) => n.target),
        })),
      });
      assert.equal(
        a.violations.length,
        0,
        route + JSON.stringify(a.violations.map((v) => v.id)),
      );
    }
    for (const route of ["/work/northern-stay/", "/work/local-practice/"]) {
      await page.goto(base + route);
      const frame = page.locator(".demo-stage iframe");
      assert.equal(await frame.getAttribute("src"), null, "Demo is deferred");
      await page.locator(".demo-desk summary").focus();
      await page.keyboard.press("Enter");
      await frame.waitFor();
      await page.waitForFunction(
        () =>
          !!document
            .querySelector("iframe")
            ?.contentDocument?.querySelector("h1"),
      );
      assert.equal(
        await frame.evaluate(
          (e) => e.contentDocument.documentElement.clientWidth,
        ),
        await frame.evaluate((e) => e.clientWidth),
      );
      await page.getByRole("button", { name: "Phone", exact: true }).focus();
      await page.keyboard.press("Space");
      assert.equal(
        await page
          .getByRole("button", { name: "Phone", exact: true })
          .getAttribute("aria-pressed"),
        "true",
      );
      await page.waitForFunction(
        () => document.querySelector("iframe").clientWidth === 390,
      );
      assert.equal(
        await frame.evaluate(
          (e) => e.contentDocument.documentElement.clientWidth,
        ),
        390,
      );
      await sharp(await page.locator(".case-live").screenshot())
        .webp({ quality: 84 })
        .toFile(
          `docs/review-2026-10-22/desk-${route.includes("northern") ? "retreat" : "practice"}.webp`,
        );
      await page.addScriptTag({ path: axe });
      const a = await page.evaluate(() =>
        axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
        }),
      );
      assert.equal(
        a.violations.length,
        0,
        JSON.stringify(a.violations.map((v) => v.id)),
      );
      results.push({
        check: "keyboard responsive desk + axe",
        route,
        passed: true,
      });
    }
    await page.goto(base + "/start/");
    await page.locator("#name").fill("Review Test");
    await page.locator("#email").fill("review@example.test");
    const message =
      "Fictional browser verification. No email is sent.\nUnicode: ää & <test>.";
    await page.locator("#message").fill(message);
    await page.getByRole("button", { name: "Prepare my enquiry" }).click();
    assert((await page.locator("#draft-text").inputValue()).includes(message));
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: "Save enquiry as a text file" }).click(),
    ]);
    assert.equal(download.suggestedFilename(), "radu-project-enquiry.txt");
    assert(
      (await fs.readFile(await download.path(), "utf8")).includes(message),
    );
    await page
      .context()
      .grantPermissions(["clipboard-read", "clipboard-write"]);
    await page
      .getByRole("button", { name: "Copy enquiry", exact: false })
      .click();
    assert(
      (await page.evaluate(() => navigator.clipboard.readText())).includes(
        message,
      ),
    );
    await sharp(await page.locator("#form-result").screenshot())
      .webp({ quality: 84 })
      .toFile("docs/review-2026-10-22/enquiry-prepared.webp");
    await page.locator("#name").fill("Changed");
    assert(await page.locator("#form-result").isHidden());
    assert.equal(posts, 0);
    results.push({
      check: "download, clipboard, encoded draft, invalidation, no submission",
      passed: true,
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + "/");
    await page.locator(".menu-toggle").focus();
    await page.keyboard.press("Enter");
    assert.equal(
      await page.locator(".menu-toggle").getAttribute("aria-expanded"),
      "true",
    );
    await page.keyboard.press("Escape");
    assert(
      await page
        .locator(".menu-toggle")
        .evaluate((e) => e === document.activeElement),
    );
    for (let i = 0; i < 3; i++) {
      await page.locator(".rearrange").focus();
      await page.keyboard.press("Enter");
      assert.equal(
        await page.locator(".architecture").getAttribute("data-composition"),
        String((i + 1) % 3),
      );
      assert(
        (await page.locator(".composition-insight").textContent()).length > 20,
      );
    }
    results.push({
      check: "keyboard menu, escape focus, all sculpture states",
      passed: true,
    });
    for (const width of [320, 390, 600]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(base + "/concepts/practice/");
      await page.evaluate(() => document.fonts.ready);
      const lines = await page.locator("h1").evaluate((h) =>
        [...h.childNodes]
          .filter((n) => n.nodeType === Node.TEXT_NODE)
          .map((n) => {
            const r = document.createRange();
            r.selectNode(n);
            return r.getClientRects().length;
          }),
      );
      assert.deepEqual(lines, [1, 1], `Headline wraps at ${width}`);
    }
    results.push({
      check: "landscape phone headline: two deliberate lines at 320,390,600",
      passed: true,
    });
    for (const [demo, hash] of [
      ["retreat", "#the-stay"],
      ["practice", "#services"],
    ]) {
      await page.goto(base + "/concepts/" + demo + "/");
      await page.locator(`a[href="${hash}"]:visible`).first().click();
      assert(page.url().endsWith(hash));
      await page.locator('a[href="../../start/"]').click();
      assert(page.url().endsWith("/start/"));
    }
    results.push({
      check: "both concept anchor and enquiry journeys",
      passed: true,
    });
    assert.equal(errors.length, 0);
    await fs.mkdir("qa", { recursive: true });
    await fs.writeFile(
      "qa/review-results.json",
      JSON.stringify(
        { date: new Date().toISOString(), results, errors, posts },
        null,
        2,
      ),
    );
    console.log(
      JSON.stringify({
        passed: true,
        checks: results.length,
        axeRoutes: 7,
        openDeskAxeScans: 2,
        posts,
        errors,
      }),
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
