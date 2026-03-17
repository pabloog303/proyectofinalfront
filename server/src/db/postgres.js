import { Pool } from 'pg'
import { POSTGRES_CONFIG } from './config.js'

let pool = null

export function getPostgresPool() {
  if (!pool) {
    pool = new Pool(POSTGRES_CONFIG)
  }
  return pool
}

export async function pingPostgres() {
  const client = await getPostgresPool().connect()
  try {
    await client.query('SELECT 1')
    return true
  } finally {
    client.release()
  }
}
