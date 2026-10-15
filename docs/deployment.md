# Deployment and rollback

## Current boundary

- Source repository: `alexandrumld/radustudio`.
- Original live branch: `gh-pages`.
- Original published commit: `47674e1509699b254c9ee5702c36e9db1821fb4e`.
- New isolated review branch: `design/studio-2026`.
- The existing custom-domain `CNAME` is preserved. No DNS, ALEXMLD source, personal deployment or production branch changes are part of this work.

The review preview is separate from the current production website. It must not be promoted or assigned `radu.studio` before explicit owner approval.

## Build

Node 20 or later:

```sh
npm run build
npm test
```

This writes generated root pages for the existing Pages setup and a clean static `dist/` artifact. No runtime packages, secrets or external integrations are required. Deploy **the contents of `dist/`** to a static host. The GitHub Pages branch-root route uses the generated root files and retained `CNAME`.

For the separate Vercel review project: framework Other, build command `npm run build`, output `dist`, install command `npm ci --omit=dev`. A deployment with no production target is a review deployment. Do not link an ALEXMLD project or assign a production domain.

## Approved production release

1. Owner approves the actual review branch/preview and the client-side email-draft contact behavior, or supplies a suitable delivery integration.
2. Confirm GitHub Pages still serves `gh-pages` root and the custom domain remains `radu.studio`.
3. Rebuild, run the documented checks, and merge the reviewed source into `gh-pages` through a reviewed release commit.
4. Check the Pages deployment finishes, then inspect `/`, both case routes, both concept routes, `/start/`, `/privacy/`, `404.html`, `sitemap.xml` and `assets/social.jpg` on the domain.
5. Check canonical/social URLs on the live domain and attempt the complete draft/copy enquiry journey. A real test email is a separate explicitly authorized action; preparation does not establish delivery.

No automatic production pipeline or paid service is activated by this implementation.

## Rollback

Keep the release commit SHA. Use GitHub's Revert action (or create a normal `git revert` commit) for that release if a rollback is needed. Do not force-push or reset the public branch. The original holding page remains recoverable from `47674e1509699b254c9ee5702c36e9db1821fb4e`; its email address is historical and should be corrected if deliberately restored for longer use.

The separate review deployment can be left in place for discussion or removed independently. It does not control the existing domain.

## Remaining decisions and limits

- **Production publication:** awaiting explicit owner approval.
- **Server-side enquiry delivery:** no configured delivery credentials or approved processor were available. The working fallback prepares an email and provides copy-to-webmail. No delivery was claimed or tested.
- **Portfolio:** both presented projects are fictional demonstrations. Replace or expand only with verified projects and confirmed asset rights.
- **Pricing:** proposed fees recovered from earlier materials were not approved public prices and are absent from the website. Form budget bands are visitor preferences, not an advertised price list.
- **Finnish:** no unreviewed Finnish copy is published. Native review is needed before localization.
- **Privacy:** no trackers or cookies are added. Review the notice against the final hosting/mail provider and legal contracting arrangements before production if those arrangements change.
- **Verification:** Chromium lab checks and simulated-mobile Lighthouse are evidence, not real-device user research, cross-browser certification or production field metrics.
