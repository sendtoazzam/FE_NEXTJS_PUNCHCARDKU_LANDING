import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import process from "node:process";

function fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

const [envName, distDir, envSourceFile] = process.argv.slice(2);
if (!envName || !distDir || !envSourceFile) {
  console.error("Usage: node scripts/build-with-env.mjs <production|development|sandbox> <distDir> <envSourceFile>");
  process.exit(1);
}

const projectRoot = process.cwd();
const targetEnvProduction = path.join(projectRoot, ".env.production");
const targetEnvLocal = path.join(projectRoot, ".env.local");
const sourceEnvFile = path.join(projectRoot, envSourceFile);

if (!fileExists(sourceEnvFile)) {
  console.error(`Missing env source file: ${sourceEnvFile}`);
  process.exit(1);
}

// Snapshot current env files in-memory so we can restore after build
// without creating timestamped backup files in project root.
const hadEnvProduction = fileExists(targetEnvProduction);
const hadEnvLocal = fileExists(targetEnvLocal);
const previousEnvProduction = hadEnvProduction
  ? fs.readFileSync(targetEnvProduction, "utf8")
  : null;
const previousEnvLocal = hadEnvLocal ? fs.readFileSync(targetEnvLocal, "utf8") : null;

try {
  // Next during `next build` loads `.env.production` (based on production mode).
  // To ensure the "development" and "sandbox" builds use their own env, we copy them into `.env.production` and `.env.local`.
  fs.copyFileSync(sourceEnvFile, targetEnvProduction);
  fs.copyFileSync(sourceEnvFile, targetEnvLocal);

  const env = {
    ...process.env,
    NEXT_DIST_DIR: distDir,
  };

  console.log(`[build-with-env] env=${envName} distDir=${distDir} using=${envSourceFile}`);

  const nextBin =
    process.platform === "win32"
      ? path.join(projectRoot, "node_modules", ".bin", "next.cmd")
      : path.join(projectRoot, "node_modules", ".bin", "next");
  const result = spawnSync(nextBin, ["build", "--webpack"], {
    stdio: "pipe",
    env,
    shell: process.platform === "win32",
  });

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
} finally {
  // Restore previous env files.
  if (previousEnvProduction != null) {
    fs.writeFileSync(targetEnvProduction, previousEnvProduction, "utf8");
  } else if (fileExists(targetEnvProduction)) {
    fs.unlinkSync(targetEnvProduction);
  }

  if (previousEnvLocal != null) {
    fs.writeFileSync(targetEnvLocal, previousEnvLocal, "utf8");
  } else if (fileExists(targetEnvLocal)) {
    fs.unlinkSync(targetEnvLocal);
  }
}

