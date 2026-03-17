import { Router } from 'express'
import { z } from 'zod'
import { generateWorkoutPlan } from '../ai/fitnessAiService.js'
import { requireAuth } from '../auth/middleware.js'
import { createId } from '../utils/id.js'
import { upsertFitnessProfile, getFitnessProfileByUserId } from '../repositories/profileRepository.js'
import { saveWorkoutPlan, getLatestPlanByUserId } from '../repositories/planRepository.js'
import { createWorkoutLog, getWorkoutLogsByUserId } from '../repositories/logRepository.js'

const router = Router()

const assessmentSchema = z.object({
  age: z.number().min(12).max(90),
  weightKg: z.number().min(30).max(300),
  heightCm: z.number().min(120).max(230),
  level: z.enum(['principiante', 'intermedio', 'avanzado']),
  goal: z.enum(['ganar_musculo', 'perder_grasa', 'resistencia']),
  weeklyAvailability: z.number().min(1).max(7),
  sessionsDurationMin: z.number().min(20).max(180),
  equipment: z.array(z.string()).default([]),
  injuries: z.array(z.string()).default([]),
  history: z.array(z.any()).optional(),
})

const workoutLogSchema = z.object({
  planId: z.string().optional(),
  dayLabel: z.string().min(1),
  completed: z.boolean(),
  perceivedEffort: z.number().min(1).max(10).optional(),
  notes: z.string().optional(),
})

router.post('/fitness-assessment', requireAuth, async (req, res) => {
  const parsed = assessmentSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      error: 'ASSESSMENT_INVALID',
      details: parsed.error.flatten(),
    })
  }

  const now = new Date().toISOString()
  const savedProfile = upsertFitnessProfile({
    id: createId('profile'),
    userId: req.user.userId,
    ...parsed.data,
    createdAt: now,
    updatedAt: now,
  })

  return res.json({
    ok: true,
    profile: savedProfile,
    saved: true,
  })
})

router.post('/generate-workout-plan', requireAuth, async (req, res) => {
  const parsed = assessmentSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({
      error: 'PLAN_GENERATION_INVALID',
      details: parsed.error.flatten(),
    })
  }

  try {
    const history = getWorkoutLogsByUserId(req.user.userId)
    const result = await generateWorkoutPlan({
      ...parsed.data,
      history,
    })
    const planId = createId('plan')
    const persisted = saveWorkoutPlan({
      id: planId,
      userId: req.user.userId,
      summary: result.summary,
      planJson: result,
      createdAt: new Date().toISOString(),
    })

    return res.json({
      ok: true,
      planId,
      persisted,
      ...result,
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: 'PLAN_GENERATION_FAILED',
      message: error.message,
    })
  }
})

router.get('/workout-plan/latest', requireAuth, async (req, res) => {
  const latestPlan = getLatestPlanByUserId(req.user.userId)
  const profile = getFitnessProfileByUserId(req.user.userId)

  return res.json({
    ok: true,
    profile,
    plan: latestPlan,
  })
})

router.post('/workout-log', requireAuth, async (req, res) => {
  const parsed = workoutLogSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: 'WORKOUT_LOG_INVALID', details: parsed.error.flatten() })
  }

  const log = createWorkoutLog({
    id: createId('log'),
    userId: req.user.userId,
    ...parsed.data,
    createdAt: new Date().toISOString(),
  })

  return res.json({ ok: true, log })
})

router.get('/workout-log', requireAuth, async (req, res) => {
  return res.json({
    ok: true,
    logs: getWorkoutLogsByUserId(req.user.userId),
  })
})

export default router
