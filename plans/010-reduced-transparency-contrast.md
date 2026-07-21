# 010 — Honor `prefers-reduced-transparency` and `prefers-contrast`

- **Status**: TODO
- **Commit**: 0382d01
- **Severity**: MEDIUM (completes the Apple §14 accessibility triad)
- **Category**: apple-design §14 Reduced motion & accessibility
- **Estimated scope**: media-query blocks in `src/App.css` + `src/components/Dock.css`
- **Depends on**: 006 recommended first (so the media queries override the final
  material values), but not strictly required.

## Problem

The app leans heavily on `backdrop-filter` glass (`.hero-content`, `.dock`,
`.modal-backdrop`, PillNav, mobile `.nav-links`). Apple's §14 says translucency
must respond to two OS signals beyond reduced-motion:

- **`prefers-reduced-transparency: reduce`** → make glass frosty/solid (raise bg
  opacity, drop blur).
- **`prefers-contrast: more`** → near-solid backgrounds with a defined border.

Currently only one reduced-motion query exists, and it only touches the modal
backdrop (`src/pages/Publications.css:295-300`). Neither transparency nor contrast
is handled.

```css
/* src/pages/Publications.css:294-300 — the only accessibility query today */
@media (prefers-reduced-motion: reduce) {
  .modal-backdrop {
    backdrop-filter: none;
    background: rgba(0, 0, 0, 0.92);
  }
}
```

## Target

Add global blocks that solidify the class-based glass surfaces. (PillNav's glass
is an inline-style object and can't be targeted by CSS media queries — see
Boundaries for how to cover it.)

```css
/* target — append to src/App.css */
@media (prefers-reduced-transparency: reduce) {
  .navbar,
  .hero-content,
  .nav-links {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
  .hero-content { background: rgba(5, 5, 5, 0.95); }
  .nav-links   { background: rgba(0, 0, 0, 0.98); }
}

@media (prefers-contrast: more) {
  .hero-content {
    background: #050505;
    border: 1px solid rgba(255, 255, 255, 0.4);
  }
  .contact-link { border-color: rgba(165, 180, 252, 0.7); }
}
```

```css
/* target — append to src/components/Dock.css */
@media (prefers-reduced-transparency: reduce) {
  .dock {
    background: rgba(30, 30, 30, 0.97);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
@media (prefers-contrast: more) {
  .dock { border-color: rgba(255, 255, 255, 0.4); }
}
```

## Repo conventions to follow

- Match the existing accessibility-query style in
  `src/pages/Publications.css:294-300` (media query → override backdrop + bump
  background opacity).
- Keep the modal's existing reduced-motion query as-is.

## Steps

1. `src/App.css` — append the two media-query blocks (reduced-transparency +
   contrast) from Target at the end of the file.
2. `src/components/Dock.css` — append the two media-query blocks from Target at the
   end of the file.
3. **PillNav (inline glass):** to cover it, add a class hook. In
   `src/components/PillNav.jsx`, add `className="pill-glass"` to the three elements
   that spread `glassStyle` (the desktop nav container ~`:232-238`, the hamburger
   button ~`:302-312`, and the mobile menu ~`:326-329`). Then add to `src/App.css`:
   ```css
   @media (prefers-reduced-transparency: reduce) {
     .pill-glass { backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
       background: rgba(20, 20, 20, 0.96) !important; }
   }
   ```
   If you prefer to keep PillNav untouched, skip step 3 and note in the report that
   PillNav's inline glass is not covered.

## Boundaries

- Do NOT remove or weaken the default glass for users without these preferences —
  these are override-only media queries.
- Do NOT touch the existing `prefers-reduced-motion` query.
- Do NOT add `prefers-reduced-motion` handling here — that's finding 1, a separate
  (not-yet-written) plan; keep this scoped to transparency + contrast.
- Do NOT add dependencies.

## Verification

- **Mechanical**: `npm run build` succeeds.
- **Feel check**: DevTools → Rendering → "Emulate CSS media feature":
  - Set `prefers-reduced-transparency: reduce` → the hero card, dock, nav, and
    mobile menu become frosty/solid with no blur; text legibility improves.
  - Set `prefers-contrast: more` → glass surfaces go near-solid with a defined
    light border.
  - Turn both off → the full translucent material returns (from plan 006).
- **Done when**: both media features visibly solidify the glass surfaces, and the
  default (no-preference) appearance is unchanged.
