import { getPostgresPool } from '../db/postgres.js'

export async function createWorkoutLogPostgres(log) {
  await getPostgresPool().query(
    `INSERT INTO workout_logs (id, user_id, plan_id, day_label, completed, perceived_effort, notes, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      log.id,
      log.userId,
      log.planId || null,
      log.dayLabel,
      log.completed ? 1 : 0,
      log.perceivedEffort || null,
      log.notes || '',
      log.createdAt,
    ],
  )

  return log
}

export async function getWorkoutLogsByUserIdPostgres(userId) {
  const { rows } = await getPostgresPool().query(
    'SELECT * FROM workout_logs WHERE user_id = $1 ORDER BY created_at DESC',
    [userId],
  )
  return rows
}
