import { Router } from 'express'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { createId } from '../utils/id.js'
import { createUser, findUserByEmail } from '../repositories/userRepository.js'
import { signToken } from '../auth/jwt.js'

const router = Router()

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

router.post('/register', async (req, res) => {
  const parsed = authSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: 'INVALID_REGISTER_PAYLOAD', details: parsed.error.flatten() })
  }

  const existing = await findUserByEmail(parsed.data.email)
  if (existing) {
    return res.status(409).json({ ok: false, error: 'EMAIL_ALREADY_EXISTS' })
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10)
  const createdAt = new Date().toISOString()
  const user = await createUser({
    id: createId('usr'),
    email: parsed.data.email,
    passwordHash,
    createdAt,
  })

  const token = signToken({ userId: user.id, email: user.email })
  return res.json({ ok: true, token, user })
})

router.post('/login', async (req, res) => {
  const parsed = authSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: 'INVALID_LOGIN_PAYLOAD', details: parsed.error.flatten() })
  }

  const user = await findUserByEmail(parsed.data.email)
  if (!user) {
    return res.status(401).json({ ok: false, error: 'INVALID_CREDENTIALS' })
  }

  const valid = await bcrypt.compare(parsed.data.password, user.password_hash)
  if (!valid) {
    return res.status(401).json({ ok: false, error: 'INVALID_CREDENTIALS' })
  }

  const token = signToken({ userId: user.id, email: user.email })
  return res.json({ ok: true, token, user: { id: user.id, email: user.email, created_at: user.created_at } })
})

export default router
