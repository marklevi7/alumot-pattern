# Landing page — version log

Each user request is recorded as a version. Tags are pushed to the repo so any
version can be restored by name (e.g. `git checkout v3`).

## v33 — Accordion badges: digit scrambler (creative iteration #1)
- Replaced the rotating square with a **digit scrambler**: each badge
  cycles its number text through random 2-digit values for ~0.7s,
  then locks back to its true number.
- Same outside-in mirror grouping as v32: 1+7 scramble together, then
  2+6, then 3+5, then 4 alone, on a perpetual 5s loop.
- Visual tie-in with the manifesto's scramble effect — establishes a
  consistent "decryption" motif across the page.
- JS-driven (CSS can't randomize text content). Skipped automatically
  for users with `prefers-reduced-motion: reduce`.

## v32 — Accordion badges: counter-rotated number + outside-in mirror grouping
- Each badge spins clockwise; an inner `.num-text` span counter-spins
  at the same rate so the **number stays upright** while the square
  rotates underneath it.
- New grouping: outside-in mirror.
    - Items 1 and 7 start together at delay 0s
    - Items 2 and 6 at 0.5s
    - Items 3 and 5 at 1.0s
    - Item 4 at 1.5s
- The seven items are visually paired by symmetry — wave cascades
  inward from the ends to the centre rather than marching down the
  list. Duration tightened to 4.5s.

## v31 — Accordion number badges: cascading spin
- Each `.num` badge now spins 360° clockwise around its own centre.
- Per-position `animation-delay` (0s, 0.7s, 1.4s, …, 4.2s) over a
  4.9s duration creates a perpetual wave of rotation rolling down
  the seven AI Employees.
- `prefers-reduced-motion: reduce` disables the animation entirely.

## v30 — Manifesto: IBM Plex Mono + larger size
- Switched the manifesto typeface from Space Mono to **IBM Plex
  Mono** — corporate-tech feel, fits the enterprise sales context
  better than Space Mono's retro vibe.
- Bumped font-size from `clamp(16px, 2.4vw, 22px)` to
  `clamp(20px, 2.9vw, 26px)` for legibility.
- Tightened `max-width` from 56ch → 50ch to balance the larger
  type.
- Scramble JS untouched — works on any monospace.

## v29 — Manifesto: Space Mono + scramble-reveal animation
- Switched the manifesto block to **Space Mono** (Google Fonts).
  Distinctive tech-flavoured monospace; pairs well with the dot field
  and gives the block its own typographic voice.
- Added a JS scramble-reveal animation: when the manifesto scrolls
  into view (≥30% visible), each letter cycles through ASCII noise
  (`!@#$%&*<>[]/\|=+-?` plus hex chars) and locks in left-to-right
  with light random scatter. Total run: 2.4s (under the 3s budget).
- Spaces and punctuation never scramble — keeps line shape stable.
  Monospace + 1:1 char swap = zero layout reflow during the run.
- Animation runs **once** per page-load. No re-trigger on subsequent
  scrolls.

## v28 — Unified left alignment across every section
- Removed the 24px horizontal padding from `.hero`, `.manifesto`,
  `.banner`, and `.final`. Generic sections (scoreboard, what-it-is,
  accordion, build-tiers, phases, why-now, why-us) already had no
  horizontal padding.
- Result: every section's content now starts at exactly **24px**
  from the viewport edge — driven by `.wrap`'s padding alone. No
  more "double padding" mismatch where named-class sections sat
  48px in while generic sections sat 24px in.
- Same adjustment applied to the mobile media block.

## v27 — Hero subtitle: "real" → "existing"
- Swapped "real" for "existing" in the hero subtitle. New line:
  **"Custom-built AI Employees deployed inside your existing systems."**
- Rationale: "existing systems" is the term CIOs and IT buyers
  actually use; it also signals "no rip-and-replace" — a real
  concern at $100k engagements. Trades a bit of punch for a more
  enterprise-respectful tone that pairs well with the bold headline.

## v26 — Hero subtitle refinement (enterprise tone)
- Replaced the v25 subtitle ("AI Employees that replace human work,
  end-to-end. 80% cheaper. Live in 30 days.") with a tighter,
  enterprise-pitched line:
  **"Custom-built AI Employees deployed inside your real systems."**
- Rationale: actual builds run $10k–$100k+ delivered by teams of
  senior operators. The previous "80% cheaper / 30 days" line
  skewed consumer-pitch; "custom-built" + "real systems" signals
  bespoke delivery and stack integration without softening the
  hook. Manifesto block and rest of page unchanged.

## v25 — Hero subtitle swap + new manifesto block
- Hero subtitle replaced with a punchy outcome line:
  "AI Employees that replace human work, end-to-end. 80% cheaper.
  Live in 30 days."
- New `.manifesto` section sits between the hero and the scoreboard.
  Carries the original long copy ("Every month you sign off on
  salaries...") at h3 size, plain dark bg, no dot pattern, no
  eyebrow — pure editorial breath between the dot-heavy hero and
  the data-heavy scoreboard.
- Re-uses the existing `clamp(22px, 3vw, 28px)` h3 size, plus
  `var(--bg-0)` and `var(--ink)` palette tokens. No new sizes
  introduced.

## v24 — Snowball: below text + sharp pure B&W
- Snowball moved from `top: 62%` (which overlapped the text) to
  `bottom: 7%` so it sits clearly below the copy with no overlap.
- Killed every soft shadow on the loader (inner shadow, outer drop
  shadow, side shadows are all `display: none`).
- Both rings are now plain `1.5px solid #ffffff` outlines instead of
  multi-layer box-shadow bevels.
- Ball is pure `#ffffff`. Texture scanlines are pure `#000` (was
  ~18% alpha) so the rolling effect reads as hard black-on-white.
- Net effect: only pure black + pure white on screen, no greys, no
  glows.

## v23 — Scoreboard cleanup
- "LOADED MONTHLY COST" → "Monthly cost" in both columns.
- Junior vs AI column headings are now identical: same color (--ink),
  same size, same weight, no uppercase. Reused the accordion-title
  clamp `clamp(18px, 2.2vw, 22px)` so the size matches an existing
  scale on the page rather than introducing a new one.
- Both icons (junior + AI) now share `color: var(--ink)` — identical
  brightness; the previous "winning column = brighter" treatment is
  gone.

## v22 — Snowball moved into the WHY NOW block
- Removed the standalone snowball section above the hero.
- Snowball now sits inside the WHY NOW section, absolutely positioned
  behind the text (z-index 1) and slightly below the text vertically
  (top 62%, centered horizontally).
- WHY NOW section gets `min-height: 95vh` so there's room for the
  ball without crowding the copy.
- All `.pl*` selectors rescoped under `.snowball-loader` so the ball
  is fully contained within the section it lives in.

## v21 — Snowball preview block (above the hero)
- New experimental section above the hero with a pure-CSS rolling-ball
  loader, reskinned to a black + minimal-digital aesthetic (no snow
  texture image — replaced with a CSS scanline pattern).
- All selectors are scoped under `.snowball-block` so they can't bleed
  into the rest of the page. Drop the section to remove the loader.
- Source: jkantner / CodePen wvXbboe (loader pattern only; styling
  reworked from scratch for the dark / digital theme).

## v20 — Tier icons round 2 (PINNED — last known-good baseline before v21)
- Light: jump now follows physics — fast lift-off, brief apex hang,
  accelerating fall, small landing squash, recovery, idle. Implemented
  via SMIL `calcMode="spline"` + per-segment `keySplines`.
- Mid: each bot's head rect is now `fill="#000"` so the front bot
  cleanly covers the back one mid-swap (no more line-through-line).
- Heavy: redesigned to four bots in a square arrangement with the
  flowing-dash lines forming the perimeter AND an X across the
  middle (6 lines total). Bot heads filled black so the lines tuck
  cleanly behind them.

## v19 — Animated tier icons
- Light: the single bot bobs up and down in place (1.2s loop).
- Mid: the two bots arc-jump and swap places — left arcs over the
  top, right arcs under the bottom, then they swap back (3s loop).
- Heavy: each of the three bots pulses opacity in turn (top → left →
  right) and the two connection lines run a dashed flow, suggesting
  active data exchange across a department.
- All three SVGs share the same 64×64 viewBox and 56px render size.
  No element ever leaves its canvas.
- SMIL animations in pure SVG — no extra JS, no CSS changes.

## v18 — Removed "WHAT IT IS" eyebrow above the "What an AI Employee actually is" section.

## v17 — Removed "THE MATH" eyebrow above the scoreboard.

## v16 — Left-edge alignment + no more button "breathing"
- `.boxed` and `.boxed--body` no longer extend the bg leftward via
  box-shadow. Padding is now right-only so the bg's left edge sits
  exactly at the same X as the title and the button. Text bg, title
  text, and button left edge all line up across hero / banner / final.
- Removed the `transform: scale()` pulse from the CTA shine. The
  shine still sweeps every 2.5s but the button no longer changes size.

## v15 — Removed "Your move" eyebrow from the mid banner.

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
