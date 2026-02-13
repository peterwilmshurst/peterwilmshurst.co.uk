# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains application code.
- `src/main.ts` bootstraps Vue, router, and store.
- `src/views/` holds route-level Vue pages (for example `HomeView.vue`).
- `src/router/` defines route configuration.
- `src/store/` contains Pinia stores.
- `src/assets/` stores static source assets; `public/` holds files served as-is.
- `dist/` is build output and should not be edited manually.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start Vite dev server with hot reload.
- `npm run build`: run type-check then production build.
- `npm run build-only`: build without type-check (faster local iteration).
- `npm run type-check`: run `vue-tsc` against `tsconfig.app.json`.
- `npm run lint`: run Biome checks with auto-fix via `biome.json`.

## Coding Style & Naming Conventions
- Language stack: TypeScript + Vue 3 SFCs.
- Indentation: 2 spaces in TS, JS, and Vue files.
- Use single quotes and omit semicolons (enforced by Biome).
- Prefer PascalCase for Vue component filenames (for example `HomeView.vue`).
- Keep route/store module names concise and descriptive (for example `router/index.ts`, `store/index.ts`).

## Testing Guidelines
- No dedicated unit test suite is configured yet.
- Treat `npm run lint`, `npm run type-check`, and `npm run build` as required quality gates before opening a PR.
- For behavior changes, include manual verification notes in the PR description (paths tested, expected outcome).

## Commit & Pull Request Guidelines
- Follow existing Conventional Commit style seen in history, e.g. `chore: upgrade vue-router to v5`.
- Use imperative, scoped subjects (`feat: add contact form route`, `fix: handle missing store state`).
- Keep commits focused; avoid bundling unrelated refactors.
- PRs should include the following:
1. A short summary of what changed and why.
2. Linked issue(s) when applicable.
3. Validation steps run (`npm run lint`, `npm run type-check`, `npm run build`).
4. Screenshots for UI-visible changes.

## Security & Configuration Tips
- Do not commit secrets or environment-specific credentials.
- Keep dependency upgrades small and review `npm audit` output after upgrades.
