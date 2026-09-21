# Job-Readiness Roadmap: Closing the Gaps vs. Junior Frontend Postings

Goal: make this project cover the skills junior/entry-level frontend postings
actually list (testing, modern tooling, accessibility, async/data work, and
portfolio presentation). Based on a July 2026 review of job requirements.
Work top to bottom — the order is chosen so each phase unblocks or de-risks
the next. Check off tasks as you go and commit this file so progress syncs
across devices.

Already strong (no work needed, but know these as interview talking points):
hand-written React + TypeScript, custom hooks separating logic from rendering
(`useScaleExercise`, `usePianoAudio`), derived state computed instead of
stored, functional state updates, Web Audio API, conventional commits.

---

## Revised order for an active job search

The phases below are numbered by dependency, but a recruiter screening a
portfolio never sees your bundler — they see the README and whether there's a
live link. When applications are going out *now*, run the phases in this order:

1. **Phase 4** (README + deploy) — the visible surface, ~1 day.
2. **Phase 3** (accessibility + keyboard input) — highest code-craft signal for
   this app; a piano you can't play with a keyboard is a visible miss.
3. **Phase 1 remainder** — the real interaction tests (see the note below).
4. **Phase 2** (Vite migration) — real learning value, but invisible to a
   screener and carries breakage risk. Safe to defer once interviews land.
   The ESLint + Prettier + npm-scripts sub-task inside it is independent and
   low-risk — pull it forward and do it any time.
5. **Phase 5** (async / data) — `localStorage` via a `useLocalStorage` hook is
   the smallest high-signal option; Web MIDI is the better interview story if
   the search runs long.

---

## Phase 1 — Real tests

The single biggest gap vs. postings. `npm test` currently *fails*: the stock
`App.test.tsx` looks for a "learn react" link that no longer exists.

- [X] Delete or rewrite the stale `App.test.tsx` so the suite is green.
- [X] Unit-test the pure functions first — they need no React at all:
      - `buildScale` in `useScaleExercise.tsx` (export it): correct notes for
        C Major, a scale with sharps, a minor scale.
      - `getFrequency` in `usePianoAudio.tsx` (export it): A4 = 440,
        C4 ≈ 261.63.
- [ ] Component-test one full exercise flow through `ScaleExercise` with
      React Testing Library: render, click a correct key → success feedback
      appears; click a wrong key → error feedback appears.
      (NOT done yet — no such test exists. `@testing-library/user-event` is
      installed but imported nowhere.)
- [ ] Test the hint toggle: enabling hints marks the next note as `target`.
      (`src/tests/useScaleExercise.test.tsx` does not do this — it never calls
      `toggleHints`, and with hints off `noteStates` is `{}` so its
      `Object.values(...).every(...)` assertion is vacuously true. Rewrite it to
      actually toggle hints and assert on the resulting `target` entry.)
- [ ] (Stretch) Mock `AudioContext` in tests — jsdom doesn't provide it, so
      clicking keys in tests will force you to learn `jest.mock` / test doubles.

Concepts to learn: the testing pyramid (unit vs. component vs. e2e), React
Testing Library's philosophy (query by what the *user* sees, not
implementation details), why pure functions are trivially testable and how
that should influence where you put logic.

Done when: `npm test` passes with meaningful coverage of both exercises, and
you can explain each test's purpose out loud.

---

## Phase 2 — Migrate CRA → Vite

`react-scripts` (Create React App) was sunset by the React team in early
2025; shipping it in a 2026 portfolio dates the project. Doing this *after*
Phase 1 means your tests verify the migration didn't break anything — which
is exactly how migrations work on the job.

- [ ] Read the official Vite migration guidance and do the move by hand:
      new `index.html` at the root, `vite.config.ts`, swap `npm start` for
      `npm run dev`.
- [ ] Swap Jest → Vitest and confirm the Phase 1 tests still pass.
- [ ] Upgrade TypeScript from 4.9 to 5.x while you're in there.
- [ ] Add a real ESLint + Prettier config (flat config format) — CRA's
      embedded lint setup goes away with it, and "sets up own tooling" is a
      listed job skill.
- [ ] Fix what lint surfaces: hooks with no JSX should be `.ts` not `.tsx`,
      the hardcoded `280` in `Keyboard.tsx` should derive from
      `7 * WHITE_KEY_WIDTH` in `constants`.

Concepts to learn: what a bundler actually does (entry point, module graph,
dev server vs. production build), env-var handling (`import.meta.env` vs.
`process.env`), why the ecosystem moved from webpack-wrapped CRA to Vite.

Done when: `npm run dev`, `npm run build`, and `npm test` all work on Vite,
and `react-scripts` is gone from `package.json`.

---

## Phase 3 — Accessibility & physical keyboard input

Overlaps with [STYLING_ROADMAP Phase 6](STYLING_ROADMAP.md) — doing it here
first is fine; check it off in both files.

- [ ] Piano keys: `<div onClick>` → `<button>` with `aria-label={note}`.
      Screen readers and Tab-key users currently can't play at all.
- [ ] `:focus-visible` styles so keyboard focus is visible on keys and nav.
- [ ] Play with the computer keyboard: map a row of letter keys to notes via
      a `keydown` listener in a `useEffect` — this forces you to learn effect
      cleanup and stale-closure pitfalls, both classic interview topics.
