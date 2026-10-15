# Radu Studio demonstration sites

Both are fictional, self-initiated design studies, not paying-client work. They are visibly labeled at the top and in the contact area; no awards, results, real clients, reservations, testimonials, or legal claims are presented. Both use `noindex,follow` and honest `mailto:team@radu.studio` calls to action rather than simulated form success.

## Saaren / hospitality

Source: `/workspace/radu-studio/concepts/retreat/index.html`.

Direction: an unhurried, photographic hospitality concept, with expressive Cormorant typography, olive/cream tones, spacious editorial rhythm, and restrained entrance motion. The imaginary property is not associated with any real photographed location.

Assets:

- `assets/finland.jpg`: Bisajärvi in evening light, Sipoonkorpi, Vantaa, Finland, May 2021. Photographer **Simo Räsänen (Ximonic)**. [Source](https://commons.wikimedia.org/wiki/File:Bisaj%C3%A4rvi_in_evening_light_from_the_southwest_in_Sipoonkorpi,_Vantaa,_Finland,_2021_May.jpg), [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/). Downloaded original and resized/compressed to 1772 × 1200. Attribution and modification notice included in site footer.
- `assets/forest.jpg`: mood photograph downloaded from `https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=85`; used under [Unsplash License](https://unsplash.com/license). No assertion of geographic location.
- Cormorant Garamond regular and Manrope regular downloaded from Google Fonts and converted to WOFF. SIL Open Font License copies included in `assets/OFL-cormorant.txt` and `assets/OFL-manrope.txt`.

## Common Ground / landscape practice

Source: `/workspace/radu-studio/concepts/practice/index.html`.

Direction: approachable, confident local service positioning with sky/slate/chartreuse colors, substantial Manrope typography, a bespoke axonometric garden illustration, and clear service/process explanation. SVG illustration, identity, layout, and concept copy are original.

Assets: Manrope regular and extra-bold from Google Fonts, converted to WOFF, SIL Open Font License copy included in `assets/OFL-manrope.txt`.

## Behavior and accessibility

Both concepts are static, self-contained HTML/CSS with local assets. No external runtime requests, trackers, cookies, third-party scripts, or dependencies. Anchor navigation, skip links, visible keyboard focus, touch-friendly primary actions, responsive layouts, reduced-motion overrides. Common Ground FAQ uses native `details`/`summary`. Contact links open an email draft to Radu with an explicit project subject; they do not claim to send anything automatically.

## Rendered QA results

Tested both concepts in real headless Chromium (system `/usr/bin/chromium`) through Playwright, with the site served on port 8123. Viewports: 320×740, 390×844, 768×1024, 1440×1000, 1920×1080.

- Actual full-page renders in `qa/concepts/{retreat,practice}-{small-mobile,mobile,tablet,desktop,wide}.png`.
- Main-site-ready first viewport images in each concept's `assets/preview.jpg` and `assets/preview.webp`.
- Machine-readable evidence: `qa/concepts/results.json`.
- All 10 final layouts have no horizontal overflow, broken fragment targets, failing image loads, HTTP errors, or browser page errors.
- Reduced motion suppresses all running entrance animations.
- Native Common Ground FAQ tested open by click and close by keyboard Enter.
- Contact targets verified to be real `mailto:team@radu.studio` drafts with relevant subjects. Email transmission itself is handled by the visitor's mail application and was not sent during testing.
- Local resource transfer observed: approximately 912 KB for the photographic retreat; 82 KB for the vector-led landscape practice. These are local browser observations, not a throttled Lighthouse benchmark.

Refinement from rendered inspection: replaced unsupported diagonal-arrow glyphs with supported arrows; corrected an oversized final heading that overflowed at 320 px and re-rendered mobile layouts. Removed an unused Alpine photograph because it did not fit the Finnish concept. Typography and all art assets are hosted locally.


### Final integration adjustments

The main Radu site uses fresh, correctly positioned viewport covers in `assets/{retreat,practice}-preview.webp`, with 600px variants. Case pages also include actual mobile and content-detail captures. Contact buttons on both demos now route to `/start/`, retaining the direct email and copy-to-webmail fallback. The retreat description was narrowed to its actual editorial hospitality scope; no booking engine or reservation flow is implied. Public photo credit appears on the work index, retreat case and demo itself. Original concept-cover exports were moved out of the public build after integration.
