import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";
import fs from "node:fs";

const [envName, distDir] = process.argv.slice(2);
if (!envName || !distDir) {
  console.error("Usage: node scripts/start-with-env.mjs <production|development|sandbox> <distDir>");
  process.exit(1);
}

const projectRoot = process.cwd();
const buildDir = path.join(projectRoot, distDir);
if (!fs.existsSync(buildDir)) {
  console.error(`Build folder not found: ${buildDir}`);
  console.error(`Run: npm run build:${envName}`);
  process.exit(1);
}

const nextBin =
  process.platform === "win32"
    ? path.join(projectRoot, "node_modules", ".bin", "next.cmd")
    : path.join(projectRoot, "node_modules", ".bin", "next");

const result = spawnSync(nextBin, ["start"], {
  stdio: "inherit",
  env: { ...process.env, NEXT_DIST_DIR: distDir },
  shell: process.platform === "win32",
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

