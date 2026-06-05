import 'dotenv/config'

function readNumber(name: string, fallback: number): number {
  const raw = process.env[name]
  if (raw === undefined || raw === '') return fallback
  const n = Number(raw)
  return Number.isFinite(n) ? n : fallback
}

export const config = {
  port: readNumber('PORT', 3001),
  cacheTtlSeconds: readNumber('CACHE_TTL', 600),
  clientOrigin: process.env.CLIENT_ORIGIN ?? '*',
} as const
