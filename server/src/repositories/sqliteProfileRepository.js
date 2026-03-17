import db from '../db/database.js'

export function upsertFitnessProfileSqlite(profile) {
  db.prepare(`
    INSERT INTO fitness_profiles (
      id, user_id, age, weight_kg, height_cm, level, goal,
      weekly_availability, sessions_duration_min, equipment_json,
      injuries_json, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      age=excluded.age,
      weight_kg=excluded.weight_kg,
      height_cm=excluded.height_cm,
      level=excluded.level,
      goal=excluded.goal,
      weekly_availability=excluded.weekly_availability,
      sessions_duration_min=excluded.sessions_duration_min,
      equipment_json=excluded.equipment_json,
      injuries_json=excluded.injuries_json,
      updated_at=excluded.updated_at
  `).run(
    profile.id,
    profile.userId,
    profile.age,
    profile.weightKg,
    profile.heightCm,
    profile.level,
    profile.goal,
    profile.weeklyAvailability,
    profile.sessionsDurationMin,
    JSON.stringify(profile.equipment || []),
    JSON.stringify(profile.injuries || []),
    profile.createdAt,
    profile.updatedAt,
  )

  return db.prepare('SELECT * FROM fitness_profiles WHERE user_id = ?').get(profile.userId)
}

export function getFitnessProfileByUserIdSqlite(userId) {
  const row = db.prepare('SELECT * FROM fitness_profiles WHERE user_id = ?').get(userId)
  if (!row) return null
  return {
    ...row,
    equipment: JSON.parse(row.equipment_json || '[]'),
    injuries: JSON.parse(row.injuries_json || '[]'),
  }
}
