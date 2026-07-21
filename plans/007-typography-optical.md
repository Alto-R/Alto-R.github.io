# 007 — Typographic discipline: size-specific tracking, tight leading, one font stack

- **Status**: TODO
- **Commit**: 0382d01
- **Severity**: MEDIUM-HIGH (defines the "precise" Apple feel)
- **Category**: apple-design §15 Typography
- **Estimated scope**: `src/index.css` + `src/App.css` (+ a couple heading rules)
- **Depends on**: none

## Problem

Two issues:

1. **Conflicting global font stacks.** Two different `:root`/`html` font families:
   ```css
   /* src/index.css:62-63 — current */
   :root { font-family: system-ui, Avenir, Helvetica, Arial, sans-serif; ... }
   ```
   ```css
   /* src/App.css:2-9 — current */
   html, body, #root { ...; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; ... }
   ```

2. **No size-specific tracking or optical sizing.** Large display headings use
   default (loose) tracking and slack leading. Apple tightens large text; letters
   look too far apart as they grow.
   ```css
   /* src/App.css:139-143 — current */
   h1 { font-size: clamp(2rem, 5vw + 1rem, 4rem); margin: 0; color: #a5b4fc; }
   ```
   ```css
   /* src/App.css:168-173 — current */
   .page-title { font-size: clamp(1.8rem, 4vw + 0.5rem, 3rem); margin-bottom: 3rem; ... }
   ```
   Also `.pub-title` (`src/App.css:231`), `.section-title` (`src/App.css:305`).

## Target

Unify on one stack (keep Inter, which is intentional, with system fallbacks) and
add optical sizing; tighten tracking + leading on large headings.

```css
/* target — src/index.css:62-63 (match App.css and add optical sizing) */
:root {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  font-optical-sizing: auto;
  line-height: 1.5;
  ...
}
```

```css
/* target — large display heading */
h1 {
  font-size: clamp(2rem, 5vw + 1rem, 4rem);
  margin: 0;
  color: #a5b4fc;
  line-height: 1.05;          /* tight leading for large text */
  letter-spacing: -0.02em;    /* negative tracking as it grows */
}

/* target — page titles */
.page-title {
  font-size: clamp(1.8rem, 4vw + 0.5rem, 3rem);
  margin-bottom: 3rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 1rem;
}

/* target — card / section headings (medium: lighter negative tracking) */
.pub-title  { ...; letter-spacing: -0.01em; line-height: 1.25; }
.section-title { ...; letter-spacing: -0.01em; }
```

Body copy stays as-is (near-0 tracking, `line-height: 1.6–1.8` already correct).

## Repo conventions to follow

- Headings already use `clamp()` for fluid size and `rem`-based spacing — keep
  that; only add `letter-spacing` / `line-height`, don't convert units.
- Keep the accent color `#a5b4fc` and existing `margin` values on each heading.

## Steps

1. `src/index.css:63` — change the `:root` `font-family` to the unified stack in
   Target and add `font-optical-sizing: auto;` on the next line.
2. `src/App.css:139-143` — add `line-height: 1.05;` and `letter-spacing: -0.02em;`
   to `h1`.
3. `src/App.css:168-173` — add `letter-spacing: -0.02em;` and `line-height: 1.1;`
   to `.page-title` (keep its border-bottom for now; plan 009 revisits it).
4. `src/App.css:231-236` (`.pub-title`) — add `letter-spacing: -0.01em;` and
   `line-height: 1.25;` (it currently has `line-height: 1.3` — replace with 1.25).
5. `src/App.css:305-309` (`.section-title`) — add `letter-spacing: -0.01em;`.

## Boundaries

- Do NOT add tracking to body copy, `.subtitle`, `.about-text`, `.description`,
  or small UI text — those want near-0 (or slightly positive), not negative.
- Do NOT change font sizes, colors, or margins.
- Do NOT remove the `'Inter'` family; if Inter isn't actually loaded (no `@font-face`
  / `<link>`), the system fallback covers it — but note it in your report so the
  user can decide whether to self-host Inter.
- Do NOT add dependencies.

## Verification

- **Mechanical**: `npm run build` + `npm run lint` pass.
- **Feel check**: `npm run dev`:
  - Large headings (`h1`, page titles) look tighter and more deliberate — letters
    no longer drift apart at big sizes; lines sit closer.
  - Confirm one font renders across the whole app (no jump between the hero and
    inner pages). In DevTools → Computed → `font-family` is the same everywhere.
  - Resize the window through the `clamp()` range and confirm tracking still looks
    right at both the smallest and largest sizes.
- **Done when**: one unified font stack app-wide, optical sizing on, and large
  headings carry negative tracking + tight leading.
