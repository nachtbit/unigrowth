# Design

## Principles
- Background is always **white**.
- Primary color is **green**.
- Design elements use the full green scale, from lightest to darkest.

## Colors
Defined as CSS variables in [`src/index.css`](../src/index.css). Use variables, never hard-coded hex.

| Token | Hex | Note |
| --- | --- | --- |
| `--green-50` | `#f1faf7` | interpolated |
| `--green-100` | `#dcf1ea` | interpolated |
| `--green-200` | `#bce3d6` | interpolated |
| `--green-300` | `#71bca5` | **logo light** |
| `--green-400` | `#4fa38a` | interpolated |
| `--green-500` | `#3a8a74` | interpolated |
| `--green-600` | `#2f7a66` | interpolated |
| `--green-700` | `#2a6d5c` | **logo mid**, primary |
| `--green-800` | `#1e5045` | **logo dark**, primary hover |
| `--green-900` | `#173f37` | interpolated |
| `--green-950` | `#0e2923` | interpolated, text |

Semantic tokens: `--color-bg` (white), `--color-primary`, `--color-primary-hover`, `--color-primary-soft`, `--color-border`, `--color-text`, `--color-text-muted`.

> [!NOTE]
> Shades marked "interpolated" were generated, not supplied by the designer. Confirm with the designer.

## Logos
Located in [`public/logos/`](../public/logos). Traced from the designer's JPEG, so edges are approximate. Replace with the designer's original vectors when available.

| File | Use |
| --- | --- |
| `unigrowth-logo.svg` | Full logo (mark + wordmark), header and general use |
| `favicon.svg` | Mark only, square canvas, browser tab icon |
| `unigrowth-watermark.svg` | Full logo at 15% opacity, watermark/overlay |

## Decisions
| Topic | Decision |
| --- | --- |
| Look and feel | Clean, modern, trustworthy: lots of white space, green accents, rounded cards |
| Design scope | All parts at a high level first: public landing and student search, admin panel, agency and university dashboards |
| Device priority | Mobile-first (students mostly browse on phones) |
| Reference site | [gofar.ru](https://www.gofar.ru): use its fonts and page structure (see below). Colors stay UniGrowth green, not gofar's purple. |
| Typography | Onest, Raleway, Inter (the fonts gofar.ru uses) |
| Animations | Brand-new, original animations in the spirit of gofar.ru. Never reuse gofar's assets. |
| Languages | English (EN), Azerbaijani (AZ), Russian (RU) from the start |
| Admin panel look | Same green scale as the public site |

## Reference: gofar.ru
Analysed from its published HTML and CSS. We take the **approach**, not the assets.

- **Fonts:** headings in **Onest**, body text in **Raleway**, navigation and links in **Inter**.
- **Structure:** a full-width hero (large headline, short animated feature list, call-to-action button), followed by stacked full-width sections: sliders, card grids, pricing and similar blocks. Very large rounded corners (up to 50px), generous spacing and soft light-gray surfaces.
- **Animation:** the site uses about a dozen Lottie (JSON vector) animations, not GIFs, mainly in the hero and as decorative lines.
- **Colors there:** purple `#7a7aff` with near-black `#0f0f0f` and light grays. We replace purple with our green scale and keep the light-gray surface idea (use `--green-50`).

> [!WARNING]
> Never copy gofar.ru's logos, illustrations, animation files or text. Fonts are fine to reuse (all three are open-source Google Fonts).

## Typography
| Role | Font | Used for |
| --- | --- | --- |
| Headings | Onest | h1 to h5, prices, big numbers |
| Body | Raleway | Paragraphs and general text |
| UI | Inter | Navigation, links, buttons, labels, admin tables |

Keep each font in a CSS variable (`--font-heading`, `--font-body`, `--font-ui`). Load them self-hosted, not from a CDN, for speed and privacy.

> [!NOTE]
> Verified glyph coverage in `@fontsource/{onest,raleway,inter}`: all three fonts include Cyrillic and `latin-ext` (including Azerbaijani `ə`/`Ə`). Self-hosted in `src/fonts.js` and bound to `--font-heading`, `--font-body`, and `--font-ui` in `src/index.css`.

The wordmark pairs a light "Uni" with a bold "Growth", so keep a wide weight range available.

## Animation
- Original UniGrowth animations only, themed on growth (arrows, rising bars, path from student to university).
- The reference site uses Lottie, which is a vector format. Prefer **Lottie, animated SVG or CSS** over GIF: crisp at any size, transparent, and far smaller.
- GIF only if a specific place truly needs it.
- Respect `prefers-reduced-motion` by turning animation off.
- Keep animations light so the mobile experience stays fast.

## Multi-language
- Languages: **EN, AZ, RU**. All are left-to-right, so no right-to-left support is needed.
- Design for **text expansion**. Russian and Azerbaijani can be much longer than English: no fixed-width buttons or tight labels.
- Do not bake text into images or SVGs (the logo wordmark is the only exception).
- Include a language switcher in the header.

## UI rules
- Use pill buttons (`border-radius: 999px`) and rounded cards/sections (`--radius: 20px`, `--radius-lg: 32px`).
- Alternate white sections with soft green tinted blocks (`--green-50`) and high-contrast dark green callouts (`--green-800`).
- Hero artwork (`src/components/HeroArt.jsx`) is a pure SVG + CSS animation and disables motion under `prefers-reduced-motion: reduce`.
