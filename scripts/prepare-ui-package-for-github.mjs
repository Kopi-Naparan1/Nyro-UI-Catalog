/* global process */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const owner = (process.argv[2] || process.env.GITHUB_REPOSITORY_OWNER || "").toLowerCase();

if (!owner) {
  console.error("Missing GitHub owner. Pass it as an argument or set GITHUB_REPOSITORY_OWNER.");
  process.exit(1);
}

if (!/^[a-z0-9-]+$/.test(owner)) {
  console.error(`Invalid GitHub owner "${owner}". Use lowercase letters, numbers, or hyphens.`);
  process.exit(1);
}

const packagePath = path.resolve(__dirname, "..", "ui-components", "package.json");
const distDir = path.resolve(__dirname, "..", "ui-components", "dist");
const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

packageJson.name = `@${owner}/ui-components`;
packageJson.publishConfig = {
  registry: "https://npm.pkg.github.com",
};

if (!fs.existsSync(distDir)) {
  console.error("Missing ui-components/dist. Run `npm run ui:build` before publishing.");
  process.exit(1);
}

packageJson.main = "./dist/index.js";
packageJson.module = "./dist/index.js";
packageJson.exports = {
  ".": "./dist/index.js",
  "./buttons": "./dist/buttons/index.js",
  "./feedback": "./dist/feedback/index.js",
  "./inputs": "./dist/inputs/index.js",
  "./layout": "./dist/layout/index.js",
  "./navigation": "./dist/navigation/index.js",
  "./patterns": "./dist/patterns/index.js",
  "./typography": "./dist/typography/index.js",
  "./styles/foundation.css": "./styles/foundation.css",
};
packageJson.files = ["dist", "styles", "README.md"];

fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);

console.log(`Prepared package for GitHub Packages: ${packageJson.name}`);
