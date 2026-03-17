import { getPostgresPool } from '../db/postgres.js'

export async function saveWorkoutPlanPostgres({ id, userId, summary, planJson, createdAt }) {
  await getPostgresPool().query(
    'INSERT INTO workout_plans (id, user_id, summary, plan_json, created_at) VALUES ($1, $2, $3, $4, $5)',
    [id, userId, summary, JSON.stringify(planJson), createdAt],
  )

  return getWorkoutPlanByIdPostgres(id)
}

export async function getLatestPlanByUserIdPostgres(userId) {
  const { rows } = await getPostgresPool().query(
    'SELECT * FROM workout_plans WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
    [userId],
  )
  const row = rows[0]
  if (!row) return null
  return {
    ...row,
    plan: JSON.parse(row.plan_json),
  }
}

export async function getWorkoutPlanByIdPostgres(id) {
  const { rows } = await getPostgresPool().query('SELECT * FROM workout_plans WHERE id = $1 LIMIT 1', [id])
  const row = rows[0]
  if (!row) return null
  return {
    ...row,
    plan: JSON.parse(row.plan_json),
  }
}
