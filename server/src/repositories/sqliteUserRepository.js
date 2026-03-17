import db from '../db/database.js'

export function findUserByEmailSqlite(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email)
}

export function findUserByIdSqlite(id) {
  return db.prepare('SELECT id, email, created_at FROM users WHERE id = ?').get(id)
}

export function createUserSqlite({ id, email, passwordHash, createdAt }) {
  db.prepare('INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)')
    .run(id, email, passwordHash, createdAt)

  return findUserByIdSqlite(id)
}
