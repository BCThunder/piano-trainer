-- Lookup table: the small, mostly-static set of exercise kinds the app
-- offers. Keeping it as its own table (instead of a TEXT column on
-- practice_sessions) is what lets Phase 6's GROUP BY / JOIN exercises exist.
CREATE TABLE IF NOT EXISTS exercise_types (
    id   SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

INSERT INTO exercise_types (name) VALUES
    ('scale'),
    ('note')
ON CONFLICT (name) DO NOTHING;

-- One row per completed exercise attempt.
CREATE TABLE IF NOT EXISTS practice_sessions (
    id               SERIAL PRIMARY KEY,
    exercise_type_id INTEGER NOT NULL REFERENCES exercise_types(id),
    root_note        TEXT NOT NULL,
    scale_name       TEXT,              -- e.g. 'Major' / 'Minor'; NULL for note exercises
    correct_count    INTEGER NOT NULL,
    incorrect_count  INTEGER NOT NULL,
    completed_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_practice_sessions_completed_at
    ON practice_sessions (completed_at);
