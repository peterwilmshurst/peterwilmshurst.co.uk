# peterwilmshurst.co.uk

Personal site built with Vue 3, TypeScript, Vite, Pinia, Vue Router, Tailwind CSS v4, Biome, and Playwright.

## Tech Stack
- Vue 3 + TypeScript
- Vite 7
- Pinia 3
- Vue Router 5
- Tailwind CSS v4
- Biome 2
- Playwright Test

## Getting Started

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Available Scripts

```sh
npm run dev         # Start development server
npm run lint        # Run Biome checks with autofix
npm run format      # Format files with Biome
npm run type-check  # Run vue-tsc type checking
npm run build       # Type-check + production build
npm run build-only  # Production build without type-check
npm run preview     # Preview production build locally
npm run test:e2e    # Run Playwright smoke tests (Chromium)
npm run test:e2e:ui # Open Playwright UI mode
```

## Project Structure

```text
src/
  main.ts           # App bootstrap
  App.vue           # Root component
  views/home.vue    # Route-level Home view
  components/logo.vue
  router/           # Router config + route names/meta types
  store/            # Pinia store
  style.css         # Tailwind import + global tokens/base styles
public/             # Static public assets
biome.json          # Lint/format config
```

## Code Quality
- Use TypeScript for authored application code.
- Run `npm run format`, `npm run lint`, `npm run type-check`, and `npm run test:e2e` before commits.
- Biome enforces formatting and lint rules (single quotes, no semicolons, Tailwind directives enabled for CSS parsing).
- Keep file names concise (`home.vue`, `logo.vue`) and import components in PascalCase aliases (`import Home from './home.vue'`).

## End-to-End Testing
- Smoke tests live in `tests/e2e/` and run with Playwright.
- `playwright.config.ts` starts the Vite dev server on `127.0.0.1:4173` during test runs.
- If this is your first run on a machine, install browsers with `npx playwright install chromium`.

## Recent Changes
- Migrated from ESLint + Stylistic to Biome.
- Added typed route names and `RouteMeta` augmentation.
- Moved major visual styles to Tailwind utilities and global `src/style.css`.
- Extracted SVG logo into a standalone Vue component.
- Added Playwright smoke tests and PR quality checks.

## Build for Production

```sh
npm run build
```

Output is generated in `dist/`.

## Node and Netlify Build Requirements
- This project uses `vite@7` and `@tailwindcss/vite`, which require Node `20.19+` or `22.12+`.
- Recommended local version is Node `22` (`.nvmrc` is set to `22`).
- Netlify is configured via `netlify.toml` to build with Node `22`.
- If Netlify builds still use Node 18, check for an overriding `NODE_VERSION` in Netlify site/team environment settings.
