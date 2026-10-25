# Deployment

Static site hosted on Vercel.

## Config
[`vercel.json`](../vercel.json):
- Framework: `vite`
- Build command: `npm run build`
- Output directory: `dist`
- Rewrite: all paths go to `/index.html` (single-page app fallback)

## Deploy
1. Push the repo to Git and import it in Vercel, or run `npx vercel`.
2. Vercel builds and serves `dist/` automatically.

## Status
Not deployed yet. Record the production URL and domain here once live.
