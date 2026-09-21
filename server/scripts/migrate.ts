import "dotenv/config";
import fs from "fs";
import path from "path";
import { pool } from "../src/db";

async function migrate() {
    const schemaPath = path.join(__dirname, "..", "sql", "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf-8");
    await pool.query(schema);
    console.log("Schema applied.");
    await pool.end();
}

migrate().catch((err) => {
    console.error(err);
    process.exit(1);
});
