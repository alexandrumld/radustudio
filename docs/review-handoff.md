> Historical October 15 handoff. PR #1 has since merged and is live. See the [October 22 review](review-2026-10-22/README.md) for current branch, publication state and launch checklist.

# Radu Studio — finished review handoff

## Review the result

- [Working review deployment](https://radu-studio-review-1h7f5uy4r-alexmld.vercel.app) — separate Vercel staging project with access protection.
- [Draft pull request #1](https://github.com/alexandrumld/radustudio/pull/1) — review only, targeting the existing `gh-pages` branch.
- Website implementation commit: `f372330da3c4644d0d148f13b00a7864881a4587`. Later documentation-only commits do not change the deployed runtime.
- Original production remains at `47674e1509699b254c9ee5702c36e9db1821fb4e`. The custom domain, production branch and ALEXMLD project were not changed.

The owner can sign in to the protected review URL. A temporary share link is provided in the conversation, not committed to this public repository.

## Creative decision

**Online Architecture, with editorial warmth.** Three directions were compared: modular digital architecture, a provocative independent-studio identity, and an editorial creative house. The chosen design retains Radu’s own Online Architecture idea, combining a bespoke six-part R, mineral paper, ink, vermilion, and deliberate sans/serif tension. Visitors can move the mark through Structure, Expression and Components. The reusable vector kit and brand reference sheet carry that identity beyond the website.

## What is delivered

A complete homepage with services, studio, process and practical FAQs; two detailed exploration pages; two working fictional demonstration sites; a responsive enquiry journey; privacy and custom 404 pages; search/schema/social metadata; locally served fonts and images; reduced-motion and keyboard support; and a zero-runtime-dependency static build.

Both displayed projects are labeled fictional self-initiated concepts on the index, case page and demo. There are no invented commissions, testimonials, awards, outcomes or public prices. The independent studio is truthfully founder-led.

## Review captures and identity

- [Desktop home](screenshots/home-desktop.webp) · [Mobile home](screenshots/home-mobile.webp) · [Tablet](screenshots/home-tablet.webp) · [Wide](screenshots/home-wide.webp)
- [Retreat case, desktop](screenshots/northern-stay-desktop.webp) · [Mobile](screenshots/northern-stay-mobile.webp)
- [Landscape case, desktop](screenshots/local-practice-desktop.webp) · [Mobile](screenshots/local-practice-mobile.webp)
- [Enquiry, desktop](screenshots/enquiry-desktop.webp) · [Mobile](screenshots/enquiry-mobile.webp)
- [Brand sheet](screenshots/brand-sheet.webp) · [Brand guide](brand-guide.md) · [Original SVG identity](../assets/brand/)

There are 18 final rendered captures in `docs/screenshots/`, including both live concepts and privacy. Deployed screenshots and raw JSON evidence accompany the downloadable handoff archive.

## Verification

Real Chromium renders and browser interaction tests cover 320, 390, 600, 768, 1024, 1440 and 1920px. Three refinement passes corrected observed creative, commercial and technical weaknesses. Independent technical QA passed 108 checks; the portable browser suite passed 54 checks. Static checking validated 9 HTML documents and 140 local references. Final axe scans found zero WCAG violations on seven content routes.

Simulated-mobile Lighthouse: home and enquiry each scored 100 Performance / 100 Accessibility / 100 Best Practices / 100 SEO. Home LCP 1.7s; enquiry LCP 1.4s; both TBT 0ms and CLS 0. These are local lab results, not production field measurements.

The actual deployed staging build was then tested through its protected access link: all seven routes returned HTTP 200, page titles were correct, there were no browser errors, and the real enquiry flow prepared the correctly addressed unsent draft. No email was sent.

## Remaining boundaries

The enquiry flow validates and prepares an email for the visitor to send, with a working copy-to-webmail fallback. No server-side delivery credentials were available; delivery and mailbox receipt are not claimed. Public pricing and Finnish localization await separate approval/review. Production publication requires explicit owner approval.

[Deployment and rollback instructions](deployment.md) · [Detailed verification and refinement record](verification.md) · [Creative research](creative-direction.md) · [Asset provenance](concept-assets.md).
