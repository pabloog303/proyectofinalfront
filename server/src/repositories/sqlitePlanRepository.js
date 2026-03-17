import db from '../db/database.js'

export function saveWorkoutPlanSqlite({ id, userId, summary, planJson, createdAt }) {
  db.prepare('INSERT INTO workout_plans (id, user_id, summary, plan_json, created_at) VALUES (?, ?, ?, ?, ?)')
    .run(id, userId, summary, JSON.stringify(planJson), createdAt)

  return getWorkoutPlanByIdSqlite(id)
}

export function getLatestPlanByUserIdSqlite(userId) {
  const row = db.prepare('SELECT * FROM workout_plans WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId)
  if (!row) return null
  return {
    ...row,
    plan: JSON.parse(row.plan_json),
  }
}

export function getWorkoutPlanByIdSqlite(id) {
  const row = db.prepare('SELECT * FROM workout_plans WHERE id = ?').get(id)
  if (!row) return null
  return {
    ...row,
    plan: JSON.parse(row.plan_json),
  }
}
