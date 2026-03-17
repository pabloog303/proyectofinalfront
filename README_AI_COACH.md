# AI Fitness Coach MVP

## Incluye
- Frontend React/Vite premium
- Backend Express con SQLite
- Auth JWT
- Módulo AI híbrido (reglas + capa OpenAI opcional)
- Endpoint `POST /api/generate-workout-plan`
- Dashboard AI

## Scripts
```sh
npm run dev:server
npm run dev
npm run dev:full
```

## Variables de entorno
Copia `.env.example` y añade si quieres OpenAI real:
```sh
OPENAI_API_KEY=...
JWT_SECRET=...
PORT=8787
```

## Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/fitness-assessment`
- `POST /api/generate-workout-plan`
- `GET /api/workout-plan/latest`
- `POST /api/workout-log`

## Notas
- Si no defines `OPENAI_API_KEY`, el sistema usa motor híbrido determinista + recomendaciones locales.
- La base SQLite se crea en `data/aifitness.sqlite`.
