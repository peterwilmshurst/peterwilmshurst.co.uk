# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains application code.
- `src/main.ts` bootstraps Vue, router, Pinia, and global styles.
- `src/views/home.vue` is the current route-level page.
- `src/components/logo.vue` contains the main SVG logo component.
- `src/router/` contains router setup plus `route-names.ts` and `meta.d.ts`.
- `src/store/index.ts` contains the primary Pinia store.
- `src/style.css` contains Tailwind import, theme tokens, and shared global styles.
- `public/` holds files served as-is.
- `dist/` is build output and should not be edited manually.

## Build, Test, and Development Commands
- `npm install`: install dependencies.
- `npm run dev`: start Vite dev server with hot reload.
- `npm run build`: run type-check then production build.
- `npm run build-only`: build without type-check (faster local iteration).
- `npm run type-check`: run `vue-tsc` against `tsconfig.app.json`.
- `npm run lint`: run Biome checks with auto-fix via `biome.json`.
- `npm run format`: run Biome formatter across the repo.

## Coding Style & Naming Conventions
- Language stack: TypeScript + Vue 3 SFCs.
- Indentation: 2 spaces in TS, JS, and Vue files.
- Use single quotes and omit semicolons (enforced by Biome).
- Keep component filenames consistent per folder; prefer PascalCase for new components.
- Keep route/store module names concise and descriptive (for example `router/index.ts`, `store/index.ts`).
- Use Tailwind utility classes first; place shared/non-utility rules in `src/style.css`.

## Testing Guidelines
- No dedicated unit test suite is configured yet.
- Treat `npm run format`, `npm run lint`, `npm run type-check`, and `npm run build` as required quality gates before opening a PR.
- For behavior changes, include manual verification notes in the PR description (paths tested, expected outcome).

## Commit & Pull Request Guidelines
- Follow the Conventional Commit style used in recent history (`chore:`, `refactor:`, `feat:`, `fix:`), e.g. `chore: update biome configuration`.
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
