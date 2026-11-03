# DESIGN.md

## Palette

Extracted from fxtmng.com (redirects to fxtm.com/en/) on 29 September 2026. Most values are CSS variables in `/_next/static/css/5ecf8d757da57c04.css`. No FXTM logos, logo files or wordmark treatments are used anywhere.

| Token | Value | Source |
|---|---|---|
| brand-orange | #FF4521 | `--vivid-orange-color` |
| brand-orange-hover | #FF5A3A | Derived (FXTM defines no hover hex). Lighter so dark button text keeps contrast. |
| brand-black | #16171F | `--raisin-black-color` |
| surface-1 | #191919 | `--black-color` |
| surface-2 | #262626 | FXTM stylesheet 4df0e95f6f0001cd.css |
| border | #333333 | FXTM stylesheets (`#333`) |
| border-strong | #767783 | `--tint-60-color`. Input outlines only (needs 3:1 against the surface). |
| text-primary | #FFFFFF | `--white-color` |
| text-muted | #A3A5AC | `--tint-40-color` |
| white | #FFFFFF | `--white-color` |
| error | #FF8A80 | Not an FXTM value. Soft red for errors on dark surfaces. |

### Light section tokens

| Token | Value | Source |
|---|---|---|
| light-1 | #F8F8F9 | `--tint-color` |
| light-border | #E8E8EA | `--tint-10-color` |
| ink | #16171F | `--raisin-black-color`. Headings and input text on light. |
| ink-muted | #484A59 | `--tint-80-color`. Body text on light. |
| ink-placeholder | #666666 | FXTM stylesheets (`#666`). Placeholders on white. |
| brand-orange-deep | #DE2400 | Derived from brand-orange (same hue, darker). Orange text on light backgrounds only. |
| error-light | #B3261E | Not an FXTM value. Inline errors on the white form card. |

### Contrast (WCAG 2.x)

| Pair | Ratio | Use |
|---|---|---|
| brand-orange on brand-black | 5.21 | Eyebrows, highlights. AA pass. |
| brand-orange on surface-1 | 5.13 | AA pass. |
| brand-orange on surface-2 | 4.41 | Icons and focus rings only (non-text, 3:1). Never body text. |
| brand-black on brand-orange | 5.21 | Primary button label. AA pass. |
| brand-black on brand-orange-hover | 5.76 | Button hover. AA pass. |
| white on brand-orange | 3.43 | FAILS for body text. Do not use white text on orange. |
| text-muted on brand-black | 7.25 | AA pass. |
| text-muted on surface-2 | 6.15 | AA pass. |
| error on brand-black / surface-1 | 7.8 / 7.7 | AA pass. |
| border-strong on brand-black | 4.03 | Input boundary, 3:1 pass. |
| border-strong on white | 4.43 | Input boundary on the form card, 3:1 pass. |
| brand-orange on white / light-1 | 3.43 / 3.23 | Accent lines, icons, focus rings only. FAILS as text. |
| brand-orange-deep on white / light-1 | 4.82 / 4.54 | Eyebrows on light sections. AA pass. |
| ink on white / light-1 | 17.85 / 16.82 | Headings, input text. AA pass. |
| ink-muted on white / light-1 | 8.75 / 8.25 | Body text on light. AA pass. |
| ink-placeholder on white | 5.74 | Placeholders. AA pass. |
| error-light on white | 6.54 | Form errors. AA pass. |

## Rules

- Dark and light sandwich. Sections alternate dark and light so the page never feels heavy, and white elements pop against dark bands:
  - Hero (dark, brand-black) with the form on a **white card** with a 3px brand-orange top accent. Detail strip stays dark (surface-1) as part of the hero block.
  - What to expect: light (light-1 band, white cards).
  - Beyond the charts: dark (brand-black).
  - Who it's for: light (white band, light-1 cards), with the prizes as a **dark card** inside the same white band.
  - Final push (surface-1) and footer (brand-black): dark.
  - Confirmation view: dark, with a white summary card.
- On dark: white headings, text-muted for secondary text. On light: ink headings, ink-muted body text, brand-orange-deep for eyebrow text.
- Native controls inside white cards use `color-scheme: light`.
- brand-orange for primary buttons, key highlights, eyebrow labels and thin accent lines only. Orange is an accent, never a large background block (the primary button is the only exception).
- Premium, restrained, institutional. No gradients except one very subtle radial glow behind the hero. No glassmorphism, no neon, no stock imagery, no emojis.
- Max content width 1200px. Side gutter 16px on mobile, 24px from tablet up.
- Section spacing: py-16 mobile, py-24 desktop.
- Typography: Inter Variable only (self hosted, latin subset, font-display swap). Headings semibold or bold with tight tracking. Body line-height 1.6. H1 is `clamp(2.25rem, 1.6rem + 3vw, 3.75rem)`.
- Radius: 12px cards, 10px inputs and buttons. 1px borders in the border token (dark) or light-border token (light).
- Mobile first. No horizontal scroll at 320px.
- Accessibility: visible labels on every input, brand-orange focus rings, semantic landmarks, exactly one H1.
- Icons: hand written inline line SVGs, max 6, stroke `currentColor`, 1.75 stroke width.

## Layout

1. Hero with form. Desktop two columns (copy left, form card right). Mobile stacked with the form directly under the chips.
2. Detail strip: 4 items, 2x2 on mobile.
3. What to expect: 5 cards, 1 / 2 / 3 columns.
4. Beyond the charts: 4 compact items.
5. Who it's for: 2 cards.
6. Prizes: dark card with thin orange left accent, inside the white Who it's for band.
7. Final push with CTA that scrolls to the form and focuses Full name.
8. Footer with event line, risk warning and Privacy Policy link.
9. Confirmation view (hash `#registered`).
