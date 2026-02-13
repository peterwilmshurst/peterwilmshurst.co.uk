# peterwilmshurst.co.uk

Personal site built with Vue 3, TypeScript, Vite, Pinia, Vue Router, and Tailwind.

## Tech Stack
- Vue 3 + TypeScript
- Vite 7
- Pinia 3
- Vue Router 5
- Tailwind CSS v4
- ESLint 9

## Getting Started

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Available Scripts

```sh
npm run dev         # Start development server
npm run lint        # Run ESLint with autofix
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
  views/            # Route-level Vue components
  router/           # Vue Router setup
  store/            # Pinia stores
  style.css         # Tailwind v4 theme tokens
public/             # Static public assets
```

## Code Quality
- Use TypeScript for authored application code.
- Run `npm run lint` and `npm run type-check` before commits.
- ESLint enforces single quotes and no semicolons.

## Build for Production

```sh
npm run build
```

Output is generated in `dist/`.
