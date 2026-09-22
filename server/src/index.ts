import cors from 'cors'
import express from 'express'
import { getCached, setCached } from './cache.js'
import { config } from './config.js'
import type { HotItem, HotPlatform, HotResponse } from './types/hot.js'
import { collectors, type Collector, type RawArticle } from './collectors/index.js'

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

function toHotItems(articles: RawArticle[]): HotItem[] {
  return articles.map((article, index) => ({
    rank: article.rank ?? index + 1,
    title: article.title,
    hot: article.metric ?? 0,
    url: article.url,
  }))
}

async function safeLoadPlatform(collector: Collector): Promise<HotPlatform> {
  try {
    const articles = await collector.fetch()

    return {
      id: collector.id,
      name: collector.name,
      items: toHotItems(articles),
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    console.error(
      JSON.stringify({
        platform: collector.id,
        error: message,
      }),
    )

    return {
      id: collector.id,
      name: collector.name,
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
        platforms: await Promise.all(collectors.map(safeLoadPlatform)),
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
