# Changelog

Newest first.

## 2026-10-25
- Built the full mock-data platform: `localStorage` data store (`src/data/`), EN/AZ/RU i18n (`src/i18n/`), self-hosted Onest/Raleway/Inter fonts, original SVG hero animation, public pages (`/`, `/universities`, `/universities/:id`, `/programs`, `/agencies`, `/agencies/:id`, `/partners`, `/portal`), and full functional admin panel (`/admin`) with verification workflows, CRUD, and JSON import/export/reset.
- Design update in `docs/design.md`: use gofar.ru fonts (Onest, Raleway, Inter) and page structure instead of Goethe; languages EN, AZ, RU; original animations; admin panel uses the same green look.
- Recorded design decisions in `docs/design.md` (look and feel, mobile-first, font direction, multi-language).
- Recorded product decisions in `docs/idea.md`: in-person payment, free for students, manual verification via admin panel, frontend-only with mock data.
- Documented the product vision (students, agencies, universities) in `docs/idea.md`, with open questions.
- Added root `README.md` as the docs index and `docs/` with idea, design, code, deployment, roadmap and changelog.
- Added green theme in `src/index.css` (white background, green primary, 11-step green scale).
- Added logos in `public/logos/` and linked the favicon in `index.html`.

## 2026-10-15
- Initialized React + Vite app showing "Welcome to UniGrowth!".
- Added `vercel.json` for static deployment.
