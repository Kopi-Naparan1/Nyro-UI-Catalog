/* global process */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, "ui-components");
const [targetProjectArg, destinationArg = "ui-components"] = process.argv.slice(2);

if (!targetProjectArg) {
  console.error("Usage: npm run setup:ui -- <target-project-path> [destination-relative-path]");
  process.exit(1);
}

const targetProjectDir = path.resolve(process.cwd(), targetProjectArg);

if (!fs.existsSync(targetProjectDir) || !fs.statSync(targetProjectDir).isDirectory()) {
  console.error(`Target project directory does not exist: ${targetProjectDir}`);
  process.exit(1);
}

const destinationDir = path.resolve(targetProjectDir, destinationArg);

if (path.resolve(sourceDir) === destinationDir) {
  console.error("Source and destination directories are the same. Choose a different destination.");
  process.exit(1);
}

fs.mkdirSync(path.dirname(destinationDir), { recursive: true });
fs.cpSync(sourceDir, destinationDir, { recursive: true, force: true });

const destinationFromSrc = path.relative(
  path.join(targetProjectDir, "src"),
  destinationDir,
).replace(/\\/g, "/");
const foundationImportPath = destinationFromSrc.startsWith(".")
  ? `${destinationFromSrc}/styles/foundation.css`
  : `./${destinationFromSrc}/styles/foundation.css`;
const indexImportPath = destinationFromSrc.startsWith(".")
  ? destinationFromSrc
  : `./${destinationFromSrc}`;

console.log("UI components copied successfully.");
console.log(`From: ${sourceDir}`);
console.log(`To:   ${destinationDir}`);
console.log("");
console.log("Next steps in the target project:");
console.log("1. Import components from the library entrypoint (foundation styles load automatically):");
console.log(`   import { Button, Card, TextInput } from "${indexImportPath}";`);
console.log("2. Optional: if you use deep imports, include foundation styles once in src/main.jsx:");
console.log(`   import "${foundationImportPath}";`);
