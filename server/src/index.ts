import cors from 'cors'
import express from 'express'
import { getCached, setCached } from './cache.js'
import { config } from './config.js'
import { buildHotResponse } from './data/mockHotTopics.js'

const app = express()
const startedAt = Date.now()
const HOT_CACHE_KEY = 'api:hot'

app.use(
  cors({
    origin: config.clientOrigin,
  }),
)

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: Math.floor((Date.now() - startedAt) / 1000),
  })
})

app.get('/api/hot', (req, res) => {
  const start = Date.now()
  const cached = getCached<ReturnType<typeof buildHotResponse>>(HOT_CACHE_KEY)
  const cacheHit = Boolean(cached)

  const body = cached ?? buildHotResponse()
  if (!cached) {
    setCached(HOT_CACHE_KEY, body, config.cacheTtlSeconds)
  }

  const durationMs = Date.now() - start
  console.log(
    JSON.stringify({
      path: '/api/hot',
      status: 200,
      duration_ms: durationMs,
      cache_hit: cacheHit,
    }),
  )

  res.setHeader(
    'Cache-Control',
    `public, max-age=${config.cacheTtlSeconds}`,
  )
  res.json(body)
})

app.listen(config.port, () => {
  console.log(
    `API http://localhost:${config.port}  CORS ${config.clientOrigin}  CACHE_TTL ${config.cacheTtlSeconds}s`,
  )
})
