import { DB_PROVIDER } from '../db/config.js'
import {
  getFitnessProfileByUserIdSqlite,
  upsertFitnessProfileSqlite,
} from './sqliteProfileRepository.js'
import {
  getFitnessProfileByUserIdPostgres,
  upsertFitnessProfilePostgres,
} from './postgresProfileRepository.js'

export function upsertFitnessProfile(profile) {
  return DB_PROVIDER === 'postgres'
    ? upsertFitnessProfilePostgres(profile)
    : upsertFitnessProfileSqlite(profile)
}

export function getFitnessProfileByUserId(userId) {
  return DB_PROVIDER === 'postgres'
    ? getFitnessProfileByUserIdPostgres(userId)
    : getFitnessProfileByUserIdSqlite(userId)
}
