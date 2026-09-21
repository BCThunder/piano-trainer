import { Pool } from "pg";
import "dotenv/config";

// A single shared pool. Each query borrows a client and returns it —
// this is what makes `pg` safe to call concurrently from many requests.
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
