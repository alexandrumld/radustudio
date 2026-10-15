# Technical refinement pass — Radu Studio

Tested 15 October 2026 against the running static preview at `http://127.0.0.1:4173` using system Chromium, Playwright, axe-core 4.14.0 and Lighthouse 13.5.0. Source was rebuilt between corrections and verification. No email, outreach, production deployment or external message was sent.

## Final functional and responsive verification

- **103 checks passed**, including 56 route/viewport combinations: widths 320, 390, 600, 768, 1024, 1440 and 1920 across the homepage, enquiry, privacy, both case studies, both working concepts and the custom 404 document.
- No document horizontal overflow at any tested width; no browser console errors, script exceptions or failing local requests in the final run.
- All crawled internal asset and hash references resolve. Social sharing image returns HTTP 200.
- Mobile menu opens with Enter; Tab reaches its links; Escape closes it and restores trigger focus. Outside pointer clicks, link activation, focus moving outside the header and resizing to desktop close it. Focus after the last nav link is visible and unobscured.
- Sculpture cycles all three compositions with keyboard input and announces each state. Reduced-motion transitions are capped at 0.01ms and content does not depend on scroll entrances.
- Normal motion settles correctly; all 15 observed entrance elements become visible during scrolling. Content remains visible without JavaScript, and the enquiry page presents direct email fallback.
- Form rejects missing names, malformed email addresses and project messages under 15 characters. Error descriptions associate with fields and focus goes to the first invalid field. A valid brief produces a focused result containing an encoded `mailto:team@radu.studio` draft and explicit notice that nothing has been sent.
- Editing a prepared brief invalidates the previous draft. Copy works with clipboard permission; denied clipboard access reveals a selectable text fallback. Honeypot suppresses generation. Preparation makes no external request and submits no data.

## Accessibility

Final axe scan reports **zero WCAG 2 A/AA and WCAG 2.1 A/AA violations** on all seven public content routes. Automated results do not establish full accessibility conformance; keyboard, motion, visible focus and form journeys were also tested directly.

The pass found and verified corrections for low contact-strip text contrast, visible text/accessibility-name mismatches, stale prepared enquiries, and a mobile-menu state that covered the next keyboard-focused CTA.

## Performance

Lighthouse used its default simulated mobile device/network/CPU settings and a fresh local browser. These are laboratory results against the preview server, not production field measurements.

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | 100 | 100 | 100 | 100 | 1.1 s | 1.7 s | 0 ms | 0 |
| Enquiry | 100 | 100 | 100 | 100 | 1.1 s | 1.4 s | 0 ms | 0 |

The profile used Chromium 154, a 412 × 823 mobile viewport at DPR 1.75, simulated 150ms round-trip latency, 1.6Mbps throughput and a 4× CPU slowdown. Both runs completed without warnings. Responsive image corrections reduced the homepage image-delivery estimate from 194KiB of avoidable transfer to 12KiB.

## Evidence

- `qa/technical-results.json`: complete responsive, route, interaction and axe results.
- `qa/motion-keyboard-results.json`: five additional normal-motion, keyboard and no-JavaScript checks, all passed.
- `qa/lighthouse-home-mobile.json` and `qa/lighthouse-start-mobile.json`: raw Lighthouse reports.
- `qa/pass3-start-result-mobile.png`: real selectable enquiry fallback state.
- `qa/technical-pass.cjs` and `qa/motion-and-keyboard.cjs`: execution-environment QA scripts. They reference this environment's Playwright and temporary QA dependency locations; no QA dependencies are shipped to visitors.

## Remaining integration limit

No secure form-delivery service or mailbox credentials were available. The finished enquiry flow truthfully prepares an email for the visitor to review and send, with a webmail copy fallback. Mailbox receipt has not been tested or claimed. Production replacement and any future backend integration remain separate approval decisions.

## Three refinement passes

### 1 — Creative and brand

Rendered desktop/mobile home and case pages, plus every sculpture state. Replaced a poorly framed work capture with the actual illustrated hero; added mobile and content-detail spreads to both cases; replaced the weakest sculpture state with a deliberate component arrangement; varied the repeated typographic rhythm; and carried the modular identity into studio/process graphics. Case headings were recomposed for phones. A standalone vector brand kit and reference sheet preserve the identity beyond this website.

### 2 — Commercial and UX

Named the verified founder without inventing studio scale. Made the first-screen design/development proposition explicit and changed the vague work link to “Explore the work.” Matched retreat-case claims to its implemented editorial demonstration. Stacked small-screen form fields, linked demo enquiries through the accessible main enquiry journey, and preserved clear concept disclosures. Public prices, client metrics, testimonials and unreviewed Finnish copy remain absent.

### 3 — Technical and final craft

Replaced unsupported arrow glyphs with SVGs; corrected small-text contrast and accessible names; fixed mobile focus leaving an open menu; invalidated stale drafts after edits; added responsive screenshot sources, explicit favicons and publicly visible photo attribution; checked every route, form state, no-JS fallback and reduced-motion behavior. Actual desktop/mobile/tablet/wide/intermediate captures are in `docs/screenshots/`.

## Repeatable source checks

`npm test`: 9 HTML documents and 140 local references validated. `npm run test:browser`: 54 route/viewport and full journey checks passed. The separate technical review added 108 checks, including independent axe scans and realistic simulated-mobile Lighthouse. Scores are measured laboratory results, not self-assigned design ratings.

Raw JSON reports and intermediate captures are supplied in the review-evidence archive rather than visitor-facing assets. No real-user, physical-device, Safari or Firefox testing is claimed. Mailbox receipt is not verified; the sender-reviewed email fallback is explicit.

## Deployed verification

The separate protected Vercel staging deployment was checked in real Chromium after publication. All seven content routes returned HTTP 200 and correct titles. No page errors occurred. The deployed enquiry form prepared the correctly addressed email draft and displayed the explicit unsent state. Desktop/mobile deployed captures and `deployed-results.json` are included in the handoff evidence. No outgoing email was sent.
