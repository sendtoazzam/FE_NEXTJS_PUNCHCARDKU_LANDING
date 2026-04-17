# Punchcardku Landing (Next.js)

Landing page for Punchcardku, built with Next.js App Router, TypeScript, Tailwind CSS, DaisyUI, and Framer Motion.

## Requirements

- Node.js 18+
- npm 8+

## Setup

1. Install dependencies:
   - `npm install`
2. Run local development:
   - `npm run dev`
3. Open:
   - [http://localhost:3000](http://localhost:3000)

## Build (static export)

This app uses Next.js **`output: "export"`** — each build emits static files, then `scripts/build-with-env.mjs` renames the default `out/` folder so you can keep three targets.

| Command | Env file used | Static output folder |
|--------|----------------|----------------------|
| `npm run build:production` | `.env.production` | `out-production/` |
| `npm run build:development` | `.env.development` | `out-development/` |
| `npm run build:sandbox` | `.env.sandbox` | `out-sandbox/` |
| `npm run build:all` | all of the above | all three folders |

Intermediate Next cache still uses `.next-production`, `.next-development`, or `.next-sandbox` (via `NEXT_DIST_DIR`).

### Preview static build locally

After building, serve the exported folder (no Node `next start`):

- `npm start` or `npm run preview:production` — serves `out-production` on port 3000
- `npm run preview:development` — `out-development`
- `npm run preview:sandbox` — `out-sandbox`

## Environment Files

Create and maintain these files locally:

- `.env.production`
- `.env.development`
- `.env.sandbox`

Optional template:

- `.env.example`

## Main Scripts

- `npm run dev` - local dev server
- `npm run lint` - eslint checks
- `npm run test` - currently mapped to lint
- `npm run build` - runs all build targets

## Project Notes

- Theme service supports light/dark mode with localStorage persistence, default light.
- Home page components are organized under:
  - `src/components/pages/home`
- Shared components are under:
  - `src/components/shared`
- Layout components are under:
  - `src/components/layout`

## Deployment (FTP / static hosting)

Upload **everything inside** the right export folder for your environment:

- Production: **`out-production/`** (contents, or the folder as the site root)
- Development: **`out-development/`**
- Sandbox: **`out-sandbox/`**

Do **not** upload `.next-*` alone for hosting; that is build cache. The host serves the **`out-*`** static files.

### Apache (`.htaccess`)

Nginx does **not** read `.htaccess` (Apache-only). Edit `deploy/.htaccess`. Before each `next build`, `scripts/build-with-env.mjs` copies it to `public/.htaccess`, so it is included in the static export (inside `out-*`).

The generated `public/.htaccess` is gitignored; keep `deploy/.htaccess` in version control.

### Nginx

Point `root` at the uploaded `out-production` (or dev/sandbox) directory. Use `try_files` as in `deploy/nginx-spa.example.conf` if you add client-side routes later.

## Troubleshooting

- Hydration mismatch in header/theme icon:
  - Ensure theme is initialized with a stable default (`light`) and restored from localStorage after mount.
- Theme not persisting:
  - Confirm browser localStorage is available and `punchcardku-theme` is not blocked/cleared.
- Wrong environment after build/preview:
  - Build with `npm run build:production` and preview with `npm run preview:production` (or `npm start`).
- Build output uploaded incorrectly (FTP):
  - Upload the **`out-production`** (or `out-development` / `out-sandbox`) folder, not `.next-*`.
