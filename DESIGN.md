# Design system

Recorded from the built site. Tokens live in `src/app/globals.css` (`@theme` block); content lives in `src/content/site.ts`.

## World

A documentary about one engineer, where the visitor holds the light. The page moves through three colour worlds: a dark stage (hero, case files, reel, "One last thing"), ivory paper (the subject, toolkit, collaborate) and a yellow field (the evidence). Poster-scale grotesque set against a serif italic, film grain over everything.

## Colour

| Token | Value | Role |
|---|---|---|
| `ink` | `#0b0a09` | Page ground |
| `ink-2` / `ink-3` | `#141210` / `#201d1a` | Lit panels, scrollbar thumb |
| `ivory` | `#efe8d8` | Primary type |
| `ivory-2` | `#bdb5a4` | Body copy on dark |
| `ivory-3` | `#8f887a` | Captions, labels |
| `yellow` | `#f6d21c` | Field colour (hero block, lit figures), focus ring, active nav, primary CTA |
| `red` | `#ef4a31` | Hand-drawn annotations, REC mark, CyberShield accent |
| `blue` | `#6b93ff` | Diagrams only (Industrial IoT accent) |
| neon | `#cfff04` | Footer marquee hover only |
| `paper` | `#eae8e2` | Collaborate section, the CyberShield document |

Rules: yellow owns regions rather than decorating; red is always something drawn or stamped; blue never leaves a diagram. Hairlines are ivory at 16% (`--rule`) and 34% (`--rule-strong`).

## Type

| Voice | Family | Use |
|---|---|---|
| Display | Archivo Variable, weight 900, width 112% | Headings, names, figures. `.display`; `.display--tight` (78%) for long titles; `.outline` for stroked type |
| Reading display | Archivo Variable, weight 500–700, width 84–90% | Lead paragraphs, summaries, job titles, skill items |
| Text | Schibsted Grotesk Variable | Body copy, 17px, line-height 1.55, measure ≤ 46ch |
| Serif | Instrument Serif italic | The second half of headings ("The *subject.*", "What I build *with.*"), the closing line, the overlay heading. `.serif` |
| Mono | Martian Mono Variable, width 88%, 11–12.5px, tracked 0.08em, uppercase | Captions, labels, timecode, stacks. `.mono`, `.mono--lg` |

Fonts are bundled through `@fontsource-variable/*`; nothing is fetched from a font CDN. Outlined type paints its fill over a doubled stroke so variable-font contour overlaps do not show.

## Themes

Sections set `.theme-paper` or `.theme-yellow`, which swap `--fg`, `--fg-2`, `--fg-3`, `--line`, `--line-strong` and `--hl`. Components read those variables, so the same markup works on any ground. The nav is a solid ink bar on every ground.

## Layout

- Gutter `--gutter: clamp(1.25rem, 4vw, 4rem)`; sections `clamp(5rem, 13vh, 10rem)` apart.
- `.chapter`: one poster heading and a right-aligned mono side note sharing a strong rule. No labels above headings.
- Case studies use a 12-column grid with three different arrangements (`case--a/b/c`); all collapse to one column under 900px.
- Breakpoint: 900px. Below it the nav becomes a sheet, the reel stacks, grids go single column.

## Components

- **Flashlight** (`Flashlight.tsx`): dark base layer plus a lit duplicate behind a radial mask. Props: `radius`, `core`, `follow`, `rest`, `idle`. Position is written to `--fl-x/--fl-y` from a rAF loop. The nav's lights toggle opens the beam over the whole scene. Used in the hero and, without the ambient bloom (`flashlight--quiet`), over the TRACE and Industrial IoT diagrams.
- **Annotations**: yellow rotated tag with drawn arrow, red hand-drawn ellipse, outlined and filled chips. Lit layer only.
- **Diagrams** (`Diagrams.tsx`): authored SVG schematics, 1px strokes, mono labels, one accent each. Captioned as figures and labelled as schematics.
- **Card stack** (`AlsoOnFile.tsx`): secondary projects as sticky cards in three tones (ink, paper, yellow). Each card sticks a little lower than the last; GSAP scales and dims a card as the next slides over it. Sticky positioning does the layout, so it behaves the same on touch and desktop.
- **Experience timeline** (`Sections.tsx`): dark section, centred title with an offset yellow outline echo, a rail that fills with yellow light on scroll, glowing nodes, serif years and roles, roman-numeral points, outlined tags.
- **Name marquee** (footer): outlined name repeating right to left on a 34s loop; hovered names turn neon `#cfff04` with a glow, and the loop pauses on hover. Static with reduced motion.
- **Pill** (`Collaborate.tsx`): glossy black pill, inset highlights, layered soft shadows, light sweep on hover.
- **Hand and strings**: inline SVG hand in ink with a black sleeve; five strings of different weights computed each frame from the fist to the button.
- **Word burst** (`Collaborate.tsx`): six word tags spring out from behind the pill on click (Framer Motion), then the pill grows into the overlay. Skipped with reduced motion.
- **Certification tiles**: ink tiles on the yellow field, issuer in yellow mono.
- **Contact overlay** (`ContactOverlay.tsx`): modal dialog that grows from the button; rows are full-width links.
- **Link** (`.link`): underline that retracts on hover, arrow nudges up and right.

## Motion

- GSAP + ScrollTrigger: hero intro timeline, hero parallax, chapter heading wipes, word-by-word lead paragraph, diagram line drawing, case title wipes (a different direction per case), the reel, the collaborate entrance, string drawing and the idle pull.
- Framer Motion: nav marker, lights knob, mobile sheet, pill hover, tilt and press, overlay and its rows.
- The two never animate the same property on the same element: GSAP moves the pill's wrapper, Framer moves the pill.
- Easing is exponential ease-out; elastic is reserved for the tug on the button.
- Reduced motion: lights start on, content is visible by default, no parallax, no pinning, strings drawn statically.

## Accessibility

Skip link, one `h1`, landmarks per section, visible yellow focus ring (ink on paper), 44px targets in the nav, dialog with focus trap, Escape and focus return. The lit flashlight layer is `aria-hidden`; everything it shows as text also exists elsewhere on the page.

## Asset provenance

- `public/portrait/harish-cutout*.webp`: cut out from Harish's own studio photo by `scripts/make-cutout.mjs` (border flood fill of the white backdrop, feathered edge). Not generated, face unaltered.
- All diagrams and the hand illustration are hand-authored SVG in the repo.
