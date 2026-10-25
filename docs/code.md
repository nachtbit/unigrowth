# Code

## Stack
- React 18 (JavaScript, JSX)
- React Router (`react-router-dom`) for client-side routing
- Vite 6
- Self-hosted fonts via `@fontsource/onest`, `@fontsource/raleway`, and `@fontsource/inter`
- Plain CSS with CSS variables (no CSS framework)
- Package manager: npm

## Structure
```
unigrowth/
├── docs/                     project documentation
├── README.md                 project entry point and docs index
├── public/logos/             SVG logos and favicon
├── src/
│   ├── main.jsx              entry point, wraps router, i18n, data store, admin auth
│   ├── App.jsx               route table (public, partner portal, admin panel)
│   ├── fonts.js              self-hosted font imports (latin, latin-ext, cyrillic)
│   ├── index.css             theme variables and global styles
│   ├── data/
│   │   ├── seed.js           initial mock dataset (countries, universities, programs, agencies, inquiries, partnerRequests)
│   │   └── store.jsx         localStorage-backed CRUD store & public selectors
│   ├── i18n/
│   │   ├── index.jsx         language context (`useI18n`, `t`, `loc`), persists to localStorage
│   │   ├── en.js             English strings
│   │   ├── az.js             Azerbaijani strings
│   │   └── ru.js             Russian strings
│   ├── components/
│   │   ├── Layout.jsx        public header, language switcher, footer
│   │   ├── HeroArt.jsx       original animated SVG hero illustration
│   │   ├── Cards.jsx         UniversityCard, ProgramCard, AgencyCard
│   │   ├── InquiryModal.jsx  student inquiry dialog
│   │   └── ui.jsx            shared UI primitives (Modal, Field, Avatar, VerifiedBadge, PageHeader)
│   ├── pages/
│   │   ├── Home.jsx          landing page (hero, stats, 3-sided overview, featured lists, FAQ, CTA)
│   │   ├── Universities.jsx  searchable/filterable university directory
│   │   ├── UniversityDetail.jsx  university profile, programs offered, country agencies, inquiry trigger
│   │   ├── Programs.jsx      program search & filter by country, degree, and field
│   │   ├── Agencies.jsx      searchable/filterable agency directory
│   │   ├── AgencyDetail.jsx  agency profile, destinations, services, contact trigger
│   │   ├── Partners.jsx      B2B partner application page (agency / university)
│   │   ├── Portal.jsx        demo partner login & dashboard to manage student inquiries
│   │   └── NotFound.jsx      404 page
│   └── admin/
│       ├── auth.jsx          mock sessionStorage admin auth (`admin@unigrowth.com` / `admin123`)
│       ├── Login.jsx         admin login screen
│       ├── AdminLayout.jsx   sidebar layout with live review counters
│       ├── Dashboard.jsx     overview metrics, inquiries by country chart, recent inquiries
│       ├── Crud.jsx          reusable search/filter/create/edit/delete/verify table & modal
│       ├── Resources.jsx     Countries, Universities, Programs, and Agencies admin screens
│       ├── Inbox.jsx         PartnerRequests (approve & auto-create verified org) and Inquiries admin screens
│       └── Settings.jsx      export JSON, import JSON, reset to demo data
├── index.html                Vite entry HTML
├── vite.config.js
├── vercel.json               Vercel static deploy config
└── package.json
```

## Commands
| Command | Does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built output locally |

## Architecture decision
Frontend-only with **mock data** for now. All data access goes through `src/data/store.jsx` (persisted in `localStorage` under `unigrowth:data:v1`, seeded from `src/data/seed.js`). Only `verified` universities and agencies are returned by `usePublicData()` on the public site; `pending` and `rejected` records are managed in `/admin`. Replacing `store.jsx` with real API calls later requires no UI rewrites.

## Internationalization
Languages: EN, AZ, RU (all left-to-right), managed by `src/i18n/index.jsx`. All UI text comes from `src/i18n/{en,az,ru}.js`, and localized entity fields use `{ en, az, ru }` objects resolved with `loc()`. Self-hosted font subsets (`latin`, `latin-ext`, `cyrillic`) are loaded in `src/fonts.js`.

## Conventions
- Colors come from CSS variables in `src/index.css`.
- Keep the app a static site (no server code) so it deploys to Vercel as static files.
- Update these docs with every structural change (see [README](../README.md)).
- Commit style: short imperative message.

## Not set up yet
Linting, automated test runner in `package.json`, TypeScript, real backend/auth. Add here when introduced.
