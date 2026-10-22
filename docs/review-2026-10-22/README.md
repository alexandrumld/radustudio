# Radu — In better form

Review branch: `design/radu-built-with-intent`, based on `6c07f2d` (merged PR #1). No merge, deployment, DNS change or outgoing email was performed. This record supersedes the October 15 handoff’s publication status, not its historical test results.

## Recovery: what is actually published

On 22 October, `https://radu.studio/` returned HTTP 200 and the Online Architecture homepage. GitHub’s Pages API reports legacy publishing from the root of `gh-pages`; PR #1 is merged. Current live [desktop](live-desktop.webp) and [mobile](live-mobile.webp) captures corroborate the source baseline. The original branch docs, assets, cases, concepts and screenshots were inspected. No unpublished continuation branch was present beyond the merged design branch. The public domain is Radu, not alexmld.com; no ALEXMLD files or services were changed.

The prior recovery found no substantiated Radu commissions or approved asset rights for outside projects. No new client work is asserted here. Both displayed businesses remain explicitly fictional, self-initiated studies. No testimonials, awards, measured business outcomes, public price bands or studio scale were invented.

## Three directions, rendered and challenged

| Direction | Visual prototype | Creative director | Design critic | Prospective client |
| --- | --- | --- | --- | --- |
| Elevated architecture | [Option 1](01-architecture.webp) | The bespoke R and material palette are ownable and coherent. | A softer headline alone would be too little; the proof needs a new composition. | Clear website proposition and a familiar route to work. |
| Vermilion statement | [Option 2](02-vermilion.webp) | Immediate, forceful typographic impact. | Constant red flattens hierarchy and overwhelms the work. “Stand apart” is a common agency claim. | Confident, but gives less reassurance and less room to assess detail. |
| Editorial narrative | [Option 3](03-editorial.webp) | Warmer story, larger type and a framed object. | The long headline crowds the mark; another generic “next chapter” promise. | Good narrative potential, but still needs concrete proof. |

Selected: elevated architecture, strengthened with editorial proof. “Your business. In better form.” makes the client the subject. The modular R remains the visual signature; its three compositions now explain structure, expression and systems. The work becomes two alternating business stories rather than a pair of screenshots. The new **design desk** makes the actual responsive build inspectable inside each case. Nothing waits for a preloader or depends on animation.

## Three rendered critique cycles

Each cycle was captured at 1440×1000 and 390×844 on home, enquiry and both cases. These are Chromium renders, not generated mockups. The first cycle’s mobile lazy-image capture was incomplete; it is retained as diagnostic evidence and was rejected as final proof. Capture now explicitly decodes all images.

| Cycle | Three weakest elements found | Changes made | Comparison |
| --- | --- | --- | --- |
| 1 | Opening copy was interchangeable; work images lacked business reasoning; founder benefit stayed abstract. | Replaced the opening, composed alternating editorial work stories, and made the studio promise “the person you talk to is the person who builds it.” | Clearer client relevance than the baseline while preserving its identity. [Desktop](cycle-1-home-desktop.webp), [mobile](cycle-1-home-mobile.webp). |
| 2 | Case proof was still static; the draft method was disclosed too late; the small-screen image capture could be blank. | Added an opt-in responsive live demo desk, moved the email limitation before the fields, added text-file export and decoded lazy images for captures. | Proof becomes testable; visitors understand the contact method before investing effort. [Case](cycle-2-retreat-desktop.webp), [enquiry](cycle-2-enquiry-mobile.webp). |
| 3 | Case decisions remained generic; enquiry intro pushed fields too far down; the design desk revealed a three-line landscape headline with tight leading on phones. | Named actual type, layout and illustration decisions; shortened the mobile enquiry copy; recomposed the demo headline into two intentional lines, refreshed the asset and clarified open/close state. | More specific evidence and a calmer phone composition. [Third pass](cycle-3-home-mobile.webp), [final open desk](desk-practice.webp). |

The critic rejected a full-red rebuild and oversized editorial framing. The client role rejected treating a generated draft as a submitted enquiry. The strongest baseline elements—palette, vector identity, original landscape illustration, working concepts, local fonts, clear services and process—remain.

## Final walkthrough and captures

1. **Landing — healthy:** service and independent-business audience are visible immediately, with work and project links. [Before desktop](before-desktop.webp) / [after desktop](final-home-desktop.webp); [before mobile](before-mobile.webp) / [after mobile](final-home-mobile.webp).
2. **Work — healthy, with an explicit proof limit:** two distinct business questions lead to truthful studies. These demonstrate execution, not client outcomes. [Retreat](final-retreat-desktop.webp), [landscape](final-practice-desktop.webp).
3. **Interactive proof — healthy in Chromium:** open the design desk, use wide/phone controls, scroll the actual concept, or open the full site. Keyboard controls expose pressed state; demos are deferred until requested. [Retreat desk](desk-retreat.webp), [landscape desk](desk-practice.webp).
4. **Confidence — healthy:** founder, scope, services, process and practical questions remain available before enquiry. No unsupported results or prices.
5. **Enquiry — functional fallback, delivery unverified:** validate, review, then open email, copy or download. Changing a field hides the old draft. [Mobile](final-enquiry-mobile.webp), [prepared state](enquiry-prepared.webp). Nothing claims receipt.

## Verification

See [measured results](measurements.json), [browser results](browser-results.json) and [interaction/accessibility evidence](review-results.json). Commands: `npm ci`, `npm run build`, `npm test`, start `npm run dev`, then `npm run test:browser` and `npm run test:review`. Captures: `node scripts/review-capture.cjs final`.

- Source check: 9 HTML documents and 144 local link/asset references, metadata, unique IDs, fiction/contact safeguards.
- Browser suite: 54 route/viewport and journey checks across 320, 390, 600, 768, 1024, 1440 and 1920px; no horizontal document overflow, broken loaded images or page errors. Covers navigation, menu Escape/focus, sculpture, validation, unsent mail draft, stale draft, reduced motion and no-JavaScript fallback.
- Extended review: 13 checks passed, including zero axe WCAG 2/2.1 A/AA violations on seven routes and both open demo desks; keyboard wide/phone switching; 390px embedded responsive viewport; clipboard and actual downloadable text content; Unicode/multiline brief; draft invalidation; no POST requests. Separate checks enforce the landscape headline’s two deliberate lines at 320/390/600px.
- Local simulated-mobile Lighthouse: home **99 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**, LCP **2.0s**, TBT **0ms**, CLS **0**. Enquiry **100 / 100 / 100 / 100**, LCP **1.7s**, TBT **0ms**, CLS **0**. This is laboratory evidence, not field performance. Lighthouse was run before the final demo typography and open/close label correction; neither changes the initial homepage or enquiry layout.
- No server-side delivery, mailbox receipt, production version of this branch, Safari, Firefox, physical touch device, assistive-technology user session or real-user performance is verified. Axe and keyboard tests do not establish full accessibility conformance.

## Email delivery investigation and setup

The verified published host is static GitHub Pages. The repository contains only a static Vercel configuration; this session has no ready email secret, mailbox binding, sending-domain verification or delivery endpoint. A static host cannot keep a provider secret. Adding an untested third-party form would create a misleading success path, so no provider was provisioned and no request containing personal data was sent.

The delivered fallback now explains its method up front, accepts an optional free-text budget, encodes an email draft, copies a complete webmail message, and exports a plain-text brief. Long mailto URLs can be truncated by email clients; the full copy/download remains available and the result explains this limitation. No data is persisted by the website.

To enable direct delivery later:

1. Owner selects/authorizes a server-side host and email provider, verifies the sending domain and recipient mailbox, and supplies a server-only credential. Keep GitHub Pages or approve a separate hosting migration explicitly.
2. Implement a same-origin endpoint or narrowly allowed API origin. Validate lengths/email server-side, restrict recipient to `team@radu.studio`, set the visitor only as Reply-To, and add rate limits and an abuse control. Never put keys in the static bundle or accept arbitrary recipients.
3. Return provider acceptance/error states honestly. Add duplicate-submit protection, recoverable failures and the existing email fallback. Update privacy wording for the chosen processor and actual retention.
4. Use an owner-approved test email. Verify provider response, delivery event and actual inbox receipt; test rejected, timed-out and duplicate requests. Only then replace “Prepare” with a submission action. No receipt claim before that evidence.

## Launch checklist — approval still required

- [ ] Owner reviews this PR, final desktop/mobile captures, case fiction labels, founder wording and contact mailbox.
- [ ] Test email manually from a real email client/webmail and verify receipt; no mailbox access is available in this session.
- [ ] Check Safari/iOS and Firefox, real touch scrolling in the opt-in demo, and assistive technology if available.
- [ ] Approve merge into `gh-pages`. That merge triggers publication; **do not merge as part of this review**.
- [ ] After approved publication, check HTTPS, home, both cases/demos, `/start/`, 404, favicon/social image, canonical URLs and live mail draft. No DNS change is needed for this branch.
- [ ] Rollback if needed by reverting the approved refinement merge on `gh-pages` to restore `6c07f2d`; keep `CNAME` unchanged. Confirm the live build afterward.

Review captures are not shipped in `dist/`. All fonts and imagery remain local; new behavior uses native browser APIs and no runtime dependency.
