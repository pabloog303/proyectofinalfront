# AI Fitness Coach MVP

## Incluye
- Frontend React/Vite premium
- Backend Express con SQLite
- Auth JWT
- Módulo AI híbrido (reglas + capa OpenAI opcional)
- Endpoint `POST /api/generate-workout-plan`
- Dashboard AI

## Arquitectura rápida
```text
React/Vite (frontend)
	-> /api/* por proxy Vite
Express backend
	-> SQLite para persistencia
	-> JWT para auth
	-> Motor híbrido AI
	-> OpenAI opcional para enriquecimiento
```

## Scripts
```sh
npm run dev:server
npm run dev
npm run dev:full
npm run test:server
```

## Arranque local
```sh
npm install
cp .env.example .env
npm run dev:full
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:8787`

## Variables de entorno
Copia `.env.example` y añade si quieres OpenAI real:
```sh
OPENAI_API_KEY=...
JWT_SECRET=...
PORT=8787
OPENAI_MODEL=gpt-4.1-mini
DB_PROVIDER=sqlite
# DATABASE_URL=postgres://user:password@host:5432/dbname
```

## Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/fitness-assessment`
- `POST /api/generate-workout-plan`
- `GET /api/workout-plan/latest`
- `POST /api/workout-log`
- `GET /api/workout-log`
- `GET /api/health`

## Docker
```sh
docker compose up --build
```

Esto levanta:
- `postgres` en `localhost:5432`
- `ai-fitness-coach` en `localhost:5173` y `localhost:8787`

### Smoke test recomendado
```sh
curl http://localhost:8787/api/health
```

## PostgreSQL (activo por provider)
El proyecto sigue funcionando con SQLite por defecto para no romper el MVP.
Ahora también incluye repositorios duales y arranque real en PostgreSQL si defines el provider.

Si quieres preparar despliegue con PostgreSQL:
```sh
DB_PROVIDER=postgres
DATABASE_URL=postgres://user:password@host:5432/dbname
PG_SSL=true
```

Con eso, el backend inicializa el schema básico automáticamente al arrancar.

`docker-compose.yml` ya está configurado para ejecutar el backend con PostgreSQL automáticamente.

## Deploy rápido
Incluye `render.yaml` para despliegue base en Render.

Variables mínimas en producción:
```sh
JWT_SECRET=super-secret
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini
PORT=8787
```

## Notas
- Si no defines `OPENAI_API_KEY`, el sistema usa motor híbrido determinista + recomendaciones locales.
- La base SQLite se crea en `data/aifitness.sqlite`.
- El healthcheck informa si OpenAI está configurado o no.
- Para producción real, conviene migrar de SQLite a PostgreSQL y separar frontend/backend.
- Hay tests backend mínimos del motor AI usando `vitest`.