- [ ] Announce exercise feedback to screen readers: the feedback message
      should live in an `aria-live="polite"` region.
- [ ] Run an automated audit (Lighthouse or axe DevTools) and fix what it
      finds.

Concepts to learn: semantic HTML as the a11y foundation, ARIA only when
semantics aren't enough, `useEffect` cleanup functions, global event
listeners in React.

Done when: you can complete a full scale exercise without touching the mouse,
and Lighthouse's accessibility score is 95+.

---

## Phase 4 — README & deployment

Reviewers spend ~2 minutes per portfolio project. A live link and a real
README are what earn the click into your source code.

- [ ] Replace the stock CRA README: what the app is, a screenshot or GIF,
      feature list, tech stack, how to run it, and a "what I learned"
      section (the Web Audio math, derived state, the CRA→Vite migration).
- [ ] Deploy to Netlify, Vercel, or GitHub Pages and put the live URL at the
      top of the README and in the GitHub repo's About field.
- [ ] Add a GitHub Actions workflow that runs lint + typecheck + tests on every
      push — CI familiarity shows up in postings, takes ~20 lines of YAML, and
      puts a visible green check on every commit. (Was a stretch goal; it's
      cheap enough to be a real one.)

Concepts to learn: static hosting and what a production build artifact is,
basic CI (triggers, jobs, failing a build on test failure).

Done when: someone with only the repo URL can understand, try, and run the
project in under five minutes.

---

## Phase 5 — Async & data (pick at least one)

Nothing in the app currently fetches, persists, or handles loading/error
states, yet API integration is on nearly every posting. Ranked by thematic
fit:

- [ ] **Web MIDI API** (best fit): let a real MIDI keyboard drive the
      existing `noteStates`/sparkle pipeline. Async permission request,
      event-driven input, device connect/disconnect handling.
- [ ] **localStorage persistence**: scores, hint preference, and selected
      tab survive reload via a hand-written `useLocalStorage` hook.
- [ ] **Fetch from an API**: pull something from a public REST API and
      render loading / success / error states — the exact pattern every
      job's day-one ticket involves.

Concepts to learn: promises and `async/await` in React (where async work
lives, why not in render), loading/error state modeling, effect cleanup for
subscriptions.

Done when: the app has at least one feature involving async work with
explicit loading and error handling you can walk through in an interview.

---

## Phase 6 — Backend & SQL (Postgres)

Many junior postings want "some familiarity with SQL/Postgres" even for a
frontend-leaning role. `server/` now has a minimal Express API backed by
Postgres, using raw SQL (`pg`, no ORM) so the SQL itself is the thing you
write, not generated. This also completes Phase 5's "Fetch from an API"
item — once wired up, it's your own API instead of a public one.

Already scaffolded (read before extending): `server/sql/schema.sql` (two
tables — `exercise_types` lookup table, `practice_sessions` fact table with
a foreign key to it), `server/src/db.ts` (a shared `pg` `Pool`),
`server/src/index.ts` (`POST /api/sessions` to insert a completed exercise,
`GET /api/sessions` to list the 50 most recent, joined against
`exercise_types`). See [server/README.md](../server/README.md) to run it.

- [X] Get it running: `docker compose up -d`, `cd server && npm install &&
      npm run migrate && npm run dev`. Hit `POST /api/sessions` with curl or
      Postman, then confirm the row shows up via `GET /api/sessions`.
      (Needed an apt `docker-ce` reinstall — the snap Docker package doesn't
      reliably support the `docker` group on WSL2.)
- [X] Write `GET /api/stats`: one aggregate query using `GROUP BY` and
      `AVG`/`COUNT` — accuracy and session count per exercise type. Written
      from scratch in `psql`, clause by clause, then moved into Express;
      aliased with `AS session_count` / `AS avg_accuracy` for a readable
      response.
- [ ] Wire the frontend: after a scale/note exercise completes, `POST` the
      result to `/api/sessions` (loading/error state, same pattern as
      Phase 5). Add a small stats view that reads `GET /api/stats`.
- [ ] Add one more query yourself: e.g. longest daily practice streak, or
      most-practiced root note — something that needs `WHERE`/`ORDER BY`/
      `LIMIT` beyond the scaffolded examples.
- [ ] (Stretch) Add a second migration file and a naive runner (or adopt
      `node-pg-migrate`) instead of the single `schema.sql` re-run — this is
      what "database migrations" means on the job.
- [ ] (Stretch) Deploy: host Postgres on a free tier (Neon/Supabase) and the
      API on Render/Fly.io, then point the deployed frontend at it.

Concepts to learn: primary vs. foreign keys and why `practice_sessions`
references `exercise_types` instead of storing the name directly,
parameterized queries (`$1, $2, ...`) and why string-concatenating SQL is a
SQL-injection risk, `JOIN` vs. `GROUP BY` (joining relates rows,
grouping collapses them), connection pooling (why `db.ts` creates one
`Pool` instead of connecting per request), and migrations as version
control for schema.

Done when: you can explain the schema, write a `GROUP BY` query from
scratch without a reference, and the frontend persists and displays real
practice history through your own API.
