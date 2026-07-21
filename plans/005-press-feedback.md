# 005 — Add press feedback (`:active` / `whileTap`) to pressable elements

- **Status**: TODO
- **Commit**: 0382d01
- **Severity**: HIGH (highest-leverage "feels like Apple" upgrade)
- **Category**: apple-design §1 Response — feedback on pointer-down
- **Estimated scope**: 2 JSX files + 3 CSS rules
- **Depends on**: 001 (uses `--duration-press`, `--ease-out`)

## Problem

Apple's foundational rule: pressable things must respond the instant they're
pressed (`:active` / pointer-down), scaling down ~3% so the UI feels physical.
The site has **zero press feedback** anywhere — cards only scale up on hover, and
buttons/links/dock icons do nothing on press, so the interface feels like it's
"behind glass."

```jsx
/* src/pages/Publications.jsx:76-83 — current (card: hover only, no tap) */
<motion.div
  key={pub.id}
  layoutId={`card-${pub.id}`}
  onClick={() => setActiveId(pub.id)}
  className="pub-card"
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.2 }}
>
```

```jsx
/* src/components/Dock.jsx:78-87 — current (dock icon: no tap) */
<Component
  ref={ref}
  className={`dock-icon ${className}`}
  style={{ width: size, height: size }}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
  {...additionalProps}
  {...props}
>
```

CSS buttons/links with no `:active`: `.contact-link` (`src/App.css:443`),
`.pub-link-button` (`src/pages/Publications.css:163`).

## Target

Subtle scale-down on press, fast (press tier), using tokens from plan 001.

```jsx
/* target — Publications card */
<motion.div
  key={pub.id}
  layoutId={`card-${pub.id}`}
  onClick={() => setActiveId(pub.id)}
  className="pub-card"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
>
```

```jsx
/* target — Dock icon: add whileTap (composes with the width/height size spring) */
<Component
  ref={ref}
  className={`dock-icon ${className}`}
  style={{ width: size, height: size }}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
  whileTap={{ scale: 0.92 }}
  {...additionalProps}
  {...props}
>
```

```css
/* target — append to src/App.css after the .contact-link:hover rule */
.contact-link:active {
  transform: scale(0.97);
  transition: transform var(--duration-press) var(--ease-out);
}

/* target — append to src/pages/Publications.css after .pub-link-button:hover */
.pub-link-button:active {
  transform: scale(0.97);
  transition: transform var(--duration-press) var(--ease-out);
}
```

## Repo conventions to follow

- `Component` in Dock is `motion.a` / `motion.div` (`src/components/Dock.jsx:75`),
  so `whileTap` is valid.
- `.contact-link` and `.pub-link-button` already have `:hover` rules with
  `transform: translateY(...)`; the `:active` scale composes on tap — that's fine,
  `:active` wins the moment of press.
- Use tokens from plan 001, never hard-coded durations.

## Steps

1. `src/pages/Publications.jsx:81` — add `whileTap={{ scale: 0.98 }}` to the card
   `motion.div` (keep `whileHover` and `transition`).
2. `src/components/Dock.jsx:83` — add `whileTap={{ scale: 0.92 }}` to `Component`.
3. `src/App.css` — after the `.contact-link:hover { … }` block (ends ~line 459),
   append the `.contact-link:active` rule from Target.
4. `src/pages/Publications.css` — after `.pub-link-button:hover { … }` (ends ~line
   183), append the `.pub-link-button:active` rule from Target.

## Boundaries

- Do NOT add press feedback to non-interactive elements (labels, headings).
- Do NOT change hover behavior — only add the press state.
- Keep the scale subtle (0.97–0.98 for buttons/cards; dock icons can go to 0.92
  because they're small and already magnify).
- Do NOT add dependencies.
- If plan 001 tokens aren't defined yet, do that plan first (this one references
  `--duration-press` / `--ease-out`).

## Verification

- **Mechanical**: `npm run build` + `npm run lint` pass.
- **Feel check**: `npm run dev`:
  - Press-and-hold (mouse down, don't release) a publication card, a contact
    link, a PDF button, a dock icon — each visibly scales down *the instant* the
    press starts, and springs back on release. No wait-for-click delay.
  - On a touch device / DevTools device mode, the same tap-down feedback fires.
  - DevTools → set Animations playback to 10% and confirm the press scale is
    smooth, not stepped.
- **Done when**: every pressable element gives immediate pointer-down feedback.
