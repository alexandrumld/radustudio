# Radu Studio — Online Architecture

A complete static studio website, built on an isolated branch from the existing holding page. No frontend framework, server dependency, tracking, cookies, or external runtime font/image requests.

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
```

The browser test uses an existing `/usr/bin/chromium` when available; override `CHROME_PATH` otherwise. Start the preview server first. `BASE_URL` can select a review deployment. No test sends email. `scripts/capture-work.cjs` regenerates case mobile/detail captures from the working concepts using Playwright and Sharp; run it with the preview running, then rebuild.

## Contact behavior

`/start/` validates the brief and prepares an explicitly unsent email to `team@radu.studio`. The visitor opens their email app or copies a webmail-ready message. Changing a field invalidates the previous draft. The site never claims delivery and has no submission server or stored enquiries.

A backend delivery service was not available through configured credentials. The email-draft/copy flow is a functioning, honest fallback. See the release handoff for the integration gap and test limits.

## Production boundary

The original `gh-pages` branch, custom domain and rollback commit remain unchanged. The review branch is `design/studio-2026`. Do not merge to `gh-pages` or connect the custom domain until the owner approves the release. See [deployment and rollback](docs/deployment.md).

The finished review entry point, capture gallery, decisions and remaining boundaries are in [the review handoff](docs/review-handoff.md).
