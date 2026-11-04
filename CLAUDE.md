# CLAUDE.md

Single page registration funnel for **Traders Hangout with FXTM, Abuja** (Saturday, 28 November 2026, 10:00 AM, NAF Conference Centre, Ahmadu Bello Way, Abuja).

## Stack

Vite + React + TypeScript + Tailwind CSS 3. No UI kits, animation libraries, icon packs or router. Two views (landing, confirmation) switched with React state plus the `#registered` hash.

## Commands

- `npm run dev` for local development
- `npm run build` for type check and production build into `dist/`
- `npm run preview` to serve the build

## Spec files (source of truth)

- `COPY.md`: every word on the page. `src/content.ts` mirrors it exactly. Never rewrite, improve or add copy.
- `DESIGN.md`: palette tokens, contrast table, layout and style rules.

## Form

Fields, in order: Full name (required, min 3 chars, at least two words), Email address (required, valid email), Phone number (required, Nigerian: 070/080/081/090/091 with 11 digits, or +234/234 plus 10 digits; spaces, dashes, brackets and dots stripped; normalised to `+234XXXXXXXXXX`), Trading experience (required select, 3 options), Terms checkbox (required, unchecked by default, directly above the submit button, 44px min tap target). No WhatsApp field. Hidden honeypot `hp_website_confirm` (off screen, not `display: none`); a filled value only counts as a bot when the form is submitted less than 2 seconds after page load, otherwise the lead is sent. Submit button id `fxtm-register-submit`.

Payload: timestamp, fullName, email, phone (normalised), experienceLevel, consent (true), consentText (exact checkbox label), consentTimestamp (ISO, captured at submit), source, event, eventDate, utm_source, utm_medium, utm_campaign, utm_content, utm_term, fbclid, pageUrl, userAgent.

## Env vars (build time, see `.env.example`)

- `VITE_N8N_WEBHOOK_URL`: form POST target. If empty, the POST is skipped with a console warning.
- `VITE_TELEGRAM_BOT_URL`: confirmation button and auto redirect target. Falls back to `https://t.me/PLACEHOLDER_SUPPORT_HANDLE`.
- `VITE_META_PIXEL_ID`: if set, Meta Pixel loads after first paint and fires PageView only. The Lead event is configured in Meta's Event Setup Tool on `#fxtm-register-submit`; never fire Lead from code.

## Hard rules

- No em dashes or en dashes anywhere in `src/`, `index.html` or the spec files.
- No emojis.
- Never use the word "bot" in user facing copy. Say "support handle".
- No money amounts, pricing, profits or guaranteed returns.
- No FXTM logos, logo files or logo like wordmarks.
- No invented stats, testimonials or speakers. No lorem ipsum.
- Performance budget: total JS under 70 KB gzipped, no images above the fold, no external requests on load except the optional Meta Pixel and the self hosted font.

## Code map

- `src/content.ts`: copy (mirror of COPY.md)
- `src/lib/validation.ts`: name, email and Nigerian phone validation, phone normalisation to `+234XXXXXXXXXX`
- `src/lib/attribution.ts`: UTM and fbclid capture, persisted in sessionStorage
- `src/lib/submit.ts`: webhook POST (keepalive, 6s timeout, one retry, never blocks the lead)
- `src/lib/pixel.ts`: optional Meta Pixel
- `src/components/`: page sections, form, confirmation view, icons
