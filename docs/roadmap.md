# Roadmap

## Done
- [x] React + Vite scaffold
- [x] Vercel static deploy config
- [x] Logos: full, favicon, watermark
- [x] Green theme (white background, green scale)
- [x] Docs folder
- [x] Product vision documented in [idea.md](./idea.md)
- [x] Verify Onest, Raleway and Inter cover Azerbaijani (`ə`) and Cyrillic, and self-host them
- [x] Original animated SVG hero illustration (`HeroArt.jsx`) with `prefers-reduced-motion` support
- [x] Multi-language support (EN, AZ, RU) with header language switcher
- [x] Mock data layer (`src/data/seed.js` + `src/data/store.jsx`) persisted in `localStorage`
- [x] Public pages: Home, Universities (+ detail), Programs, Agencies (+ detail), For Partners, Partner Portal (+ dashboard), 404
- [x] Full functional Admin Panel (`/admin`): login, dashboard, partner request approval, CRUD + verification for universities/programs/agencies/countries, student inquiries, JSON import/export/reset

## Next
- [ ] Answer remaining open questions in [idea.md](./idea.md) (student profile fields and matching rules)
- [ ] Deploy to Vercel and record the URL in [deployment.md](./deployment.md)
- [ ] Get original vector logos from the designer
- [ ] Confirm interpolated green shades with the designer
- [ ] Connect `src/data/store.jsx` and admin/portal auth to a real backend when ready
