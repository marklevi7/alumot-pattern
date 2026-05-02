# Landing page — version log

Each user request is recorded as a version. Tags are pushed to the repo so any
version can be restored by name (e.g. `git checkout v3`).

## v54 — Wordmark left-edge aligned with hero content  ★ PINNED — known-good baseline
- Wrapped the wordmark in a `.wordmark-frame` that mirrors `.wrap`
  (`max-width: 1080px; margin: 0 auto; padding: 0 24px;`).
- Result: the wordmark's left edge now sits on the same vertical
  axis as the hero headline, subtitle, and CTA on every viewport
  — including wide desktop where `.wrap` centres at 1080 px.
- Previously the wordmark was at a fixed `left: 24px` from the
  viewport, so on wide screens it drifted left of the content.

## v53 — Wordmark sized to match body text
- `.wordmark` font-size 13 → 17 px (desktop) and 11 → 16 px (mobile).
  Now reads at body-text scale instead of the small-label scale it
  previously shared with eyebrows.
- Everything else on the wordmark unchanged (still Inter, uppercase,
  weight 600, 0.18em tracking, mix-blend-mode: difference).

## v52 — Seven AI Employees: choreographed entrance sequence
On scroll into view, the accordion now plays a clean sequence:
1. Badges pop in top → bottom over ~1 second (`accordion-num-pop`
   keyframes, staggered `0.00s`–`0.66s`).
2. Then the scramble cascade runs once (outside-in mirror cadence,
   ~2.5 s).
3. Then a 3-second pause.
4. Scramble cascade again. Pause 3 s. Loop indefinitely.

JS dropped the per-group internal `LOOP_MS` recursion in favour of a
single global `loopCycle` that runs one cascade, waits 2.5 s + 3 s, and
recurses.

## v51 — Seven AI Employees: digit scrambler defers until in view
- The badge digit-scrambler used to fire as soon as the page loaded,
  so by the time you scrolled to the accordion, the staggered cascade
  was already running mid-cycle.
- Now wrapped in an `IntersectionObserver` that triggers the cascade
  only when the accordion section first enters the viewport (≥5%
  visible). The outside-in mirror cadence (1+7 → 2+6 → 3+5 → 4) plays
  cleanly from the start the first time you see it.

## v50 — AI-node centre: octahedron +25% larger
- Bumped `SHAPE_R` from `0.18` → `0.225` (~+25% radius). Octahedron
  now reads more dominant against the satellite ring without changing
  anything else in the scene.

## v49 — AI-node centre: opaque lit octahedron
- Replaced the wireframe octahedron with a **solid, opaque, classically
  lit** one. Same shape, but now ray-marched against an octahedron SDF
  and shaded per face.
- Lighting: ambient base + key (upper-front) diffuse + fill diffuse +
  Phong specular highlight + a touch of rim. Three-point-ish, all
  scalar (no colour) — gets fed straight into the dither so highlights
  = dense dots, shadows = sparse dots, gives the classic chiaroscuro
  3D look through Bayer.
- Flat shading via face-octant trick: octahedron faces are axis-
  aligned in object space, so `sign(p_obj) / √3` is the face normal.
- Same 2-axis tumble as v48; satellites, lines, data trails unchanged.

## v48 — AI-node centre: rotating wireframe octahedron
- Replaced the v47 solid centre disc + sonar rings with a procedural
  rotating **wireframe octahedron** drawn directly in the fragment
  shader.
- Six vertices, two-axis rotation driven by `uTime`, mild perspective,
  12 edges drawn via per-pixel distance to each line segment.
- A tiny anchor dot sits at the exact centre so the eye still locks on
  while the wireframe tumbles.
- Goes through the same Bayer + maskCircle pipeline — visually
  cohesive with everything else on the page.
- Satellites, lines, and data trails unchanged from v47.

## v47 — AI-node loader: bigger centre, sonar, dot trails
- Centre disc roughly **doubled in radius** (0.075 → 0.140) so it
  dominates the composition instead of competing with the satellites.
- Added **sonar rings** broadcasting out from the centre — three
  expanding rings on staggered phases, fading as they grow. Gives
  the centre real "presence" without resorting to a 3D model.
- Satellite ring pushed out (0.30 → 0.40) to make room for the
  fatter centre.
