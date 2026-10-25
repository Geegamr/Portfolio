# Enrique Ramirez — Developer Portfolio

A personal portfolio for my desktop apps, web projects, and practical tools. It includes selected project case studies, an about page, a services overview, and a contact form. Built with React, TypeScript, Vite, Tailwind CSS, and Motion.

**Live site:** https://geegamr.github.io/Portfolio/

## Run locally

Requirements: [Bun](https://bun.sh/) and Git.

```sh
bun install
bun run dev
```

Vite prints the local development URL (usually `http://localhost:5173`). To check types and create a production build:

```sh
bun run typecheck
bun run build
```

The static site output is written to `dist/`.

## Update the portfolio

- Edit `src/data/site.ts` to update the site details, services, social links, and selected projects. Each project has its own case-study route.
- Put project covers, screenshots, and the portrait in `public/images/`; reference them from the site data using paths such as `/images/project.png`.
- Edit `src/app/pages/` for the Home, About, and Work pages. Shared components are in `src/app/components/`, and global styles are in `src/styles.css`.

## Contact form

The contact form submits from the visitor’s browser to Web3Forms, which delivers messages to the email address verified in that Web3Forms account. For local use, copy `.env.example` to `.env.local` and set `VITE_WEB3FORMS_ACCESS_KEY` to your Web3Forms access key. The key is intended for frontend use and will be present in the built site; do not put private API credentials in `VITE_` variables.

For GitHub Pages, the workflow expects a repository Actions secret named `VITE_WEB3FORMS_ACCESS_KEY`. It is already configured for this repository. If the online form submission fails, the page offers a pre-filled email draft as a fallback; visitors need an email application configured to send it.

## GitHub Pages deployment

This repository is configured to publish automatically from `main` using [`.github/workflows/pages.yml`](.github/workflows/pages.yml). The workflow installs dependencies with the committed Bun lockfile, typechecks and builds the site with the `/Portfolio/` base path, then deploys `dist/` to GitHub Pages. A push to `main` or a manual workflow run starts a deployment.

The current Pages site is https://geegamr.github.io/Portfolio/.
