import "dotenv/config";
import express from "express";
import cors from "cors";
import { pool } from "./db";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
});

// Insert one completed exercise attempt.
app.post("/api/sessions", async (req, res) => {
    const { exerciseType, rootNote, scaleName, correctCount, incorrectCount } = req.body;

    if (!exerciseType || !rootNote || correctCount == null || incorrectCount == null) {
        res.status(400).json({ error: "exerciseType, rootNote, correctCount and incorrectCount are required" });
        return;
    }

    try {
        const typeResult = await pool.query(
            "SELECT id FROM exercise_types WHERE name = $1",
            [exerciseType]
        );
        if (typeResult.rows.length === 0) {
            res.status(400).json({ error: `Unknown exerciseType "${exerciseType}"` });
            return;
        }
        const exerciseTypeId = typeResult.rows[0].id;

        const insertResult = await pool.query(
            `INSERT INTO practice_sessions
                (exercise_type_id, root_note, scale_name, correct_count, incorrect_count)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, completed_at`,
            [exerciseTypeId, rootNote, scaleName ?? null, correctCount, incorrectCount]
        );

        res.status(201).json(insertResult.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save session" });
    }
});

// List recent sessions, joined against exercise_types so the response
// carries the readable name rather than a foreign key.
app.get("/api/sessions", async (_req, res) => {
    try {
        const result = await pool.query(
            `SELECT ps.id,
                    et.name AS exercise_type,
                    ps.root_note,
                    ps.scale_name,
                    ps.correct_count,
                    ps.incorrect_count,
                    ps.completed_at
             FROM practice_sessions ps
             JOIN exercise_types et ON et.id = ps.exercise_type_id
             ORDER BY ps.completed_at DESC
             LIMIT 50`
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch sessions" });
    }
});

// Get the accuracy for recent practice sessions across all exercises
app.get("/api/stats", async (_req, res) => {
    try {
        const result = await pool.query(
            `SELECT et.name, COUNT(*) as session_count, ROUND(AVG(correct_count::numeric / (correct_count + incorrect_count)), 2) as avg_accuracy
            FROM practice_sessions ps JOIN exercise_types et ON ps.exercise_type_id = et.id
            GROUP BY et.name`
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});

const port = process.env.PORT ?? 4000;
app.listen(port, () => {
    console.log(`piano-trainer server listening on http://localhost:${port}`);
});