- Connecting lines made brighter (0.18 → 0.30 baseline).
- Travelling dots are now **3-dot comet trails** instead of single
  dots — head bright, tail fading. Direction still alternates per
  satellite so both inflow and outflow read.

## v46 — AI-employee node loader at the bottom of "What it is"
- Same dither-strip treatment as the manifesto wave-floor, applied
  to the bottom of the WHAT IT IS section.
- Inside the strip: a centred procedural loader — bright central
  processing node + a ring of 6 satellites + faint connecting lines
  + travelling data dots that alternate direction (some inbound to
  the centre, some outbound) so the scene reads as an AI agent
  pulling and pushing data across multiple sources.
- Same Bayer-8 + maskCircle dot recipe as every other dither block.
- Aspect-corrected so the ring stays a true circle on any viewport.
- Render loop pauses when the strip scrolls off-screen.

## v45 — Wave: re-centred + ~1.35× faster
- Wave's rest-Y moved back to the vertical centre of its strip
  (`0.83` → `0.50`).
- Time coefficients on the three sine harmonics bumped ~1.35× —
  `1.4 → 1.9`, `0.9 → 1.2`, `2.1 → 2.8` — so the wave drifts noticeably
  quicker right→left.

## v44 — Wave-dither moved into the manifesto block (as a "floor")
- Removed the standalone `<section class="wave-dither">` from the
  top of the page.
- Re-housed the wave canvas as the bottom of the **manifesto**
  block — now reads as the visual "floor" under the manifesto copy.
- Manifesto bottom padding zeroed out and `.manifesto-text` margin
  set to `0`, so the text bottom sits directly above the strip.
- Wave's rest-Y shifted from the centre of its canvas (`0.50`) to
  near the top (`0.83`) and amplitudes reduced (`.10/.04/.02`) so
  the visible wave sits just under the text — letters almost
  touching the wave.

## v43 — Top of page: wave-dither strip
- Replaced the goose-photo block with an animated **wave-dither strip**.
  ~1/3 of the viewport tall, full width, black background.
- Wave shape is a stack of three sines computed in the fragment
  shader (no image, no fbm). `+uTime` in the sine phase drifts the
  pattern from **right to left**.
- Same dot recipe as the rest of the site — Bayer-8 threshold +
  `maskCircle`, so the visible dot density matches the hero / banner
  / final blocks exactly.
- Tick paused when the strip scrolls off-screen
  (`IntersectionObserver`) to spare battery.

## v42 — Photo dither: orientation fix + finer dots
- The image was rendering upside-down. Three.js TextureLoader sets
  `flipY = true` by default, which already orients the image
  correctly when sampling with our bottom-origin `gl_FragCoord`.
  Removed the manual `uv.y = 1.0 - uv.y` flip that was adding a
  second flip on top of that.
- Cell size dropped 5 → 3, making the photo's dots noticeably finer
  and bringing them in line visually with the rest of the page's
  dither blocks.

## v41 — Photo Bayer-dither block at top of page (experimental)
- Added a new `<section class="photo-dither">` at the very top of
  the page (above the hero) that renders a remote image through a
  Bayer-8 dither shader — same monochrome look as the rest of the
  site, but driven by image luminance instead of fbm noise.
- Image cover-fits the section, white dot output on the page-bg
  black. Renders once on load + on resize, no animation tick.
- Configurable via data attributes on `#photo_dither_canvas`:
  `data-image-url`, `data-pixel-size`, `data-ink`. Currently set
  to a placeholder Wikimedia goose image; swap the URL to test
  any photo.
- Self-contained: separate WebGL2 module, three.js loaded from
  its existing CDN (cached). Removing the section's HTML drops
  the block cleanly — no other changes needed.

## v40 — Manifesto rolled back to plain big-title text
- Threw out the v36/v37 integrated-noise-grid manifesto entirely.
- Replaced with a plain `.manifesto-text` paragraph in Inter, sized
  `clamp(28px, 4vw, 40px)` — bigger than the v25 baseline so it
  reads as a "big title" paragraph rather than body copy.
- Removed the `.manifesto-grid` CSS, the integrated-grid JS at the
  bottom of the file, and the now-unused `IBM Plex Mono` + `VT323`
  Google Fonts query string. Only Inter remains.
- Hero, scoreboard, accordion, build tiers, mid banner, phases,
  why-now, why-us, final CTA, and the snowball loader are all
  untouched.

