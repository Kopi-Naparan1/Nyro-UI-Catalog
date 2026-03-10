/* global process */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const sourceDir = path.join(rootDir, "ui-components");
const distDir = path.join(sourceDir, "dist");

const EXCLUDED_DIRS = new Set(["dist", "__tests__", "node_modules"]);

function walk(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry.name)) {
        continue;
      }
      walk(path.join(dir, entry.name), files);
      continue;
    }
    files.push(path.join(dir, entry.name));
  }
  return files;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(source, destination) {
  ensureDir(path.dirname(destination));
  fs.copyFileSync(source, destination);
}

function relativeToSource(filePath) {
  return path.relative(sourceDir, filePath);
}

if (!fs.existsSync(sourceDir)) {
  console.error(`Missing ui-components directory at ${sourceDir}`);
  process.exit(1);
}

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}

const allFiles = walk(sourceDir);
const entryPoints = allFiles.filter((file) => file.endsWith(".js") || file.endsWith(".jsx"));
const cssFiles = allFiles.filter((file) => file.endsWith(".css"));

await build({
  entryPoints,
  outdir: distDir,
  outbase: sourceDir,
  bundle: false,
  format: "esm",
  platform: "neutral",
  jsx: "automatic",
  loader: {
    ".js": "jsx",
    ".jsx": "jsx",
  },
  logLevel: "info",
});

for (const cssFile of cssFiles) {
  const relativePath = relativeToSource(cssFile);
  copyFile(cssFile, path.join(distDir, relativePath));
}

console.log(`UI components built into ${distDir}`);
