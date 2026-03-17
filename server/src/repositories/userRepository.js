import { DB_PROVIDER } from '../db/config.js'
import {
  createUserSqlite,
  findUserByEmailSqlite,
  findUserByIdSqlite,
} from './sqliteUserRepository.js'
import {
  createUserPostgres,
  findUserByEmailPostgres,
  findUserByIdPostgres,
} from './postgresUserRepository.js'

export function findUserByEmail(email) {
  return DB_PROVIDER === 'postgres'
    ? findUserByEmailPostgres(email)
    : findUserByEmailSqlite(email)
}

export function findUserById(id) {
  return DB_PROVIDER === 'postgres'
    ? findUserByIdPostgres(id)
    : findUserByIdSqlite(id)
}

export function createUser(payload) {
  return DB_PROVIDER === 'postgres'
    ? createUserPostgres(payload)
    : createUserSqlite(payload)
}
