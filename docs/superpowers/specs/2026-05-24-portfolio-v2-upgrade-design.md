# Portfolio V2 Upgrade — Design Spec

## Overview

Upgrade the lifeline-portfolio from its current state (GSAP animations, basic scroll, flat grids) to a premium interactive experience with smooth scroll, bento layouts, kinetic typography, grain textures, and cursor-driven micro-interactions.

**Approach**: Incremental refactor. Existing component structure stays. Animations and layouts are upgraded in place, with shared utilities extracted where needed (cursor provider, smooth scroll provider, split-text utility).

## 1. Smooth Scroll & Pinning

### Lenis Integration

A `SmoothScrollProvider` component wraps the app at the layout level. It initializes Lenis with momentum-based smooth scrolling and syncs with GSAP ScrollTrigger.

**Sync mechanism**: `lenis.on('scroll', ScrollTrigger.update)` plus a shared RAF loop where Lenis and GSAP tick together.

**Config**:
- `lerp`: 0.1 (smooth but responsive)
- `duration`: 1.2
- `smoothWheel`: true
- `smoothTouch`: false (native scroll on mobile for performance)

### Pinning Strategy (Hybrid)

| Section | Behavior |
|---------|----------|
| Hero | Pins briefly (~1s) after entrance animations complete, then releases |
| Foundation | Flows naturally, scroll-triggered reveals |
| Early Discoveries | Flows naturally, scroll-triggered reveals |
| Ascent | Pins while bento grid scrolls horizontally to reveal all projects, then unpins |
| Current Frontier | Flows naturally, staggered bento entrance |
| Connect | Flows naturally |

### Scroll-Triggered Parallax

Non-pinned sections use depth-based parallax:
- Background orbs/decorative elements: `speed: -0.3` to `-0.5`
- Grid patterns: `speed: -0.1`
- Content: no parallax (stays grounded)

## 2. Grain/Noise Texture

A `NoiseOverlay` component rendered once in the root layout.

**Implementation**:
- Fixed position, full viewport, `pointer-events: none`, `z-index: 9999`
- Inline SVG `<filter>` using `feTurbulence` (type: fractalNoise, baseFrequency: 0.65, numOctaves: 4)
- Applied via CSS `filter: url(#noise)` on a full-screen div
- Opacity: 0.03-0.05 (barely visible, adds texture)
- Animated: noise seed shifts every ~100ms via a requestAnimationFrame loop for film-grain movement
- Composited on its own GPU layer via `will-change: transform`

## 3. Bento Grid Layouts

### Ascent Section — Projects Bento

Replaces the current 3-column equal grid with a CSS Grid using `grid-template-columns` and `span` variants.

**Desktop layout (4 columns)**:
- Featured projects: `grid-column: span 2` and/or `grid-row: span 2`
- Standard projects: `1x1`
- Layout creates visual hierarchy — larger tiles draw attention to key work

**Responsive**:
- `lg` (1024px+): 4 columns
- `md` (768px+): 2 columns, featured spans full width
- Mobile: Single column stack

**Pinned horizontal scroll**: On desktop, the Ascent bento is wider than the viewport. The section pins and the grid translates horizontally as the user scrolls, revealing overflow projects. On mobile, this falls back to a vertical stack (no horizontal scroll).

**Card anatomy**:
- Project image (top, with gradient overlay)
- Title + tech stack
- Impact metric badge
- GitHub link icon (top-right)
- Hover: glow-follow effect + parallax tilt

### Current Frontier Section — Mixed Bento

Replaces the tab-based layout with a single bento grid showing all content simultaneously.

**Card types**:
- **Role card** (2x2): Glassmorphic background (`bg-white/5 backdrop-blur`), current role details, key projects list, subtle inner glow
- **Tech cards** (1x1): Icon + technology name, hover reveals proficiency bar
- **Focus cards** (mixed 1x1 and 2x1): Gradient borders, descriptive text appears on hover

**Desktop layout (4 columns)**:
- Role card occupies top-left 2x2
- Tech cards fill remaining slots
- Focus cards form the bottom row with one wide (2x1) card

**Responsive**: Same breakpoint strategy as Ascent.

## 4. Kinetic Typography

### SplitText Utility

A reusable utility that wraps each character of a text node in individual `<span>` elements with appropriate `aria-label` on the parent for accessibility (screen readers see the full text, visual users see the animation).

### Per-Section Header Animations

| Section | Style | Ease |
|---------|-------|------|
| Foundation | Characters fade up from +30px, slight rotateZ(5deg), sequential L→R stagger | power3.out |
| Early Discoveries | Characters scale from 0, elastic ease, randomized stagger order | elastic.out(1, 0.5) |
| The Ascent | Characters slide from varying Y offsets (-50 to +50), momentum overshoot | back.out(1.7) |
| Current Frontier | Characters morph font-weight 100→700 sequentially | power2.inOut |
| Let's Connect | Characters rotate in from rotateX(-90deg) | power3.out |

**Gradient word animation**: The highlighted word (e.g., "Ascent") gets a secondary `background-position` animation that sweeps the gradient across after the character reveal completes.

**Trigger**: `ScrollTrigger` with `once: true` — plays once on viewport entry, does not replay on scroll-back.

### Variable Font

**Font**: Space Grotesk (Google Fonts, variable, weight axis 300-700).

