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

## Build Targets

This project supports three static build targets with different env sources and output folders:

- `npm run build:production` -> `.next-production` (uses `.env.production`)
- `npm run build:development` -> `.next-development` (uses `.env.development`)
- `npm run build:sandbox` -> `.next-sandbox` (uses `.env.sandbox`)
- `npm run build:all` -> builds all three targets in sequence

Start a specific built target:

- `npm run start:production`
- `npm run start:development`
- `npm run start:sandbox`

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

## Deployment

For FTP/manual deployment, upload the correct build output folder (`.next-production`, `.next-development`, or `.next-sandbox`) based on the target environment.
