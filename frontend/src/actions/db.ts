// lib/db.ts
import { Pool } from 'pg';

// Create a PostgreSQL pool instance. This pool will be reused across all API routes.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Ensure your DATABASE_URL is set correctly in the environment
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

export default pool;
