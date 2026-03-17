import { getPostgresPool } from './postgres.js'

export async function initPostgresSchema() {
  const pool = getPostgresPool()

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS fitness_profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      age INTEGER NOT NULL,
      weight_kg REAL NOT NULL,
      height_cm INTEGER NOT NULL,
      level TEXT NOT NULL,
      goal TEXT NOT NULL,
      weekly_availability INTEGER NOT NULL,
      sessions_duration_min INTEGER NOT NULL,
      equipment_json TEXT NOT NULL,
      injuries_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS workout_plans (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      summary TEXT NOT NULL,
      plan_json TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS workout_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      plan_id TEXT,
      day_label TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0,
      perceived_effort INTEGER,
      notes TEXT,
      created_at TEXT NOT NULL
    );
  `)
}
