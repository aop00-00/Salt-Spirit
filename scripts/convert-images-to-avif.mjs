import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
import os from 'node:os';
import path from 'node:path';

const ROOT = path.resolve('public/images');
const FORMATS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const QUALITY = 60;
const require = createRequire(import.meta.url);

let sharpInstance;

async function resolveSharpFromNpxCache() {
  const cacheRoot =
    process.env.LOCALAPPDATA ??
    path.join(os.homedir(), 'AppData', 'Local');
  const npxRoot = path.join(cacheRoot, 'npm-cache', '_npx');

  try {
    const entries = await fs.readdir(npxRoot, {withFileTypes: true});
    for (const entry of entries.reverse()) {
      if (!entry.isDirectory()) {
        continue;
      }

      const sharpPackage = path.join(
        npxRoot,
        entry.name,
        'node_modules',
        'sharp',
        'package.json',
      );

      if (await exists(sharpPackage)) {
        return createRequire(sharpPackage)('sharp');
      }
    }
  } catch {
    return null;
  }

  return null;
}

async function loadSharp() {
  if (sharpInstance) {
    return sharpInstance;
  }

  try {
    sharpInstance = require('sharp');
    return sharpInstance;
  } catch {
    const nodePath = process.env.NODE_PATH
      ?.split(path.delimiter)
      .find(Boolean);

    if (!nodePath) {
      throw new Error(
        "Could not resolve 'sharp'. Install it in this project or set NODE_PATH to a directory that contains sharp.",
      );
    }

    const tempRequire = createRequire(
      path.join(nodePath, 'codex-sharp-loader.cjs'),
    );
    sharpInstance = tempRequire('sharp');
    return sharpInstance;
  }

  sharpInstance = await resolveSharpFromNpxCache();
  if (sharpInstance) {
    return sharpInstance;
  }

  throw new Error(
    "Could not resolve 'sharp'. Install it in this project, set NODE_PATH, or run the script through `npx -p sharp` first.",
  );
}

async function walk(dir) {
  const entries = await fs.readdir(dir, {withFileTypes: true});
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(fullPath) : fullPath;
    }),
  );

  return files.flat();
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function toAvifPath(filePath) {
  return filePath.replace(/\.[^.]+$/, '.avif');
}

async function convertFile(filePath, force = false) {
  const ext = path.extname(filePath).toLowerCase();
  if (!FORMATS.has(ext)) {
    return null;
  }

  const outputPath = toAvifPath(filePath);
  if (!force && (await exists(outputPath))) {
    return {filePath, outputPath, status: 'skipped'};
  }

  const sharp = await loadSharp();
  await sharp(filePath).avif({quality: QUALITY}).toFile(outputPath);
  return {filePath, outputPath, status: 'converted'};
}

async function main() {
  const force = process.argv.includes('--force');
  const files = await walk(ROOT);
  const imageFiles = files.filter((filePath) =>
    FORMATS.has(path.extname(filePath).toLowerCase()),
  );

  let converted = 0;
  let skipped = 0;

  for (const filePath of imageFiles) {
    const result = await convertFile(filePath, force);
    if (!result) {
      continue;
    }

    const relativeInput = path.relative(process.cwd(), result.filePath);
    const relativeOutput = path.relative(process.cwd(), result.outputPath);

    if (result.status === 'converted') {
      converted += 1;
      console.log(`converted ${relativeInput} -> ${relativeOutput}`);
    } else {
      skipped += 1;
      console.log(`skipped ${relativeOutput}`);
    }
  }

  console.log(`done converted=${converted} skipped=${skipped}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
