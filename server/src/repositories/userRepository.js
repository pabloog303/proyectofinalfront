import db from '../db/database.js'

export function findUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email)
}

export function findUserById(id) {
  return db.prepare('SELECT id, email, created_at FROM users WHERE id = ?').get(id)
}

export function createUser({ id, email, passwordHash, createdAt }) {
  db.prepare('INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)')
    .run(id, email, passwordHash, createdAt)

  return findUserById(id)
}
