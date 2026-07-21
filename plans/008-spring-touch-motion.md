# 008 — Use critically-damped springs for touchable motion

- **Status**: TODO
- **Commit**: 0382d01
- **Severity**: MEDIUM
- **Category**: apple-design §4 Behavior over animation (springs)
- **Estimated scope**: 1 file (`src/pages/Publications.jsx`), 1 transition
- **Depends on**: none

## Problem

Apple reaches for springs on anything a user can touch — a fixed-duration tween
can't respond to new input and feels prescribed. The publication card hover/tap
uses a fixed-duration tween.

```jsx
/* src/pages/Publications.jsx:76-83 — current */
<motion.div
  key={pub.id}
  layoutId={`card-${pub.id}`}
  onClick={() => setActiveId(pub.id)}
  className="pub-card"
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.2 }}
>
```

## Target

A critically-damped spring (`bounce: 0` — no overshoot, since a hover/tap carries
no momentum) with an Apple-style response of ~0.3s. If plan 005 is applied first,
keep its `whileTap`.

```jsx
/* target — src/pages/Publications.jsx */
<motion.div
  key={pub.id}
  layoutId={`card-${pub.id}`}
  onClick={() => setActiveId(pub.id)}
  className="pub-card"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
>
```

## Repo conventions to follow

- The repo already uses Motion's Apple-style spring API (`bounce` + `duration`)
  in `src/components/tabs.jsx:67` (`{ type: "spring", bounce: 0.3, duration: 0.6 }`).
  Match that shape; here `bounce: 0` because there's no momentum to justify overshoot.
- `layoutId` on this card must stay — it drives the shared-element modal transition;
  only the `transition` object changes.

## Steps

1. `src/pages/Publications.jsx:82` — replace `transition={{ duration: 0.2 }}` with
   `transition={{ type: 'spring', bounce: 0, duration: 0.3 }}`.
2. If plan 005 isn't applied yet, also add `whileTap={{ scale: 0.98 }}` (otherwise
   it's already there).

## Boundaries

- Do NOT add `bounce` > 0 here — overshoot on a hover that carried no flick feels
  wrong (Apple: reserve bounce for momentum-driven gestures).
- Do NOT change the `layoutId`, `onClick`, or `whileHover` values.
- Do NOT touch the modal's `layoutId` transition (it's driven by Framer's layout
  animation defaults; out of scope).
- Do NOT add dependencies.

## Verification

- **Mechanical**: `npm run build` + `npm run lint` pass.
- **Feel check**: `npm run dev` → Publications:
  - Hover a card: it scales up with a natural spring settle (no linear "timed"
    feel), and re-hovering mid-animation retargets smoothly instead of restarting.
  - Confirm there's **no** visible bounce/overshoot at the top of the scale — it
    should settle cleanly (that's `bounce: 0`).
  - The card → modal expand still works (layoutId intact).
- **Done when**: the card responds like a spring, settles without overshoot, and
  the modal shared-element transition is unaffected.
