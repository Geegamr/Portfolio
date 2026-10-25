# Portfolio

A personal site for a designer or developer: a counted preloader, an
oversized name, a services marquee, a selected-work grid with parallax and a
cursor-following label, an about teaser, an expanding services list and a
contact section with a working form. Each project has a
case-study page with a next-project link, and there is a full about page.

## Run it

```sh
bun install
bun run dev        # http://localhost:5173
bun run build      # dist/client (assets) + dist/portfolio/index.js (Worker)
```

## Make it yours

- `src/data/site.ts` is the whole site: your name, role, location, socials,
  projects and services. Images live in `public/images`; each project has one
  cover and the case-study page crops it for detail shots until you add more.
- `src/app/pages/*` are the three pages; `src/app/components/motion.tsx` holds
  the reusable animation pieces (masked line reveals, parallax, magnetic
  buttons, the rotating badge).
- `src/styles.css` holds the tokens: a paper canvas, ink text, one electric
  accent, Bricolage Grotesque for display type. Everything rounded is a
  squircle via `corner-shape`; true circles use `.round`.
- The contact form posts directly from the browser to Web3Forms, so it works
  on static hosts such as GitHub Pages without this Worker. Copy `.env.example`
  to `.env.local` and set `VITE_WEB3FORMS_ACCESS_KEY` to the access key from
  Web3Forms. This key is intended for frontend use; submissions are delivered
  to the email address verified in your Web3Forms account. If the online submit
  fails (including after the monthly free quota is exhausted), the form opens a
  pre-filled `mailto:` draft instead. Visitors need an email app configured to
  send that draft. Never put private API credentials in a `VITE_` variable.

Motion respects `prefers-reduced-motion`, and the preloader runs once per tab.

## Deploy with Freebuff Sites

`deploy.json` points at the build output. After `bun run build`, deploy with
the `sites_deploy` tool from this directory.
