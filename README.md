# kgstubbart.dev

Kason Stubbart's personal portfolio site — built with React, TypeScript, and Vite.

## Stack

- **Vite + React + TypeScript** — no meta-framework needed for a static, client-rendered portfolio.
- **react-router-dom** for client-side routing (`/`, `/projects`, `/experience`, `/education`, `/interests`).
- **CSS Modules** with a small set of shared CSS custom properties (`src/styles/theme.css`) for light/dark theming — no CSS framework dependency.
- **Canvas-based star field** on the home page (`src/components/home/CosmicBackground.tsx`) instead of a static image, so it stays cheap and scales to any viewport.

## Content

All resume-derived content (profile, skills, experience, projects, education, awards, interests) lives in one place: [`src/data/resume.ts`](src/data/resume.ts). Update that file to change what appears anywhere on the site — no need to touch components.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # type-checks with tsc, then builds to dist/
npm run preview # serve the production build locally
```

## Deployment (GitHub Pages + custom domain)

This repo deploys via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes `dist/` through GitHub's official Pages Actions on every push to `main`.

To enable it on GitHub:

1. Push this repo to GitHub.
2. In **Settings → Pages**, set **Source** to "GitHub Actions".
3. In **Settings → Pages → Custom domain**, enter `kgstubbart.dev` (this repo already ships a `public/CNAME` file with that value, so it will be included in every build).
4. At your domain registrar, point `kgstubbart.dev` at GitHub Pages:
   - Either an `A` record pointing at GitHub's Pages IPs, or
   - An `ALIAS`/`ANAME` record pointing at `<your-github-username>.github.io`.
   - (See [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for current IPs.)

### Client-side routing on GitHub Pages

GitHub Pages only serves static files, so a direct visit to `/projects` would normally 404. This project uses the standard ["SPA GitHub Pages" redirect trick](https://github.com/rafgraph/spa-github-pages): `public/404.html` rewrites unknown paths into a query string, and a small inline script in `index.html` decodes it back into the real path via `history.replaceState` before React Router mounts. This keeps real URLs (no `#/` hash routes) while working on static hosting.
