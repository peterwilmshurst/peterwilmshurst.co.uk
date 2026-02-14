# peterwilmshurst.co.uk

Personal site built with Vue 3, TypeScript, Vite, Pinia, Vue Router, Tailwind CSS v4, and Biome.

## Tech Stack
- Vue 3 + TypeScript
- Vite 7
- Pinia 3
- Vue Router 5
- Tailwind CSS v4
- Biome 2

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
- Run `npm run format`, `npm run lint`, and `npm run type-check` before commits.
- Biome enforces formatting and lint rules (single quotes, no semicolons, Tailwind directives enabled for CSS parsing).

## Recent Changes
- Migrated from ESLint + Stylistic to Biome.
- Added typed route names and `RouteMeta` augmentation.
- Moved major visual styles to Tailwind utilities and global `src/style.css`.
- Extracted SVG logo into a standalone Vue component.

## Build for Production

```sh
npm run build
```

Output is generated in `dist/`.
