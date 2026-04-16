import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build artifacts go into different folders depending on env.
  // Set by npm scripts, e.g. NEXT_DIST_DIR=.next-production
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    qualities: [75, 100],
  },
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
