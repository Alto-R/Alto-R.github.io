# 003 — Drive scroll timeline with `scaleY` instead of animating `height`

- **Status**: TODO
- **Commit**: 0382d01
- **Severity**: MEDIUM-HIGH
- **Category**: Performance
- **Estimated scope**: 1 file (`src/components/NavigationTimeline.jsx`), 1 motion value + 1 style change
- **Depends on**: none (independent of tokens)

## Problem

The left-rail scroll progress bar animates its **`height`** every scroll frame.
`height` is a layout property — animating it forces layout + paint + composite on
every scroll tick, on an element pinned `position: fixed` over the whole viewport.

```jsx
/* src/components/NavigationTimeline.jsx:32-35 — current */
// 进度线高度动画（从0到完整高度）
const heightTransform = useTransform(scrollYProgress, [0, 1], [0, timelineHeight]);
// 透明度动画（开始时淡入）
const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
```

```jsx
/* src/components/NavigationTimeline.jsx:44-51 — current */
<motion.div
  className="nav-timeline-progress"
  style={{
    height: heightTransform,
    opacity: opacityTransform,
  }}
/>
```

The progress fill (`.nav-timeline-progress`, `src/components/NavigationTimeline.css:45-59`)
is absolutely positioned at `top:0; left:0; width:100%` inside the fixed-height
track, so it can be scaled from the top edge instead of grown by height.

## Target

Animate `scaleY` (a GPU transform) from 0→1 with `transform-origin: top`, and give
the fill a full static height so scale reveals it. Same visual result, no layout.

```jsx
/* target — src/components/NavigationTimeline.jsx */
// 进度线：用 scaleY 从顶部展开（GPU transform，不触发 layout）
const scaleYTransform = useTransform(scrollYProgress, [0, 1], [0, 1]);
const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
```

```jsx
/* target — the motion.div */
<motion.div
  className="nav-timeline-progress"
  style={{
    height: '100%',
    scaleY: scaleYTransform,
    transformOrigin: 'top',
    opacity: opacityTransform,
  }}
/>
```

Note: `scaleY` is acceptable here specifically because this element is small, alone
on its own layer, and its only job is this reveal — the "avoid Framer shorthand
under load" caveat targets busy multi-element pages; a single scroll-linked bar is
fine. If you prefer to be maximally safe, use `transform: scaleY(...)` via a
`useMotionTemplate` string instead — optional, not required.

## Repo conventions to follow

- The component already uses `framer-motion` `useScroll` / `useTransform` /
  `motion.div` (`src/components/NavigationTimeline.jsx:1`) — stay on that API.
- `timelineHeight` (state, `:8`) still sizes the **track** wrapper
  (`:40-43`); leave that as-is — only the inner progress fill changes.

## Steps

1. `src/components/NavigationTimeline.jsx:33` — replace the `heightTransform`
   line with the `scaleYTransform` line from Target (map `[0,1] → [0,1]`, drop the
   dependency on `timelineHeight` for this value).
2. `src/components/NavigationTimeline.jsx:45-51` — change the progress
   `motion.div`'s `style` from `{ height: heightTransform, opacity }` to
   `{ height: '100%', scaleY: scaleYTransform, transformOrigin: 'top', opacity }`.
3. Leave the track wrapper `style={{ height: timelineHeight }}` (`:42`) unchanged.

## Boundaries

- Do NOT change `NavigationTimeline.css` — `.nav-timeline-progress` already has
  `top:0; left:0; width:100%` and a gradient background; scaleY works with it.
- Do NOT alter the dots/labels logic or the `timelineHeight` state.
- Do NOT add dependencies.
- If the progress `motion.div` no longer matches the excerpt (drift since
  `0382d01`), STOP and report.

## Verification

- **Mechanical**: `npm run build` succeeds; `npm run lint` passes.
- **Feel check**: `npm run dev`, then scroll top→bottom of the page:
  - The left progress bar fills from the top downward, tracking scroll 1:1, visually
    identical to before.
  - DevTools → Performance → record while scrolling: the progress element shows
    **no** "Layout" entries from the fill (only Composite). Before this change,
    scrolling logged per-frame layout on this node.
  - Confirm the gradient (`blue→purple`) still reads correctly top-to-bottom and
    isn't squashed — `scaleY` scales the painted gradient; if it looks compressed,
    switch the fill background to a fixed-size gradient or use the
    `useMotionTemplate` transform-string variant noted in Target.
- **Done when**: scrolling shows the same fill reveal with zero layout cost on the
  progress node.