Loaded via `next/font/google` for automatic optimization. Replaces the current font stack for headings. Body text can remain with the current font or also switch to Space Grotesk at lighter weights.

## 5. Micro-Interactions

### Custom Cursor — `CursorProvider`

Rendered at the layout level. Two elements: dot (8px) + ring (32px).

**States**:
| Context | Dot | Ring |
|---------|-----|------|
| Default | 8px, white | 32px, white/20 border |
| Interactive hover | 4px | 48px, gradient border (purple→pink→cyan) |
| Text hover | 8px | Squishes to 24px wide x 4px tall (underline shape) |
| Click | Both scale to 0.8 briefly | Spring back with elastic ease |

**Tracking**: `mousemove` listener updates target position. Dot follows with `lerp: 0.9` (snappy). Ring follows with `lerp: 0.15` (trails). Uses GSAP `quickTo` for performance.

**Touch devices**: Component returns null. Falls back to native cursor. Detection via `window.matchMedia('(pointer: coarse)')`.

### Magnetic Buttons

Applied to all CTA buttons and icon links.

**Behavior**:
- Detect cursor within 40px proximity of button center
- Button translates toward cursor (max 8px displacement)
- On mouse leave: elastic spring back (`ease: elastic.out(1, 0.3)`)
- Background gradient subtly shifts toward cursor direction on hover

**Implementation**: A `useMagnetic` hook that attaches mousemove/mouseleave listeners and returns a ref to attach to the element.

### Card Glow-Follow

Applied to all bento cards and project cards.

**Behavior**:
- On hover: a radial gradient appears at cursor position relative to card
- Color: `rgba(168, 85, 247, 0.15)` (purple, subtle)
- Radius: 200px, soft falloff
- Fades in over 300ms on enter, fades out on leave
- Rendered as a pseudo-element (`::before`) positioned absolutely within the card

**Implementation**: A `useGlowFollow` hook or inline logic within card components.

### Parallax Tilt (Bento Cards)

Replaces `react-parallax-tilt` dependency with custom GSAP implementation.

**Behavior**:
- Track cursor position relative to card center
- Apply `rotateX` and `rotateY` (max 8deg) with `perspective: 1000px`
- Add `translateZ(20px)` on hover for depth pop
- Smooth interpolation via GSAP (not CSS transitions)
- Reset to flat on mouse leave with spring ease

## 6. Dependencies

### Add
- `lenis` (smooth scroll, ~8KB gzipped)

### Remove
- `react-parallax-tilt` (replaced by custom GSAP tilt)

### Keep
- `gsap` (already installed, add ScrollTrigger plugin usage everywhere)
- `next` / `react` / `tailwindcss` (unchanged)

## 7. Component Architecture

```
layout.tsx
├── SmoothScrollProvider (Lenis init + GSAP sync)
├── CursorProvider (custom cursor rendering)
├── NoiseOverlay (grain texture)
└── {children}
    └── page.tsx
        ├── Navbar
        ├── HeroSection (pinned briefly)
        ├── FoundationSection (flows, kinetic header)
        ├── EarlyDiscoveriesSection (flows, kinetic header)
        ├── AscentSection (pinned horizontal scroll, bento grid)
        ├── CurrentFrontierSection (flows, bento grid, kinetic header)
        └── ConnectSection (flows, kinetic header)
```

### Shared Utilities
- `hooks/useSmoothScroll.ts` — access Lenis instance from any component
- `hooks/useMagnetic.ts` — magnetic button behavior
- `hooks/useGlowFollow.ts` — cursor-relative glow on cards
- `hooks/useParallaxTilt.ts` — GSAP-based tilt replacing react-parallax-tilt
- `utils/splitText.ts` — character splitting for kinetic typography
- `components/SmoothScrollProvider.tsx` — Lenis wrapper
- `components/CursorProvider.tsx` — custom cursor
- `components/NoiseOverlay.tsx` — grain texture

## 8. Performance Considerations

- Lenis `smoothTouch: false` — native scroll on mobile
- Noise overlay on its own composited layer — no repaint on scroll
- Custom cursor uses `quickTo` — avoids per-frame state updates in React
- ScrollTrigger animations use `will-change: transform` only during animation
- Horizontal scroll in Ascent uses CSS `transform: translateX()` (GPU composited)
- Space Grotesk loaded via `next/font` — no layout shift, subset to latin
- All scroll listeners removed — replaced by ScrollTrigger (handles throttling internally)

## 9. Accessibility

- `SplitText` preserves `aria-label` with full text on parent element
- Custom cursor is purely decorative — native cursor functionality preserved for keyboard/screen reader users
- Pinned sections still scrollable via keyboard (ScrollTrigger handles this)
- `prefers-reduced-motion`: disable Lenis smooth scroll, disable kinetic type animations, disable parallax tilt, keep content visible without animation
- All interactive elements remain focusable and keyboard-navigable
- Noise overlay has `aria-hidden="true"`

## 10. Browser Support

- Modern browsers (Chrome 90+, Firefox 90+, Safari 15+, Edge 90+)
- Lenis handles cross-browser scroll normalization
- CSS Grid with `span` is supported in all target browsers
- Variable fonts supported in all target browsers
- Fallback: if Lenis fails to init, native scroll works fine (progressive enhancement)
