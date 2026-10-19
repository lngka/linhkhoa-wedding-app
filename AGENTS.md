# AGENTS.md

Mobile-first interactive wedding invitation for **Công Khoa & Phương Linh** — 22.12.2026, Flamingo Cát Bà Resort, Hải Phòng. Visual reference: `stained-glass-hero(1).mp4` (stained-glass invitation site), reskinned to navy `#1F2F6B` / gold `#B8894A` / cream `#F9EFEA` with a Cát Bà sea theme. The cream has a faint blush tint on purpose — the owner wants "a little pink", nothing more. A full wine/pink reskin was tried and rejected; keep navy as the main color. Source cards: `invitation.png`, `savethedate.png`. Original plan: `~/.cursor/plans/stained_glass_wedding_site_b21885dc.plan.md`. No RSVP by design. All UI text is Vietnamese.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` → static site in `dist/` (`base: './'`, deployable to any static host)
- `npm run lint` — oxlint
- `npm run assets` — regenerate `public/assets/*.webp` + `og.jpg` from AI source art in `art/` (sharp)

Stack: Vite 8, React 19, TypeScript, Tailwind v4 (`@tailwindcss/vite`, tokens in `@theme` in `src/index.css`), GSAP + ScrollTrigger, Lenis.

## Layout

- `src/content.ts` — **all** text, dates, links, section toggles (`sections`), music. Edit content here, not in components. Use `asset('x.webp')` for public asset URLs (respects `BASE_URL`).
- `src/sections/` — one component per section, rendered in order by `src/App.tsx`. `Gate` is a fixed overlay that locks scroll until tapped.
- `src/fx/` — `useScrollAnim.ts` (Lenis, `useReveal`, `scrollLock`, `reducedMotion`), `GoldDust.tsx` (canvas particles + `burst()` handle), `GlassShimmer.tsx` (light sweep masked to an image's alpha), `Ornaments.tsx` (SVG hearts, sprigs, seal, hourglass, icons, `Heading`).
- `src/fx/MusicControl.tsx` — background music (`public/assets/nocturne-waltz.mp3`, set via `content.music`; `null` disables). Starts on the Gate tap, loops; floating speaker button opens mute + volume.
- `src/lib/calendar.ts` — Google Calendar URL + `.ics` download.
- `scripts/build-assets.mjs` — splits doors, masks arch, flood-fills transparent backgrounds (oval also gets its center punched out), builds OG image.
## Conventions

- Scroll reveals: add `data-reveal="up|fade|scale|left|right|blur"` (+ optional `data-delay`) and call `useReveal(ref)` in the section.
- Fonts (Google, Vietnamese subsets): `font-script` Great Vibes, `font-serif` Cormorant Garamond, `font-sc` Cormorant SC. Body uses lining numerals globally.
- Section headings: use `<Heading title subtitle />`.

## Gotchas (learned the hard way)

- **Reduced motion is intentionally ignored** (owner's decision): many guests have Windows "Animation effects" off just for performance, and the door opening is the signature moment. Don't add `prefers-reduced-motion` handling back without asking.
- **GSAP rounds px**: never tween `strokeDashoffset` over 0–1; Program uses `pathLength=1000`.
- **Program SVG** is drawn at real pixel width (ResizeObserver). Don't reintroduce `preserveAspectRatio="none"` + `vector-effect` — dashes break in Chrome.
- **ScrollTrigger positions** go stale as lazy images load; `useSmoothScroll` refreshes on body height change. Keep it.
- **Scratch canvas** sizes from `offsetWidth/offsetHeight` (not `getBoundingClientRect`) because the reveal animation scales the parent. Inner hole of `oval.webp` is in `INNER` (percent of image box); re-measure if the oval art changes.
- **Browser testing**: with Lenis active, `window.scrollTo` gets overridden — scroll via Lenis instead (temporarily expose it on `window` in DEV; remove afterwards).

## Open TODOs (marked `TẠM` in `content.ts`)

- Real wedding photo for scratch reveal (currently AI placeholder `couple.webp`).
- Confirm program items 17:30 and 19:30 (only 15:30 arrival and 16:45 ceremony + buffet come from the card).
- Gifts: bank names, account numbers, QR images — or disable the section.
- Travel route text and stay dates (21–23.12.2026) need verification.
- Set `VITE_SITE_URL` in `.env` after deploying so OG previews work on Zalo/Messenger.
- Not a git repo yet.
