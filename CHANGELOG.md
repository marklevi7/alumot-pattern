# Landing page — version log

Each user request is recorded as a version. Tags are pushed to the repo so any
version can be restored by name (e.g. `git checkout v3`).

## v11 — Matched line icons on the Junior / AI scoreboard
- Added two hand-drawn SVG line icons above each column heading.
  Both share the same stroke width (1.6), the same shoulder curve,
  and head height. Junior = circle head; AI = rounded-square head
  with antenna and two eye dots.
- Icon color follows the column: dim for Junior, bright for AI.

## v10 — Slight button rounding (5px) + bigger dots
- `.cta` border-radius: 0 → 5px (subtle round, matches the v6 spec).
- DITHER_CONFIG.pixelSize is now in CSS pixels (4 by default).
  JS multiplies by device pixel ratio internally so dots are the
  same visual size on retina iPhones and non-retina screens. Bumped
  from a raw value of 6 (≈2 CSS px on retina, looked tiny) to a
  CSS-pixel value of 4 (≈12 device px on retina, clearly visible).

## v9 — Hard rollback to v5 + minimal test page
- The v8 rollback didn't fix the white screen on iOS. Did a clean
  `git checkout v5 -- landing.html` to restore the exact v5 state.
- Added `test.html`, a minimal dark page with one button. If THIS
  page also shows white, it's a CDN/cache issue, not the code.

## v8 — Rollback the running-outline button (broke iOS rendering)
- The `@property --cta-angle` + `conic-gradient` + `isolation: isolate`
  + `z-index: -1` combo caused iOS Safari to render the entire page
  as a white screen. Reverted to the v5 button style: solid white
  fill, simple 1px border. Kept the 5px corner radius from v6.
- Will redo the running outline with a different technique that
  doesn't rely on those layering rules.

## v7 — Versioning + auto-deploy to GitHub Pages
- Added CHANGELOG.md and tagged v1..v6 retroactively.
- Added a Pages workflow (currently failing — investigating).

## v6 — Running outline on every CTA (REVERTED in v8)
- Animated conic-gradient glow sweeping around each "Book a call" button.
- Corner radius set to 5px (not the heavy round of the source pen).
- Hover: button fill flips to page bg, glow intensifies.

## v5 — Final CTA section: taller, dots flow upward, denser at bottom; wordmark added
- Final CTA section ~1.5x taller (min-height 95vh).
- Removed the credit / version stamp that used to sit below the CTA.
- New shader uniforms: `flowY` (upward drift) and `gradientY` (bottom-heavy density).
  - Final preset uses `flowY: 0.04`, `gradientY: 0.55`.
  - Hero and banner are at `0` so they look unchanged.
- Added "MARK LEVI · CONSULTING" wordmark anchored top-left of the hero.

## v4 — Dot pattern runs in hero, mid-banner, final CTA
- Single `DITHER_CONFIG` object drives all three instances; tweak once → updates
  everywhere in lock-step.
- Per-section overrides via `DITHER_CONFIG.presets`: `density`, `autoRippleMs`.
- Banner and final run more aggressive (density 0.45, ripple every 3.5s); hero
  stays subtle (density 0.0, ripple every 5s).

## v3 — Hero shader visibility fixes + auto-ripple
- Replaced the importmap with a direct ESM import (failed silently on iOS).
- Removed the `z-index: 1` on `.wrap` that trapped `mix-blend-mode: difference`
  on the headline.
- Auto-ripple every 5 s + two opening ripples right after load so motion is
  visible immediately.

## v2 — Bayer-dither circles in the hero
- Cloned the moving dot field from the Codrops Bayer dithering demo
  (Seva Dolgopolov) using three.js + GLSL3.
- Tap anywhere in the hero → ripple at that spot.
- Auto-pause when the hero scrolls off-screen.

## v1 — Initial dark, minimal landing page
- All copy from v2.3 of the offer, pricing removed.
- Mobile-first, deep-dark monochrome.
- Three "Book a call" CTAs (hero, mid-banner, final).
- Junior vs AI scoreboard (side-by-side blocks).
- 7 AI Employees as accordion (closed by default, no emojis, numbered).
- 5 phases as a numbered list.
- No top header, no footer contact info.

---

## How to roll back

Tell me a version (e.g. "go back to v3") and I will restore that exact state.