## v39 — Mid banner: case-study moment + much taller block  ★ PINNED — last full state with the noise-grid manifesto direction
- Threw out the previous "Show us / book a call" framing entirely.
  New approach: pull a real case-study number to the front so the
  banner becomes a **proof moment**, not a generic CTA.
    H2: "$2,500 → $500 a month."
    Sub: "Content cost at a medical news outlet, with one AI
         Employee. Live in production. Want the same math for your
         highest-cost workflow?"
  CFOs read dollars first. Putting one of the page's real proof
  points (previously buried in the accordion) into the mid-banner
  doubles its job — proof + conversion in one block.
- Banner padding: desktop 120 → 180px, mobile 90 → 130px.
- Reverted the in-progress `.manifesto-grid` CSS change (twinkle
  effect was paused mid-implementation). Manifesto returns to its
  v37 state — text + dim grey filler, no blackout. Twinkle work
  to resume in a future version.

## v38 — Mid CTA banner: copy rewrite + taller block
- Copy rewrite. The mid-banner now flips the framing: instead of
  asking the visitor a question, it tells them what to bring.
    H2: "Which one replaces the most expensive workflow in your
         company?" → "Show us your most expensive workflow."
    Sub: "30-minute call. No deck. No pitch. Just the math and your
         highest-cost workflow."
       → "30 minutes. We come back with a written scope, fixed price,
         fixed timeline."
  The new sub names four concrete deliverables (written / scope /
  fixed price / fixed timeline) so the call commitment is unambiguous.
- Banner padding bumped ~25%: desktop 96 → 120px, mobile 72 → 90px.

## v37 — Manifesto: bigger grid + sentence-aware paragraphing
- Bumped `.manifesto-grid` font-size from `clamp(22px, 4vw, 34px)`
  to `clamp(30px, 5.5vw, 48px)`. Mobile bumped from 20→28px.
  Section min-height bumped on mobile (70 → 80vh) to keep the grid
  generous.
- Restructured the body copy into 4 explicit paragraphs (full
  thought, list, contrast, punchline). Word-wrap stays inside each
  paragraph; one blank "noise-only" row sits between paragraphs.
  Result: line breaks now land at meaningful sentence pauses
  instead of mid-thought.
- `START_ROW` lowered 4 → 3 so the larger text still fits.

## v36 — Manifesto: integrated single-layer character grid
- The manifesto block is now a **single layer** of monospace
  characters. Most cells are dim-grey binary filler (`01`); the
  cells that carry the actual manifesto text are wrapped in
  `<span class="t">` and rendered bright white. Same font, same
  size, same grid — only the colour distinguishes "noise" from
  "text".
- Text starts at row 4 from the top, padded a few characters in
  from each side, and word-wraps cleanly (words never split mid-
  word).
- Character size bumped (`clamp(22px, 4vw, 34px)`) so the grid
  reads as deliberate ASCII art rather than tiny noise.
- Filler cells flip ~1.2% per tick every 0.9s for a subtle
  data-feed feel; text cells are never touched.
- Removed the previous two-layer setup (`.manifesto-noise` +
  `.manifesto-text` overlay) and the scramble script. Honors
  `prefers-reduced-motion` (no cell flips).

## v35 — Manifesto: pixel-mono noise field behind the text  ★ PINNED — last known-good baseline before v36
- Switched the manifesto typeface to **VT323** — pixel-style
  monospace, retro-terminal vibe.
- Added a full-block noise grid (`.manifesto-noise`) of binary
  `01` characters in `--ink-faint` at 55% opacity. The grid is
  recomputed on resize and a small percentage of cells flip
  every ~0.9s for a subtle "live data" feel.
- The manifesto text sits over the noise wrapped in a
  `.text-cutout` span with a solid `--bg-0` per-line backdrop —
  the bright copy carves itself out of the noise field.
- Existing scramble-reveal still fires on viewport entry, now
  scrambling the cutout span so the bg follows the resolving
  glyphs.
- Honors `prefers-reduced-motion`: noise stays static, no flips.

## v34 — Wordmark: dot separator removed
- Wordmark now reads "Mark Levi Consulting" — single phrase, no
  middle-dot between "Levi" and "Consulting". Removed the
  `.wordmark .dot` CSS rule too since nothing else uses it.

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
