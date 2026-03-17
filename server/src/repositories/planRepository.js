import { DB_PROVIDER } from '../db/config.js'
import {
  getLatestPlanByUserIdSqlite,
  getWorkoutPlanByIdSqlite,
  saveWorkoutPlanSqlite,
} from './sqlitePlanRepository.js'
import {
  getLatestPlanByUserIdPostgres,
  getWorkoutPlanByIdPostgres,
  saveWorkoutPlanPostgres,
} from './postgresPlanRepository.js'

export function saveWorkoutPlan(payload) {
  return DB_PROVIDER === 'postgres'
    ? saveWorkoutPlanPostgres(payload)
    : saveWorkoutPlanSqlite(payload)
}

export function getLatestPlanByUserId(userId) {
  return DB_PROVIDER === 'postgres'
    ? getLatestPlanByUserIdPostgres(userId)
    : getLatestPlanByUserIdSqlite(userId)
}

export function getWorkoutPlanById(id) {
  return DB_PROVIDER === 'postgres'
    ? getWorkoutPlanByIdPostgres(id)
    : getWorkoutPlanByIdSqlite(id)
}
