#!/usr/bin/env node
// Alumot pattern CLI.
//
// Usage:
//   node generate.js [--width=1600] [--height=900] [--u=10]
//                    [--variant=light|dark|mono-light|mono-dark]
//                    [--seed=42] [--out=pattern.svg]

const fs = require('fs');
const path = require('path');
const { VARIANTS, generateDashes, toSvg } = require('./pattern.js');

function parseArgs(argv) {
  const out = {};
  for (const a of argv) {
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const width   = +(args.width  ?? 1600);
const height  = +(args.height ?? 900);
const U       = +(args.u      ?? 10);
const variant = args.variant ?? 'light';
const seed    = args.seed !== undefined ? +args.seed : undefined;
const outPath = args.out ?? 'pattern.svg';

const v = VARIANTS[variant];
if (!v) {
  console.error('unknown variant: ' + variant + ' (expected: ' + Object.keys(VARIANTS).join(', ') + ')');
  process.exit(1);
}

const dashes = generateDashes({ width, height, U, seed });
const svg = toSvg({ width, height, U, bg: v.bg, fg: v.fg, dashes });

fs.writeFileSync(path.resolve(outPath), svg);
console.log('wrote ' + outPath + ' — ' + width + 'x' + height + ', U=' + U +
            ', variant=' + variant +
            (seed !== undefined ? ', seed=' + seed : '') +
            ', ' + dashes.length + ' dashes');
