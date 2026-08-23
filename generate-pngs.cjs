/**
 * Generate PNG versions of Deka logo SVGs for external branding use.
 * Outputs to the PNG/ directory at multiple standard sizes.
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SVG_DIR = path.join(__dirname, 'SVG');
const PNG_DIR = path.join(__dirname, 'PNG');

// Standard branding export sizes
const SIZES = [64, 128, 256, 512, 1024];

const SVG_FILES = [
  'logo.svg',
  'logo-full-dark.svg',
  'logo-full-light.svg',
];

async function generatePNGs() {
  // Ensure PNG directory exists
  if (!fs.existsSync(PNG_DIR)) {
    fs.mkdirSync(PNG_DIR, { recursive: true });
  }

  for (const svgFile of SVG_FILES) {
    const svgPath = path.join(SVG_DIR, svgFile);
    if (!fs.existsSync(svgPath)) {
      console.warn(`⚠ Skipping missing file: ${svgFile}`);
      continue;
    }

    const baseName = path.basename(svgFile, '.svg');

    for (const size of SIZES) {
      const outputName = `${baseName}-${size}x${size}.png`;
      const outputPath = path.join(PNG_DIR, outputName);

      try {
        await sharp(svgPath)
          .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .png()
          .toFile(outputPath);
        console.log(`✓ ${outputName}`);
      } catch (err) {
        console.error(`✗ ${outputName}: ${err.message}`);
      }
    }
  }

  console.log('\nDone! PNG files generated in:', PNG_DIR);
}

generatePNGs();
