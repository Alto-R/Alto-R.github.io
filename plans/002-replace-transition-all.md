# 002 — Replace `transition: all` with explicit GPU properties + tokens

- **Status**: TODO
- **Commit**: 0382d01
- **Severity**: HIGH
- **Category**: Performance / Easing
- **Estimated scope**: 4 CSS files, 4 rule edits (+ the matching `:hover` rules already exist)
- **Depends on**: 001 (uses `--ease-out`, `--duration-*` tokens)

## Problem

Four hover interactions animate with `transition: all`, which (a) animates every
changed property including non-GPU ones (layout/paint) and (b) uses the weak
built-in `ease`. Each of these hover rules only actually changes `transform`,
`background`, `border-color`, and/or `box-shadow` — so `all` is both wasteful and
imprecise.

```css
/* src/App.css:76-87 — current (.navbar a) */
.navbar a {
  ...
  transition: all 0.3s ease;
}
.navbar a:hover { color: #a5b4fc; }
```

```css
/* src/App.css:443-459 — current (.contact-link) */
.contact-link { ...; transition: all 0.3s ease; }
.contact-link:hover {
  background: rgba(165, 180, 252, 0.2);
  border-color: rgba(165, 180, 252, 0.5);
  transform: translateY(-2px);
}
```

```css
/* src/pages/Projects.css:5-17 — current (.project-card) */
.project-card { ...; transition: all 0.3s ease; }
.project-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(165, 180, 252, 0.3);
}
```

```css
/* src/pages/Publications.css:163-183 — current (.pub-link-button) */
.pub-link-button { ...; transition: all 0.3s ease; }
.pub-link-button:hover {
  background: rgba(165, 180, 252, 0.25);
  border-color: rgba(165, 180, 252, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(165, 180, 252, 0.2);
}
```

## Target

List exactly the properties each rule changes, at a token duration + `--ease-out`.
Hover is `tens/day` frequency → keep it fast (dropdown-tier, 200ms).

```css
/* .navbar a — only color changes on hover */
.navbar a {
  transition: color var(--duration-dropdown) var(--ease-out);
}

/* .contact-link — background, border-color, transform */
.contact-link {
  transition:
    background var(--duration-dropdown) var(--ease-out),
    border-color var(--duration-dropdown) var(--ease-out),
    transform var(--duration-dropdown) var(--ease-out);
}

/* .project-card — background, border-color */
.project-card {
  transition:
    background var(--duration-dropdown) var(--ease-out),
    border-color var(--duration-dropdown) var(--ease-out);
}

/* .pub-link-button — background, border-color, transform, box-shadow */
.pub-link-button {
  transition:
    background var(--duration-dropdown) var(--ease-out),
    border-color var(--duration-dropdown) var(--ease-out),
    transform var(--duration-dropdown) var(--ease-out),
    box-shadow var(--duration-dropdown) var(--ease-out);
}
```

Note: `--duration-dropdown` is `200ms` (from plan 001), slightly snappier than the
current `0.3s`; this is intentional — it makes hover feel more responsive.

## Repo conventions to follow

- Multi-property transitions are already written comma-separated elsewhere in the
  repo — see `src/components/BlurFade.css:5-8` for the exemplar format.
- Tokens come from plan 001 in `src/index.css`. Do not hard-code cubic-beziers.

## Steps

1. `src/App.css:80` — replace `transition: all 0.3s ease;` in `.navbar a` with the
   `.navbar a` target rule above (color-only).
2. `src/App.css:452` — replace `transition: all 0.3s ease;` in `.contact-link` with
   the `.contact-link` target rule above.
3. `src/pages/Projects.css:11` — replace `transition: all 0.3s ease;` in
   `.project-card` with the `.project-card` target rule above.
4. `src/pages/Publications.css:175` — replace `transition: all 0.3s ease;` in
   `.pub-link-button` with the `.pub-link-button` target rule above.

## Boundaries

- Do NOT touch the `:hover` rules themselves — only the base rule's `transition`.
- Do NOT change `.pub-card` (`src/App.css:187`) — it already lists explicit
  properties; leave it (a token migration for it is out of scope here).
- Do NOT introduce movement on `:hover` where there was none; only re-express the
  existing transition.
- Do NOT add new dependencies.
- If any `transition: all` line is not at the cited location (drift since
  `0382d01`), STOP and report.

## Verification

- **Mechanical**: `npm run build` succeeds. Grep confirms zero remaining matches:
  `grep -rn "transition: all" src/` returns nothing.
- **Feel check**: run `npm run dev`, then:
  - Hover a nav link, a contact link, a project card, and a PDF button — each
    transitions smoothly, no visual regression vs. before.
  - DevTools → Performance → record a hover: confirm no "Recalculate Style /
    Layout" storm from the transition (only Composite/Paint on the changed props).
  - DevTools → Rendering → enable "Paint flashing"; hovering should not repaint
    large unrelated regions.
- **Done when**: no `transition: all` remains in `src/`, and all four hovers look
  identical-or-snappier with no layout thrash.
