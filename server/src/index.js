import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fitnessRoutes from './routes/fitness.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()
const PORT = globalThis.process?.env?.PORT || 8787

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'ai-fitness-backend', timestamp: new Date().toISOString() })
})

app.use('/api/auth', authRoutes)
app.use('/api', fitnessRoutes)

app.listen(PORT, () => {
  console.log(`AI Fitness backend running on http://localhost:${PORT}`)
})
