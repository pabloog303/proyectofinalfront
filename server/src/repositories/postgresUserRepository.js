import { getPostgresPool } from '../db/postgres.js'

export async function findUserByEmailPostgres(email) {
  const { rows } = await getPostgresPool().query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email])
  return rows[0] || null
}

export async function findUserByIdPostgres(id) {
  const { rows } = await getPostgresPool().query('SELECT id, email, created_at FROM users WHERE id = $1 LIMIT 1', [id])
  return rows[0] || null
}

export async function createUserPostgres({ id, email, passwordHash, createdAt }) {
  await getPostgresPool().query(
    'INSERT INTO users (id, email, password_hash, created_at) VALUES ($1, $2, $3, $4)',
    [id, email, passwordHash, createdAt],
  )

  return findUserByIdPostgres(id)
}
