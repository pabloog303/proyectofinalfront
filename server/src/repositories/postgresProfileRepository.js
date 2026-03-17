import { getPostgresPool } from '../db/postgres.js'

export async function upsertFitnessProfilePostgres(profile) {
  await getPostgresPool().query(
    `INSERT INTO fitness_profiles (
      id, user_id, age, weight_kg, height_cm, level, goal,
      weekly_availability, sessions_duration_min, equipment_json,
      injuries_json, created_at, updated_at
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    ON CONFLICT (user_id) DO UPDATE SET
      age=EXCLUDED.age,
      weight_kg=EXCLUDED.weight_kg,
      height_cm=EXCLUDED.height_cm,
      level=EXCLUDED.level,
      goal=EXCLUDED.goal,
      weekly_availability=EXCLUDED.weekly_availability,
      sessions_duration_min=EXCLUDED.sessions_duration_min,
      equipment_json=EXCLUDED.equipment_json,
      injuries_json=EXCLUDED.injuries_json,
      updated_at=EXCLUDED.updated_at`,
    [
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
    ],
  )

  return getFitnessProfileByUserIdPostgres(profile.userId)
}

export async function getFitnessProfileByUserIdPostgres(userId) {
  const { rows } = await getPostgresPool().query('SELECT * FROM fitness_profiles WHERE user_id = $1 LIMIT 1', [userId])
  const row = rows[0]
  if (!row) return null

  return {
    ...row,
    equipment: JSON.parse(row.equipment_json || '[]'),
    injuries: JSON.parse(row.injuries_json || '[]'),
  }
}
