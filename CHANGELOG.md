# Landing page — version log

Each user request is recorded as a version. Tags are pushed to the repo so any
version can be restored by name (e.g. `git checkout v3`).

## v14 — Title de-box, build-tier icons, faster shine, structural cleanup
- Removed the `.boxed` per-line backdrop from every headline
  (hero h1, banner h2, final h2). Body copy keeps its boxed bg.
  Reason: the backdrop was clipping descenders on big text.
- Added three build-tier icons that visually escalate the bot count:
  Light = 1 bot, Mid = 2 bots, Heavy = 3 connected bots.
- Tier rows are now `[icon] [text]` instead of `[name col] [desc col]`.
- `.accordion .num` is now a small white badge with the dark number
  inside (instead of plain dim text).
- Removed:
    • "THE LINEUP" eyebrow over the seven AI Employees.
    • The intro lead paragraph above the tier list.
    • The "HOW IT WORKS" eyebrow — combined into the h2:
      "How it works. Five phases."
- Removed every gray section divider line (between sections + the
  banner's own borders). Sections now blend.
- CTA shine: cycle 5s → 2.5s, sweep 0.9s → 1.5s. Twice as often,
  and the sweep itself is slower.
- Final-CTA section now uses `min-height: 100svh` and bigger
  bottom padding so the dot field truly is the last visual on
  the page (kills the black gap at the bottom).

## v13 — Brighter grays (round 2) + visible icons + stronger shine + black backdrops everywhere
- Bumped every gray ANOTHER ~25% on top of v12:
    --ink-dim:   #c0c0cc → #ececf2
    --ink-faint: #6c6c78 → #a0a0ad
    .hero h1 em: #aaaaaa → #d4d4d4
- Scoreboard icons: size 44→60, stroke 1.6→2.4 (much more visible).
- CTA shine: dark band opacity 0.18→0.55, gradient widened, plus a
  small scale pulse during the sweep so the animation reads even at
  a glance. Sweep duration ~0.9s, then waits ~4.1s.
- Replaced `mix-blend-mode: difference` on every headline with a
  per-line solid-black backdrop. New `.boxed` utility class wraps
  text in spans inside hero h1, hero subtitle, banner eyebrow,
  banner h2, banner p, final h2, final p — every text element that
  sits over a `.dither-bg`. Now the dot pattern is fully blocked
  behind text instead of bleeding through.

## v12 — Brighter grays, hero subtitle blackout, CTA shine
- Bumped every gray text/icon shade by ~25% so the page is readable
  in direct sun on a phone:
    --ink-dim:   #9a9aa3 → #c0c0cc
    --ink-faint: #565660 → #6c6c78
    .hero h1 em: #888888 → #aaaaaa
- Hero subtitle now has a per-line solid-black background
  (`box-decoration-break: clone` + horizontal `box-shadow`) so the
  dot pattern can't bleed through the text.
- Every `.cta` now has a single dark band that sweeps across once
  every 5 seconds (~0.7s sweep, then waits 4.3s). Implemented via
  `background-image` + `background-position` keyframes — no pseudo-
  elements, no `@property`, no `isolation` (kept iOS-safe).

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
