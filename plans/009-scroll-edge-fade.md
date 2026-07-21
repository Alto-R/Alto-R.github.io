# 009 — Replace the hard title divider with an edge-faded gradient rule

- **Status**: TODO
- **Commit**: 0382d01
- **Severity**: LOW (polish)
- **Category**: apple-design §12 — scroll edge effects, not hard dividers
- **Estimated scope**: 1 rule in `src/App.css`
- **Depends on**: none (compatible with plan 007's changes to `.page-title`)

## Problem

Page titles are underlined with a flat, full-width 1px line that stops abruptly at
both ends. Apple avoids hard 1px dividers in favor of a rule that fades at its
edges, so the separation reads as soft depth rather than a drawn box-line.

```css
/* src/App.css:168-173 — current */
.page-title {
  font-size: clamp(1.8rem, 4vw + 0.5rem, 3rem);
  margin-bottom: 3rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-bottom: 1rem;
}
```

## Target

Drop the `border-bottom`; draw a 1px gradient line via `::after` that fades to
transparent at both ends.

```css
/* target — src/App.css .page-title (keep plan 007's tracking/leading if applied) */
.page-title {
  position: relative;
  font-size: clamp(1.8rem, 4vw + 0.5rem, 3rem);
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  /* border-bottom removed */
}

.page-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(255, 255, 255, 0.18) 12%,
    rgba(255, 255, 255, 0.18) 60%,
    transparent 100%
  );
}
```

## Repo conventions to follow

- The codebase already uses fade-mask gradients for edges — see
  `src/components/NavigationTimeline.css:16-42` (`mask-image` fade) and
  `src/pages/Publications.css:319-329` (`::after` linear-gradient). Match that
  idiom; a `::after` gradient line is consistent with the existing style.
- If plan 007 was applied, `.page-title` already has `position` implied only by
  this plan — ensure `position: relative` is present exactly once.

## Steps

1. `src/App.css:168-173` — in `.page-title`, remove the `border-bottom` line and
   add `position: relative;` (keep `padding-bottom: 1rem;` and, if plan 007 ran,
   its `letter-spacing` / `line-height`).
2. Immediately after the `.page-title { … }` block, add the `.page-title::after`
   rule from Target.

## Boundaries

- Do NOT change the other hard dividers in this pass (`.pub-footer` border-top,
  `.modal-content .pub-footer` border-top) — scope is the page title only.
- Do NOT alter title size, color, or margins.
- Do NOT add dependencies.
- The gradient is intentionally weighted left (12%→60%) so it fades out under the
  right side; keep those stops.

## Verification

- **Mechanical**: `npm run build` succeeds.
- **Feel check**: `npm run dev`, visit any inner page (Publications, Projects,
  Resume): the underline now fades in from the left and out toward the right edge
  instead of a hard full-width line. It should read as a soft rule, not a box border.
- **Done when**: no `.page-title` `border-bottom` remains and the faded gradient
  rule renders under every page title.
