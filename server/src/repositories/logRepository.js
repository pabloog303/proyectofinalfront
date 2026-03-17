import { DB_PROVIDER } from '../db/config.js'
import {
  createWorkoutLogSqlite,
  getWorkoutLogsByUserIdSqlite,
} from './sqliteLogRepository.js'
import {
  createWorkoutLogPostgres,
  getWorkoutLogsByUserIdPostgres,
} from './postgresLogRepository.js'

export function createWorkoutLog(payload) {
  return DB_PROVIDER === 'postgres'
    ? createWorkoutLogPostgres(payload)
    : createWorkoutLogSqlite(payload)
}

export function getWorkoutLogsByUserId(userId) {
  return DB_PROVIDER === 'postgres'
    ? getWorkoutLogsByUserIdPostgres(userId)
    : getWorkoutLogsByUserIdSqlite(userId)
}
