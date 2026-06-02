import cors from 'cors'
import express from 'express'
import { getCached, setCached } from './cache.js'
import { config } from './config.js'
import { getWeiboHotSearch } from '../services/weiboService.js'

const app = express()
const startedAt = Date.now()
const HOT_CACHE_KEY = 'api:hot'

app.use(
  cors({
    origin: config.clientOrigin,
  }),
)

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    status: 'ok',
    uptime: Math.floor((Date.now() - startedAt) / 1000),
  })
})

app.get('/api/hot', async (_req, res) => {
  const start = Date.now()

  try {
    const cached = getCached<{
      success: boolean
      updatedAt: string
      platforms: Array<{
        id: string
        name: string
        items: Awaited<ReturnType<typeof getWeiboHotSearch>>
      }>
    }>(HOT_CACHE_KEY)

    const cacheHit = Boolean(cached)

    const body =
      cached ??
      {
        success: true,
        updatedAt: new Date().toISOString(),
        platforms: [
          {
            id: 'weibo',
            name: '微博',
            items: await getWeiboHotSearch(),
          },
        ],
      }

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
  } catch (error) {
    const durationMs = Date.now() - start

    console.error(
      JSON.stringify({
        path: '/api/hot',
        status: 500,
        duration_ms: durationMs,
        error: error instanceof Error ? error.message : String(error),
      }),
    )

    res.status(500).json({
      success: false,
      message: '获取热榜失败',
      platforms: [],
    })
  }
})

app.listen(config.port, () => {
  console.log(
    `API http://localhost:${config.port}  CORS ${config.clientOrigin}  CACHE_TTL ${config.cacheTtlSeconds}s`,
  )
})