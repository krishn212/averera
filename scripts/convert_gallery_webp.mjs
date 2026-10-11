import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const galleryDir = path.resolve('public/assets/gallery');
const upscaledDir = path.resolve('public/assets/gallery/upscayl_png_upscayl-standard-4x_4x');

async function convertFile(inputPath, outputPath, quality = 85) {
  try {
    await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);
    const inSize = (fs.statSync(inputPath).size / (1024 * 1024)).toFixed(2);
    const outSize = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
    console.log(`Converted: ${path.basename(inputPath)} (${inSize} MB) -> ${path.basename(outputPath)} (${outSize} MB)`);
  } catch (err) {
    console.error(`Failed ${inputPath}:`, err.message);
  }
}

async function run() {
  console.log('--- Converting Gallery Thumbnails to WebP ---');
  const thumbs = [
    'rastrapti_bhawan.jpg',
    '945304_b610bac1f4fb4cfd8be88e43edac055e~mv2.jpg',
    '945304_f61f4de4e2cd43deb5dd01119a578a6f~mv2.jpg',
    '945304_59d8fa4cc53340969eec6e80fb04e374~mv2.avif',
    'Indian Racing Team at Mandalika Circuit.png',
    '945304_a9959891efcc470fa740e64adbfffa13~mv2.jpg',
    '945304_c9b664e22c8d44debdb22021ffc38a9f~mv2.png',
    '945304_4eda23fc650e41eea26aff99f6f1a8e2~mv2.jpg',
    'sem_2025_qatar.jpg'
  ];

  for (const file of thumbs) {
    const inPath = path.join(galleryDir, file);
    const baseName = path.parse(file).name;
    const outPath = path.join(galleryDir, `${baseName}.webp`);
    if (fs.existsSync(inPath)) {
      await convertFile(inPath, outPath, 80);
    } else {
      console.warn('Thumb not found:', inPath);
    }
  }

  console.log('\n--- Converting 4x Upscaled Fullscreen Images to WebP ---');
  if (fs.existsSync(upscaledDir)) {
    const files = fs.readdirSync(upscaledDir);
    for (const file of files) {
      if (file.endsWith('.png') || file.endsWith('.jpg')) {
        const inPath = path.join(upscaledDir, file);
        const baseName = path.parse(file).name;
        const outPath = path.join(upscaledDir, `${baseName}.webp`);
        await convertFile(inPath, outPath, 85);
      }
    }
  }

  // Also convert the 9th image for fullscreen
  const ninthPath = path.join(galleryDir, '945304_59d8fa4cc53340969eec6e80fb04e374~mv2.avif');
  const ninthOut = path.join(upscaledDir, '945304_59d8fa4cc53340969eec6e80fb04e374~mv2.webp');
  if (fs.existsSync(ninthPath) && !fs.existsSync(ninthOut)) {
    await convertFile(ninthPath, ninthOut, 85);
  }

  console.log('\nDone conversion!');
}

run();
