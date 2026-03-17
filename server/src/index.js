import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fitnessRoutes from './routes/fitness.js'
import authRoutes from './routes/auth.js'
import { DB_PROVIDER } from './db/config.js'
import { initPostgresSchema } from './db/initPostgres.js'

dotenv.config()

const app = express()
const PORT = globalThis.process?.env?.PORT || 8787

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'ai-fitness-backend',
    timestamp: new Date().toISOString(),
  dbProvider: DB_PROVIDER,
    llmConfigured: Boolean(globalThis.process?.env?.OPENAI_API_KEY),
    llmModel: globalThis.process?.env?.OPENAI_MODEL || 'gpt-4.1-mini',
    environment: globalThis.process?.env?.NODE_ENV || 'development',
  })
})

app.use('/api/auth', authRoutes)
app.use('/api', fitnessRoutes)

async function start() {
  if (DB_PROVIDER === 'postgres') {
    await initPostgresSchema()
  }

  app.listen(PORT, () => {
    console.log(`AI Fitness backend running on http://localhost:${PORT}`)
  })
}

start().catch((error) => {
  console.error('Failed to start backend:', error)
  globalThis.process?.exit(1)
})
