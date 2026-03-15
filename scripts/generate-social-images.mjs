import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
import os from 'node:os';
import path from 'node:path';

const require = createRequire(import.meta.url);
const OUTPUT_DIR = path.resolve('public/images/sharing');

const IMAGES = [
  {
    input: 'public/images/archive/raw/_MG_0016_VSCO.JPG',
    output: 'home-og.jpg',
  },
  {
    input: 'public/images/archive/raw/_MG_0410_VSCO.JPG',
    output: 'about-og.jpg',
  },
  {
    input: 'public/images/archive/raw/_MG_0329_VSCO.JPG',
    output: 'products-og.jpg',
  },
  {
    input: 'public/images/archive/raw/_MG_0341_VSCO.JPG',
    output: 'product-og.jpg',
  },
];

let sharpInstance;

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveSharpFromNpxCache() {
  const cacheRoot =
    process.env.LOCALAPPDATA ??
    path.join(os.homedir(), 'AppData', 'Local');
  const npxRoot = path.join(cacheRoot, 'npm-cache', '_npx');

  try {
    const entries = await fs.readdir(npxRoot, {withFileTypes: true});
    for (const entry of entries.reverse()) {
      if (!entry.isDirectory()) continue;

      const packageJsonPath = path.join(
        npxRoot,
        entry.name,
        'node_modules',
        'sharp',
        'package.json',
      );

      if (await exists(packageJsonPath)) {
        return createRequire(packageJsonPath)('sharp');
      }
    }
  } catch {
    return null;
  }

  return null;
}

async function loadSharp() {
  if (sharpInstance) return sharpInstance;

  try {
    sharpInstance = require('sharp');
    return sharpInstance;
  } catch {}

  const nodePath = process.env.NODE_PATH?.split(path.delimiter).find(Boolean);
  if (nodePath) {
    try {
      const tempRequire = createRequire(
        path.join(nodePath, 'codex-sharp-loader.cjs'),
      );
      sharpInstance = tempRequire('sharp');
      return sharpInstance;
    } catch {}
  }

  sharpInstance = await resolveSharpFromNpxCache();
  if (sharpInstance) return sharpInstance;

  throw new Error(
    "Could not resolve 'sharp'. Run this after `npx -p sharp` has primed the npm cache, or set NODE_PATH.",
  );
}

async function main() {
  const sharp = await loadSharp();
  await fs.mkdir(OUTPUT_DIR, {recursive: true});

  for (const image of IMAGES) {
    const inputPath = path.resolve(image.input);
    const outputPath = path.join(OUTPUT_DIR, image.output);

    await sharp(inputPath)
      .resize(1200, 630, {
        fit: 'cover',
        position: sharp.strategy.attention,
      })
      .jpeg({quality: 82, mozjpeg: true})
      .toFile(outputPath);

    console.log(`generated ${path.relative(process.cwd(), outputPath)}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
