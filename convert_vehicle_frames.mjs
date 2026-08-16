/**
 * convert_vehicle_frames.mjs
 * Converts the 5x upscaled 360 vehicle PNGs to 1920x1080 WebP (quality 85)
 * for use in the AVERERA cinematic intro frame sequence.
 *
 * Output: public/assets/vehicle_360_webp/frame_NNN.webp
 */

import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const INPUT_DIR = join(__dirname, 'src/AVERERA-CINEMATIC-ASSETS/upscayl 360 main video/upscayl_png_upscayl-standard-4x_5x');
const OUTPUT_DIR = join(__dirname, 'public/assets/vehicle_360_webp');

const WIDTH = 1920;
const HEIGHT = 1080;
const QUALITY = 85;
const CONCURRENCY = 6; // Process 6 at a time

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Created output directory: ${OUTPUT_DIR}`);
}

const files = readdirSync(INPUT_DIR)
  .filter(f => f.endsWith('.png'))
  .sort();

console.log(`Found ${files.length} PNG frames to convert.`);
console.log(`Output: ${WIDTH}x${HEIGHT} WebP, quality ${QUALITY}`);
console.log(`Concurrency: ${CONCURRENCY}`);
console.log('---');

let completed = 0;
let failed = 0;

async function convertFile(file, index) {
  const inputPath = join(INPUT_DIR, file);
  // Rename to sequential frame_NNN.webp (starting from 001)
  const frameNum = String(index + 1).padStart(3, '0');
  const outputFileName = `frame_${frameNum}.webp`;
  const outputPath = join(OUTPUT_DIR, outputFileName);

  // Skip if already converted
  if (existsSync(outputPath)) {
    completed++;
    if (completed % 10 === 0) {
      process.stdout.write(`\rSkipped (already exists): ${completed}/${files.length}`);
    }
    return;
  }

  try {
    await sharp(inputPath)
      .resize(WIDTH, HEIGHT, {
        fit: 'contain',       // contain preserves aspect ratio with letterbox
        background: { r: 0, g: 0, b: 0, alpha: 1 }, // black letterbox background
        kernel: sharp.kernel.lanczos3,
      })
      .webp({ quality: QUALITY, effort: 4 })
      .toFile(outputPath);

    completed++;
    process.stdout.write(`\rConverted: ${completed}/${files.length} (${outputFileName})`);
  } catch (err) {
    failed++;
    console.error(`\nERROR converting ${file}: ${err.message}`);
  }
}

// Process in batches of CONCURRENCY
async function processAll() {
  const startTime = Date.now();

  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map((file, batchIdx) => convertFile(file, i + batchIdx)));
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n---`);
  console.log(`Done! ${completed} converted, ${failed} failed. (${elapsed}s)`);
  console.log(`Output directory: ${OUTPUT_DIR}`);

  // Print first and last frame info
  const outputFiles = readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.webp')).sort();
  if (outputFiles.length > 0) {
    console.log(`Total WebP frames in output: ${outputFiles.length}`);
    console.log(`First frame: ${outputFiles[0]}`);
    console.log(`Last frame: ${outputFiles[outputFiles.length - 1]}`);
  }
}

processAll().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
