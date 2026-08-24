/**
 * build-og.mjs
 * ---------------------------------------------------------------
 * Rasterises scripts/og-card.html to public/logos/og-image.png at
 * 1200x630. Facebook, LinkedIn, Slack and X all reject SVG for
 * og:image, so the share card has to ship as a PNG.
 *
 *   npm run build:og
 *
 * Renders the card straight off disk with the system Chrome or Edge in
 * headless mode — no server and no image dependency. The card therefore
 * references the logo by relative path, not by site URL.
 */

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { pathToFileURL, fileURLToPath } from 'node:url'

const PROJECT_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const CARD = path.join(PROJECT_ROOT, 'scripts/og-card.html')
const OUTPUT = path.join(PROJECT_ROOT, 'public/logos/og-image.png')
const WIDTH = 1200
const HEIGHT = 630

const BROWSERS = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
]

const browser = BROWSERS.find((p) => fs.existsSync(p))
if (!browser) {
  console.error('No Chrome or Edge found. Install one, or add its path to BROWSERS in this script.')
  process.exit(1)
}

fs.rmSync(OUTPUT, { force: true })

execFileSync(
  browser,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${WIDTH},${HEIGHT}`,
    // Long enough for the Google Fonts request to land before capture.
    '--virtual-time-budget=8000',
    `--screenshot=${OUTPUT}`,
    pathToFileURL(CARD).href,
  ],
  { stdio: 'ignore' }
)

if (!fs.existsSync(OUTPUT)) {
  console.error('Render produced no file.')
  process.exit(1)
}

const { size } = fs.statSync(OUTPUT)
console.log(`Wrote public/logos/og-image.png — ${WIDTH}x${HEIGHT}, ${(size / 1024).toFixed(0)} kB`)
