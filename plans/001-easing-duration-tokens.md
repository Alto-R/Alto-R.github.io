# 001 — Establish shared easing & duration tokens

- **Status**: TODO
- **Commit**: 0382d01
- **Severity**: MEDIUM (foundational — plans 002–004 depend on it)
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file (`src/index.css`), ~12 lines added. No behavior change on its own.

## Problem

The codebase has **no shared motion tokens**. Every easing curve and duration is
hand-typed at each call site, and they don't agree with each other:

- `src/App.css:80` — `transition: all 0.3s ease`
- `src/App.css:452` — `transition: all 0.3s ease`
- `src/pages/Projects.css:11` — `transition: all 0.3s ease`
- `src/pages/Publications.css:175` — `transition: all 0.3s ease`
- `src/components/BlurFade.css:5-8` — `... ease-out`
- `src/components/NavigationTimeline.css:92` — `transition: box-shadow 0.3s ease`
- durations seen across the app: `0.15s`, `0.2s`, `0.3s`, `0.6s`, plus GSAP `power3.easeOut`

Built-in CSS easings (`ease`, `ease-out`) are too weak for deliberate motion, and
five near-identical hand-typed values are a consolidation problem. There is no
single place to tune the product's feel.

```css
/* src/index.css:62 — current standalone :root (no motion tokens) */
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  ...
}
```

## Target

Add a motion-token block to the global `:root` in `src/index.css`. These exact
values (strong custom curves from the animation standards — do not approximate):

```css
/* target — add inside the existing standalone :root in src/index.css */
:root {
  /* Motion — easing */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);      /* entrances/exits, UI */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);  /* on-screen movement/morph */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);   /* iOS-like drawer/sheet */

  /* Motion — duration (UI stays < 300ms) */
  --duration-press: 140ms;    /* button/press feedback   (100–160ms) */
  --duration-tooltip: 160ms;  /* tooltips, small popovers (125–200ms) */
  --duration-dropdown: 200ms; /* dropdowns, selects       (150–250ms) */
  --duration-modal: 300ms;    /* modals, drawers          (200–500ms) */
}
```

## Repo conventions to follow

- `src/index.css` already declares two `:root` blocks: shadcn design tokens live
  in the `@layer base { :root { … } }` at `src/index.css:6`, and app-level
  globals (font, colors) live in the **standalone** `:root` at `src/index.css:62`.
  Put the motion tokens in the **standalone `:root` (line 62)** so they are plain
  global custom properties, not layered under Tailwind base.
- Tokens are `kebab-case` custom properties, consistent with the existing
  `--background`, `--radius`, etc.

## Steps

1. Open `src/index.css`. Locate the standalone `:root { font-family: … }` block
   starting at line 62 (NOT the `@layer base` one at line 6).
2. Immediately after the `font-weight: 400;` line, add the two comment-grouped
   token groups exactly as written in **Target** above (6 easing/duration
   custom properties total).
3. Save. Do not change any other file in this plan — consumers are migrated in
   plans 002–004.

## Boundaries

- Do NOT edit the `@layer base { :root }` block at `src/index.css:6` (shadcn tokens).
- Do NOT modify any `.css`/`.jsx` consumer in this plan — this plan only *defines*
  the tokens. Migrations are separate plans.
- Do NOT add new dependencies or change the Tailwind config.
- If the standalone `:root` block is not found at ~line 62 (drift since commit
  `0382d01`), STOP and report instead of guessing where to put them.

## Verification

- **Mechanical**: `npm run build` succeeds with no CSS errors. `npm run lint`
  passes (CSS custom properties don't affect ESLint, but run it to confirm no
  accidental JS edits).
- **Feel check**: none yet — this plan adds no visible behavior. Confirm in
  DevTools → Elements → `:root` computed styles that `--ease-out` and
  `--duration-modal` resolve to the values above.
- **Done when**: the six custom properties exist on `:root` and `getComputedStyle(document.documentElement).getPropertyValue('--ease-out')` returns `cubic-bezier(0.23, 1, 0.32, 1)` in the browser console.
