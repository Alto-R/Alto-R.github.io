# 004 — Fix PillNav load animation: no `scale(0)`, no `width` animation

- **Status**: TODO
- **Commit**: 0382d01
- **Severity**: MEDIUM
- **Category**: Physicality & origin / Performance
- **Estimated scope**: 1 file (`src/components/PillNav.jsx`), 2 GSAP set/to pairs
- **Depends on**: none (GSAP inline, doesn't use CSS tokens)

## Problem

The first-load nav intro has two craft issues:

1. **`scale(0)`** — the language switcher pops in from nothing. Nothing in the
   physical world appears from zero size; start from `scale(0.9)` + opacity.
2. **Animating `width: 0 → auto`** — `width` is a layout property; this animates
   layout for 0.6s and `width: auto` is not cleanly interpolatable, so the reveal
   is janky. A `clip-path` reveal gives the same left-to-right unfurl with no layout.

```jsx
/* src/components/PillNav.jsx:93-115 — current */
if (initialLoadAnimation && !hasAnimated.current) {
  hasAnimated.current = true;
  const navItems = navItemsRef.current;
  const lang = langRef.current;

  if (lang) {
    gsap.set(lang, { scale: 0 });
    gsap.to(lang, {
      scale: 1,
      duration: 0.6,
      ease
    });
  }

  if (navItems) {
    gsap.set(navItems, { width: 0, overflow: 'hidden' });
    gsap.to(navItems, {
      width: 'auto',
      duration: 0.6,
      ease
    });
  }
}
```

The incoming `ease` prop defaults to `'power3.easeOut'` (`src/components/PillNav.jsx:8`),
which is already a strong ease-out — keep it.

## Target

```jsx
/* target — src/components/PillNav.jsx, same block */
if (initialLoadAnimation && !hasAnimated.current) {
  hasAnimated.current = true;
  const navItems = navItemsRef.current;
  const lang = langRef.current;

  if (lang) {
    gsap.set(lang, { scale: 0.9, opacity: 0 });
    gsap.to(lang, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease
    });
  }

  if (navItems) {
    // 从左到右揭示，用 clip-path 代替 width 动画（避免 layout 抖动）
    gsap.set(navItems, { clipPath: 'inset(0 100% 0 0)', opacity: 0 });
    gsap.to(navItems, {
      clipPath: 'inset(0 0% 0 0)',
      opacity: 1,
      duration: 0.5,
      ease
    });
  }
}
```

## Repo conventions to follow

- The file already uses `gsap.set` / `gsap.to` with the `ease` prop and inline
  duration numbers (see `src/components/PillNav.jsx:75-113,155-159`) — match that
  style; do not introduce CSS tokens here (this is JS/GSAP land).
- `scaleY` / `clipPath` are already used elsewhere in GSAP calls in this file
  (`scaleY` at `:64,168`), so `clipPath` fits the existing idiom.

## Steps

1. `src/components/PillNav.jsx:99-104` — change the `lang` `gsap.set`/`gsap.to`:
   set `{ scale: 0.9, opacity: 0 }`, animate to `{ scale: 1, opacity: 1, duration: 0.5, ease }`.
2. `src/components/PillNav.jsx:108-113` — change the `navItems` `gsap.set`/`gsap.to`:
   set `{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }`, animate to
   `{ clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.5, ease }`. Remove the
   `overflow: 'hidden'` set and the `width` animation entirely.

## Boundaries

- Do NOT touch the hover pill timelines (`handleEnter`/`handleLeave`, `:123-143`),
  the mobile menu animation (`:145-192`), or the hamburger lines.
- Do NOT change the JSX/markup or the `glassStyle`/`pillStyle` objects.
- Do NOT add dependencies.
- This animation runs once on first mount (`hasAnimated` guard) — do not change
  that guard.
- If the `initialLoadAnimation` block doesn't match the excerpt (drift since
  `0382d01`), STOP and report.

## Verification

- **Mechanical**: `npm run build` succeeds; `npm run lint` passes.
- **Feel check**: `npm run dev`, hard-reload the page (the nav intro runs once):
  - The language switcher fades + scales up from ~90% (not from a dot); no
    "appears from nothing" pop.
  - The nav pill bar unfurls left→right smoothly with no width jitter / reflow of
    the pills' text.
  - DevTools → Performance → record the first ~1s of load: the nav intro shows no
    per-frame "Layout" on `navItemsRef` (before, the `width` tween logged layout
    every frame).
  - Slow it down: temporarily set both `duration: 0.5` to `2` and confirm the
    clip reveal and the scale/opacity are clean end-to-end, then revert to `0.5`.
- **Done when**: no `scale(0)` and no `width` animation remain in the load block,
  and the intro reads as a smooth unfurl + fade-in.
