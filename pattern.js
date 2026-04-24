// Alumot brand pattern — shared generator. Works in Node (CommonJS) and the
// browser (attaches to window.AlumotPattern).

(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.AlumotPattern = factory();
}(typeof self !== 'undefined' ? self : this, function () {

  const VARIANTS = {
    'light':      { bg: '#FAF8F4', fg: '#7A5BA6' },
    'dark':       { bg: '#140E23', fg: '#B89DD9' },
    'mono-light': { bg: '#FFFFFF', fg: '#1F1830' },
    'mono-dark':  { bg: '#000000', fg: '#FFFFFF' },
  };

  const SIZES   = [1, 2, 4, 8];
  const WEIGHTS = [0.30, 0.25, 0.30, 0.15];

  // mulberry32 — small, fast, well-distributed seeded RNG.
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function makeRng(seed) {
    const r = (seed === undefined || seed === null) ? Math.random : mulberry32(seed);
    return {
      float: (lo, hi) => lo + r() * (hi - lo),
      // inclusive on both ends
      int: (lo, hi) => lo + Math.floor(r() * (hi - lo + 1)),
    };
  }

  function weightedPick(items, weights, rng) {
    const r = rng.float(0, 1);
    let c = 0;
    for (let i = 0; i < items.length; i++) {
      c += weights[i];
      if (r < c) return items[i];
    }
    return items[items.length - 1];
  }

  // Produces the array of visible dash rectangles for the given canvas.
  function generateDashes(opts) {
    const { width, height, U } = opts;
    const seed = opts.seed;
    const dashHeight = U;
    const rowPitch = 2 * U;
    const gap = U;

    const rowCount = Math.floor(height / rowPitch);
    const firstRowY = (height - (rowCount - 1) * rowPitch) / 2;

    const rng = makeRng(seed);
    const dashes = [];

    for (let row = 0; row < rowCount; row++) {
      const y = firstRowY + row * rowPitch;
      let cursorX = -rng.int(0, 5) * U;

      while (cursorX < width) {
        const sizeUnits = weightedPick(SIZES, WEIGHTS, rng);
        const dashWidth = sizeUnits * U;

        const drawStart = Math.max(cursorX, 0);
        const drawEnd   = Math.min(cursorX + dashWidth, width);
        const visibleW  = drawEnd - drawStart;

        if (visibleW > 0) {
          dashes.push({
            x: drawStart,
            y: y - dashHeight / 2,
            w: visibleW,
            h: dashHeight,
          });
        }

        cursorX += dashWidth + gap;
      }
    }

    return dashes;
  }

  function toSvg(opts) {
    const { width, height, U, bg, fg, dashes } = opts;
    const r = U / 2;
    const rects = dashes.map(function (d) {
      return '<rect x="' + d.x + '" y="' + d.y +
             '" width="' + d.w + '" height="' + d.h +
             '" rx="' + r + '" ry="' + r + '"/>';
    }).join('');
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height +
      '" viewBox="0 0 ' + width + ' ' + height + '">' +
      '<rect width="' + width + '" height="' + height + '" fill="' + bg + '"/>' +
      '<clipPath id="alumot-clip"><rect width="' + width + '" height="' + height + '"/></clipPath>' +
      '<g clip-path="url(#alumot-clip)" fill="' + fg + '">' + rects + '</g>' +
      '</svg>'
    );
  }

  // Canvas renderer. `ctx` is a CanvasRenderingContext2D.
  function drawCanvas(ctx, opts) {
    const { width, height, U, bg, fg, dashes } = opts;
    const r = U / 2;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = fg;
    for (let i = 0; i < dashes.length; i++) {
      const d = dashes[i];
      roundRect(ctx, d.x, d.y, d.w, d.h, r);
      ctx.fill();
    }
  }

  function roundRect(ctx, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.lineTo(x + w - rr, y);
    ctx.arcTo(x + w, y, x + w, y + rr, rr);
    ctx.lineTo(x + w, y + h - rr);
    ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr);
    ctx.lineTo(x + rr, y + h);
    ctx.arcTo(x, y + h, x, y + h - rr, rr);
    ctx.lineTo(x, y + rr);
    ctx.arcTo(x, y, x + rr, y, rr);
    ctx.closePath();
  }

  return { VARIANTS, SIZES, WEIGHTS, makeRng, weightedPick, generateDashes, toSvg, drawCanvas };
}));
