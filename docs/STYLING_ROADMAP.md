# Styling Roadmap: Bright "Music Lab" Theme

Goal: a bright, poppy, playful UI in the spirit of Google Music Lab —
rounded Nunito type, a soft blue page, white cards, and a clean acoustic
piano. Replaces the earlier dark MIDI-visualizer direction.

> Superseded: the previous dark/Synthesia roadmap. The `rise` sparkle
> animation survived the switch (recoloured to the primary blue); the dark
> tokens did not.

---

## Palette

| Token                     | Hex       | Use                       |
|---------------------------|-----------|---------------------------|
| `--background-color`      | `#F0F4FF` | Page background           |
| `--primary-color`         | `#4285F4` | Buttons, titles, accents  |
| `--correct-color`         | `#34A853` | Correct feedback          |
| `--incorrect-color`       | `#EA4335` | Wrong feedback            |
| `--highlight-color`       | `#FBBC04` | Target note (white keys)  |
| `--highlight-color-dark`  | `#F9A825` | Target note (black keys)  |
| `--white-key-color`       | `#FFFFFF` | Piano white keys          |
| `--black-key-color`       | `#1A1A2E` | Piano black keys          |
| `--text-color`            | `#202124` | Primary text              |
| `--card-bg-color`         | `#FFFFFF` | Exercise card background  |

---

## Phase 1 — Token foundation  ✅ done

- [x] All design tokens live in `src/index.css`; no component CSS file
      contains a raw hex colour.
- [x] Spacing scale (`--space-1` … `--space-5`), radii, and full
      `box-shadow` values as tokens.
- [x] Nunito loaded via `<link>` in `public/index.html` (preconnect +
      stylesheet), exposed as `--font-body`.
- [x] `--primary-rgb` / `--highlight-rgb` channel triplets so `rgba()` can
      vary the alpha of a token colour.

## Phase 2 — Keyboard & keys  ✅ done

- [x] `PianoStyling.css` split into `Keyboard.css` + `PianoKey.css`
      (one CSS file per component).
- [x] White keys: 40×100, `border-radius: 0 0 6px 6px`, soft drop shadow.
- [x] Black keys: 24×62, raised shadow, `z-index: 10`.
- [x] `:hover` and `:active` (key dips 2px, shadow tightens).
- [x] `target` keys use the yellow highlight plus the `pulse` keyframe.
- [x] Scrollbar styled for the light theme.

## Phase 3 — App chrome  ✅ done

- [x] White nav bar with pill tab buttons; active tab filled blue.
- [x] Exercise card: white, `--radius-lg`, `--shadow-card`, `2rem` padding.
- [x] Typography scale wired to `h1` / `h3` / feedback / score.
- [x] `:focus-visible` rings on every button.

## Phase 4 — Two-panel exercise layout  ✅ done

The single 900px card left large empty gutters and pushed the score below the
fold. Replaced with a full-width title over a 75/25 panel row.

- [x] `ExerciseLayout.tsx` — shared shell taking `title`, `keyboard` and `info`
      slots (`ReactNode` props), so both exercises stop duplicating the wrapper
      markup and the layout stays unaware of exercise state.
- [x] `.exercise-panels` grid at `minmax(0, 3fr) minmax(0, 1fr)`. The
      `minmax(0, …)` is load-bearing: grid items default to `min-width: auto`,
      so the fixed 840px keyboard would otherwise widen the first column past
      3fr and break the ratio.
- [x] Card chrome moved from `.exercise-container` onto `.panel`; the old block
      is gone from `App.css`.
- [x] Stacks to one column below 1100px, where the keyboard can no longer fit
      in a 75% column.
- [x] `.keyboard-scroll-container` uses `align-items: safe center` (with a bare
      `center` fallback declaration first). A centered flex item that overflows
      does so on *both* edges, and browsers cannot scroll into leading
      overflow — the lowest keys were becoming unreachable in a narrow panel.

---

## Phase 5 — Remaining work

- [ ] **Wire up correct/incorrect feedback colour.** `.exercise-feedback`
      already has `.correct` / `.incorrect` modifiers in
      `ExerciseLayout.css`, but
      nothing applies them. `useNoteExercise` / `useScaleExercise` need to
      return a status alongside the `feedback` string (e.g.
      `feedbackStatus: 'correct' | 'incorrect' | null`) so the component can
      set the class. This is a logic change, not a styling one.
- [ ] **Highlight the target note in the Notes tab.** `useNoteExercise`
      never writes a `'target'` NoteState, so `.key.target` only ever fires
      in the Scales tab with hints on. Setting the target note's state in
      that hook would light up (and pulse) the key the prompt is asking for.
- [ ] **Responsive keyboard.** `--keyboard-width` is a fixed `840px`; below
      that the keyboard scrolls horizontally. Consider shrinking the key
      width tokens at narrow breakpoints — note the `octaveKeys` offsets in
      `Keyboard.tsx` are hardcoded pixels, so they would have to move to
      tokens too.
- [ ] **Note labels.** No key renders its note name. `--font-size-label`
      (0.75rem) already exists — it is what `.exercise-hint` uses.

Concepts to learn: CSS custom properties as a design system, specificity
(why `.exercise-container p` beat `.exercise-score` until the selector was
made more specific — the same trap now guarded by `.panel--info .exercise-score`),
why grid and flex items need `minmax(0, …)` / `min-width: 0` to shrink below
their content, `transform` vs. `top/left` for animation, and
`prefers-reduced-motion`.
