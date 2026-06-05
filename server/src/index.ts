import cors from 'cors'
import express from 'express'
import { getCached, setCached } from './cache.js'
import { config } from './config.js'
import { getWeiboHotSearch } from '../services/weiboService.js'
import { getZhihuHotSearch } from '../services/zhihuService.js'
import { getBilibiliHotSearch } from '../services/bilibiliService.js'

const app = express()
const startedAt = Date.now()
const HOT_CACHE_KEY = 'api:hot'

type HotItem = {
  rank: number
  title: string
  hot: string | number
  url: string
}

type HotPlatform = {
  id: string
  name: string
  items: HotItem[]
  error?: string
}

type HotResponse = {
  success: boolean
  updatedAt: string
  platforms: HotPlatform[]
}

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

async function safeLoadPlatform(
  id: string,
  name: string,
  loader: () => Promise<HotItem[]>,
): Promise<HotPlatform> {
  try {
    const items = await loader()

    return {
      id,
      name,
      items,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    console.error(
      JSON.stringify({
        platform: id,
        error: message,
      }),
    )

    return {
      id,
      name,
      items: [],
      error: message,
    }
  }
}

app.get('/api/hot', async (_req, res) => {
  const start = Date.now()

  try {
    const cached = getCached<HotResponse>(HOT_CACHE_KEY)
    const cacheHit = Boolean(cached)

    const body: HotResponse =
      cached ??
      {
        success: true,
        updatedAt: new Date().toISOString(),
        platforms: await Promise.all([
          safeLoadPlatform('weibo', '微博', getWeiboHotSearch),
          safeLoadPlatform('zhihu', '知乎', getZhihuHotSearch),
          safeLoadPlatform('bilibili', 'B站', getBilibiliHotSearch),
        ]),
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

app.listen(config.port, '0.0.0.0', () => {
  console.log(
    `API http://localhost:${config.port}  CORS ${config.clientOrigin}  CACHE_TTL ${config.cacheTtlSeconds}s`,
  )
})
