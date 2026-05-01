# Landing page — version log

Each user request is recorded as a version. Tags are pushed to the repo so any
version can be restored by name (e.g. `git checkout v3`).

## v6 — Running outline on every CTA
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
