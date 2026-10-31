# Masaha / مساحة

A complete Arabic-first Angular 21 + Tailwind CSS frontend for an illustrative interior design studio. Standalone components, lazy routes, signals, reactive forms and Lucide icons. Cairo and Manrope fonts and responsive stock photography are bundled locally.

## Run

Requires Node.js 20.19+ or 22.12+ (Node 24 is supported).

```sh
npm install
npm start
```

Open http://localhost:4200. To produce deployable assets, run `npm run build`; output is `dist/masaha/browser`.

## Check

```sh
npm test
npm run build
```

Playwright uses installed Microsoft Edge and starts/reuses the development server automatically. On a machine without Edge, install Chromium using `npx playwright install chromium` and remove `channel: 'msedge'` from `playwright.config.ts`.

Tests cover routes, project filtering and history, project/service preselection, gallery keyboard interaction, focus restoration, form validation with Arabic numerals, demo success, language and state preservation, mobile menu, loaded photography, and overflow at 360 / 390 / 768 / 1280 / 1536 pixels.

## Structure

- `src/app/core`: typed bilingual content, six project records, language service, normalization and validators.
- `src/app/features`: home, services, projects, details, quote, not-found.
- `src/app/shared.ts`: project card and layout-preserving image fallback.
- `src/styles.css`: design tokens and responsive RTL/LTR presentation, with Tailwind available.
- `tests`: browser integration checks.

## Hosting and privacy

Deploy the browser output to a static host with SPA fallback to `index.html`. A `_redirects` fallback is included for hosts that support it; Angular routes are handled client-side. Sites identity and output path live in `.openai/hosting.json`.

All projects and durations are illustrative. Photography is stock content, not completed Masaha work. The supplied brand has a typographic/vector interpretation. See `ASSETS.md` for sources and local font licenses.

Quote submission is a timer-based frontend simulation. Personal data is never transmitted, logged, or stored; form values are cleared after success. Only the language preference is stored in localStorage. There is no backend, authentication, booking, or real company contact channel.
