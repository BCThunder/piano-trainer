# Styling Roadmap: Dark MIDI-Visualizer Theme

Goal: dark UI with glowing, animated visual effects like a MIDI visualizer
(think Synthesia / "Piano From Above" aesthetics). Work top to bottom — each
phase builds on the previous one. Check off tasks as you go and commit this
file so progress syncs across devices.

---

## Phase 1 — Design token foundation

The goal here is that *no component CSS file contains a raw hex color* —
everything references a `--token` from `index.css`.

- [ ] Wire up the glow tokens you already defined: replace the hardcoded
      `#abff6b`, `#ff4043`, `#426cf5` in `PianoStyling.css` with
      `var(--glow-correct)`, `var(--glow-incorrect)`, `var(--glow-target)`.
- [ ] Audit `--accent-container` (#4124e0). It's very saturated for a large
      nav background. In dark UIs, big surfaces stay near-black and saturation
      is reserved for small glowing elements. Try a desaturated dark surface
      and let the accent live in borders/glows instead.
- [ ] Add missing token groups to `:root`:
      - spacing scale (e.g. `--space-1` … `--space-5`)
      - radii (`--radius-sm`, `--radius-md`)
      - glow shadows (`--shadow-glow-accent`, etc. — a full `box-shadow`
        value can live in a variable!)
- [ ] Pick a display font that fits the visualizer vibe (Google Fonts:
      e.g. "Orbitron", "Rajdhani", "JetBrains Mono") and load it in
      `public/index.html`; keep body text in a readable sans-serif.

Concepts to learn: CSS custom properties as a design system, why tokens make
theming/refactoring cheap, HSL color notation (easier to reason about
lightness/saturation than hex).

Done when: searching `src/` for `#` finds hex colors only in `index.css`.

---

## Phase 2 — Keyboard realism

Make the piano look physical before making it glow.

- [ ] White keys: subtle vertical `linear-gradient` (slightly darker at the
      bottom), rounded *bottom* corners only, thin gap between keys instead
      of hard black borders.
- [ ] Black keys: gradient + slight `box-shadow` below them so they appear
      raised above the white keys.
- [ ] `:hover` state on keys (slight brightness change — try `filter:
      brightness()`).
- [ ] `:active` "pressed" state: keys shift down 1–2px (`transform:
      translateY`) and their shadow shrinks, like a real key being pushed.
- [ ] Add `transition` on the key properties you animate so hover/press feels
      smooth (~80–120ms — key presses should feel snappy, not floaty).
- [ ] Style the `.keyboard-scroll-container` scrollbar for dark mode
      (`::-webkit-scrollbar` + `scrollbar-color`).

Concepts to learn: layered `box-shadow` (comma-separated lists), `transform`
vs. changing `top/left` (transforms don't trigger layout = smoother),
`border-radius` with per-corner values.

Done when: the keyboard reads as 3D at a glance and pressing a key visibly
"depresses" it.

---

## Phase 3 — Glow effects (the visualizer core)

- [ ] Give `correct` / `incorrect` / `target` states a real glow: pair the
      background color with a multi-layer `box-shadow` (a tight bright layer
      + a wide soft layer of the same hue).
- [ ] Add a `transition` so the glow fades in/out instead of snapping.
- [ ] Make the `target` key *pulse*: a `@keyframes` animation that breathes
      the glow's spread/opacity in a loop.
- [ ] Flash effect on press: a brief bright flash that decays — trigger a
      one-shot animation when the state class is applied.
- [ ] Nav/active tab: glow treatment on the active tab button using the same
      shadow tokens, so the whole app shares one visual language.

Concepts to learn: `@keyframes` + `animation` shorthand, restarting CSS
animations from React (the class-swap / re-mount trick), `filter:
drop-shadow` vs `box-shadow` (drop-shadow follows the element's shape).

Done when: hitting the correct key feels *rewarding* — light responds to you.

---

## Phase 4 — Rising note trails (stretch, the signature effect)

Classic MIDI-visualizer move: when a key is played, a glowing bar rises up
from the key and fades out.

- [ ] Decide the space above the keyboard where trails render (a positioned
      container sharing the keyboard's coordinate system — your `leftOffset`
      prop already gives you the x-position for free).
- [ ] CSS-only approach first: on key press, render a small absolutely
      positioned `<div>` at the key's x-position that animates upward
      (`transform: translateY`) while fading. Remove it from React state on
      `onAnimationEnd`.
- [ ] Support multiple simultaneous trails (an array of trail objects with
      unique ids in state).
- [ ] Tint trails by state (correct = green glow, etc.).
- [ ] (Advanced, optional) Reimplement with `<canvas>` +
      `requestAnimationFrame` and compare perf/complexity — great portfolio
      talking point.

Concepts to learn: animating transient elements in React (state-driven
mount/unmount, `onAnimationEnd` cleanup, keys for lists), why `transform` +
`opacity` are the two "cheap" animatable properties (compositor-only).

Done when: playing a scale leaves a trail of rising light behind your hands.

---

## Phase 5 — App chrome & layout polish

- [ ] Redesign the nav as tabs: transparent background buttons, active tab
      indicated by a glowing underline or border instead of `font-weight`
      (weight changes shift layout — watch what happens to neighboring
      elements when you toggle tabs now).
- [ ] Turn `.exercise-container` into a card: surface background, border of
      `1px` semi-transparent accent, soft outer glow, generous padding from
      your spacing tokens.
- [ ] Typography pass: display font for headings/prompts, muted color for
      secondary text (`--text-muted` exists but check it's used), maybe a
      subtle `text-shadow` glow on the exercise prompt.
- [ ] Ambient background: very subtle radial gradient or vignette on `body`
      so the page isn't flat black (keep it dim — the keyboard is the star).

Done when: a screenshot looks like a designed app, not a prototype.

---

## Phase 6 — Accessibility & final polish

- [ ] Wrap all animations in `@media (prefers-reduced-motion: reduce)` guards
      (pulses/trails off or heavily toned down).
- [ ] `:focus-visible` styles on nav buttons.
- [ ] Piano keys are currently `<div onClick>` — they're invisible to
      keyboard and screen-reader users. Research the fix (`<button>` or
      `role`/`tabIndex`/key handlers) and apply it.
- [ ] Contrast check text colors against backgrounds (WebAIM contrast
      checker; aim for WCAG AA, 4.5:1 for body text).
- [ ] Cross-device pass: does the keyboard behave sensibly at laptop vs.
      desktop widths? (The fixed 840px `.keyboard` + scroll container is a
      reasonable pattern — just verify the scroll experience feels good.)

Done when: the app is usable without a mouse and with animations disabled.
