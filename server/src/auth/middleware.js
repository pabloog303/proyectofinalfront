import { verifyToken } from './jwt.js'

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ ok: false, error: 'UNAUTHORIZED' })
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const payload = verifyToken(token)
    req.user = payload
    return next()
  } catch {
    return res.status(401).json({ ok: false, error: 'INVALID_TOKEN' })
  }
}
