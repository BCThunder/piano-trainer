# piano-trainer server

A small Express + PostgreSQL API for persisting practice history. Built
with raw SQL (via `pg`, no ORM) on purpose — see
[docs/JOB_READINESS_ROADMAP.md](../docs/JOB_READINESS_ROADMAP.md) Phase 6.

## Setup

From the repo root:

```bash
docker compose up -d          # starts Postgres on localhost:5432
cd server
cp .env.example .env
npm install
npm run migrate               # applies sql/schema.sql
npm run dev                   # starts the API on http://localhost:4000
```

## Endpoints

- `GET /api/health` — liveness check.
- `POST /api/sessions` — record a completed exercise attempt.
  Body: `{ exerciseType: "scale" | "note", rootNote: string, scaleName?: string, correctCount: number, incorrectCount: number }`
- `GET /api/sessions` — the 50 most recent sessions, joined against
  `exercise_types` for a readable name.

## Schema

See [`sql/schema.sql`](sql/schema.sql): `exercise_types` (lookup table) and
`practice_sessions` (one row per completed exercise, foreign-keyed to
`exercise_types`).
