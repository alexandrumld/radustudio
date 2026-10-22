# Radu Studio — Online Architecture

A complete static studio website. The October 22 refinement builds on merged PR #1 and is isolated on `design/radu-built-with-intent`. No frontend framework, server dependency, tracking, cookies, or external runtime font/image requests.

## Run and review

```sh
npm run build
npm run dev
```

Open http://localhost:4173. Node 20+ is sufficient to build and serve. `dist/` is the portable production artifact. The generated root pages also support the existing GitHub Pages configuration directly.

Routes: `/`, `/start/`, `/work/northern-stay/`, `/work/local-practice/`, `/privacy/`, two working fictional concepts under `/concepts/`, and `404.html`.

## Source

- `src/build.mjs`: shared shell, copy, page composition and metadata. Edit here, then build.
- `assets/site.css`: design system, responsive layouts, motion and states.
- `assets/site.js`: accessible navigation, modular identity interaction and email enquiry preparation.
- `concepts/`: independent static demonstration sites with explicit fiction labels.
- `assets/brand/`: reusable original SVG identity assets.
- `docs/`: creative decision, brand guide, asset credits, QA and deployment handoff.

Generated HTML is tracked because GitHub Pages currently serves the branch root. Do not edit generated pages without updating `src/build.mjs`.

## Verify

```sh
npm test
npm ci
npx playwright install chromium   # only if no Chromium is installed
npm run test:browser
npm run test:review
```

The browser test uses an existing `/usr/bin/chromium` when available; override `CHROME_PATH` otherwise. Start the preview server first. `BASE_URL` can select a review deployment. No test sends email. `scripts/capture-work.cjs` regenerates case mobile/detail captures from the working concepts using Playwright and Sharp; run it with the preview running, then rebuild.

## Contact behavior

`/start/` validates the brief and prepares an explicitly unsent email to `team@radu.studio`. The visitor opens their email app, copies a webmail-ready message, or saves the brief as a text file. Changing a field invalidates the previous draft. The site never claims delivery and has no submission server or stored enquiries.

A backend delivery service was not available through configured credentials. The email-draft/copy flow is a functioning, honest fallback. See the release handoff for the integration gap and test limits.

## Production boundary

As verified on 22 October 2026, GitHub Pages serves `gh-pages` at radu.studio and PR #1 is merged. The current review branch is `design/radu-built-with-intent`. Merging it into `gh-pages` will publish changes; owner approval is required. No deployment or DNS change was performed in this refinement.

The current [review, screenshots, measurements and launch checklist](docs/review-2026-10-22/README.md) supersede the original October 15 handoff. The original docs remain as historical evidence.
