# 006 — Make translucent surfaces read as real material (glass depth)

- **Status**: TODO
- **Commit**: 0382d01
- **Severity**: HIGH (biggest visual "Apple" jump)
- **Category**: apple-design §12 Materials & depth
- **Estimated scope**: 3 surfaces across `App.css`, `Dock.css`, `PillNav.jsx`
- **Depends on**: none

## Problem

Three key surfaces claim to be glass but aren't:

1. **`.hero-content`** floats over the animated particle city yet has
   `backdrop-filter: blur(0.1px)` — effectively no blur. It reads as a flat dark
   box, not a material.
   ```css
   /* src/App.css:125-133 — current */
   .hero-content {
     pointer-events: none;
     background: rgba(0, 0, 0, 0.6);
     padding: 1.5rem 2rem;
     border-radius: 8px;
     backdrop-filter: blur(0.1px);
     width: fit-content;
     max-width: 90%;
   }
   ```

2. **The Dock** sets an opaque background, so its `blur()` does nothing.
   ```css
   /* src/components/Dock.css:8-21 — current */
   .dock {
     ...
     background: rgb(40, 40, 40);          /* opaque → blur below is dead */
     backdrop-filter: blur(10px);
     border: 1px solid rgba(255, 255, 255, 0.08);
     box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
   }
   /* src/components/Dock.css:32 */
   .dock-icon { ...; background: rgb(60, 60, 60); }   /* opaque icons */
   ```

3. **PillNav glass** is close but lacks vibrancy (`saturate`) and a light-catching
   top edge.
   ```jsx
   /* src/components/PillNav.jsx:200-206 — current */
   const glassStyle = {
     background: 'rgba(255, 255, 255, 0.05)',
     backdropFilter: 'blur(12px)',
     WebkitBackdropFilter: 'blur(12px)',
     border: '1px solid rgba(255, 255, 255, 0.1)',
     boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)'
   };
   ```

## Target

Apple's rule: bigger surfaces read thicker (stronger blur + deeper shadow),
`saturate(180%)` gives vibrancy, and a bright top edge = light catching the glass.

```css
/* target — src/App.css .hero-content */
.hero-content {
  pointer-events: none;
  background: rgba(0, 0, 0, 0.5);
  padding: 1.5rem 2rem;
  border-radius: 12px;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top-color: rgba(255, 255, 255, 0.16);   /* light catching the top edge */
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
  width: fit-content;
  max-width: 90%;
}
```

```css
/* target — src/components/Dock.css .dock */
.dock {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  height: 68px;
  padding: 0 1.25rem;
  padding-bottom: 10px;
  background: rgba(40, 40, 40, 0.55);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-top-color: rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  overflow: visible;
}

/* target — src/components/Dock.css .dock-icon (semi-translucent, not opaque slab) */
.dock-icon { ...; background: rgba(255, 255, 255, 0.10); }
```

```jsx
/* target — src/components/PillNav.jsx glassStyle */
const glassStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)'
};
```

## Repo conventions to follow

- The repo already writes both `backdrop-filter` and `-webkit-backdrop-filter`
  in PillNav — keep pairing them for Safari on every surface you touch.
- `.dock-icon` has two color overrides at `src/components/Dock.css:66-74`
  (`.bg-black/10`, `.bg-white/10` → `rgb(60,60,60)`). Update those two to
  `rgba(255, 255, 255, 0.10)` as well, or the icons stay opaque.

## Steps

1. `src/App.css:125-133` — replace `.hero-content` with the Target block (blur 20px
   + saturate, radius 12px, bright top border, deeper shadow).
2. `src/components/Dock.css:8-21` — replace `.dock` background/backdrop/border with
   the Target values (translucent bg, blur 24px saturate, bright top edge).
3. `src/components/Dock.css:32` — change `.dock-icon` background to
   `rgba(255, 255, 255, 0.10)`.
4. `src/components/Dock.css:66-74` — change both override rules' color from
   `rgb(60, 60, 60)` to `rgba(255, 255, 255, 0.10)`.
5. `src/components/PillNav.jsx:200-206` — replace `glassStyle` with the Target
   object (add `saturate(180%)`, `borderTop`, deeper shadow).

## Boundaries

- Do NOT touch the modal (`.modal-content`, `src/pages/Publications.css:47`) — a
  near-opaque modal paired with a dimming scrim is the correct Apple "dim to
  focus" pattern; leave it.
- Do NOT add blur to the plain cards on the solid `#050505` background
  (`.pub-card`, `.project-card`) — there's nothing behind them to blur.
- Do NOT change layout/size/positioning — material properties only.
- Do NOT add dependencies.
- If any excerpt doesn't match (drift since `0382d01`), STOP and report.

## Verification

- **Mechanical**: `npm run build` succeeds.
- **Feel check**: `npm run dev`:
  - The hero card now visibly frosts the moving particle city behind it — text
    stays legible while the background blurs and desaturates slightly less.
  - The Dock shows the page/city through it as frosted glass; icons are subtle
    translucent discs, not flat gray slabs.
  - The top edge of each glass surface has a faint bright line (light catching).
  - Toggle a light background behind each surface (e.g. scroll a bright section
    under the dock) and confirm legibility holds — if text washes out, raise the
    background alpha slightly (`0.5 → 0.6`), do not drop the blur.
- **Done when**: all three surfaces read as real frosted glass with depth, and
  `backdrop-filter` is actually doing visible work on each.
