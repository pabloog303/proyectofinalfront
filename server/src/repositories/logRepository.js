import db from '../db/database.js'

export function createWorkoutLog(log) {
  db.prepare(`
    INSERT INTO workout_logs (id, user_id, plan_id, day_label, completed, perceived_effort, notes, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    log.id,
    log.userId,
    log.planId || null,
    log.dayLabel,
    log.completed ? 1 : 0,
    log.perceivedEffort || null,
    log.notes || '',
    log.createdAt,
  )

  return log
}

export function getWorkoutLogsByUserId(userId) {
  return db.prepare('SELECT * FROM workout_logs WHERE user_id = ? ORDER BY created_at DESC').all(userId)
}
