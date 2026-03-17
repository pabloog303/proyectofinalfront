export const DB_PROVIDER = globalThis.process?.env?.DB_PROVIDER || 'sqlite'

export const POSTGRES_CONFIG = {
  connectionString: globalThis.process?.env?.DATABASE_URL,
  ssl: globalThis.process?.env?.PG_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
}
