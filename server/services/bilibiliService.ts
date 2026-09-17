import axios from 'axios'
import type { HotItem } from '../src/types/hot.js'

type BilibiliRankingItem = {
  title?: unknown
  bvid?: unknown
  short_link_v2?: unknown
  short_link?: unknown
  stat?: {
    view?: unknown
  }
}

type BilibiliResponse = {
  data?: {
    list?: unknown
  }
}

function isRankingItem(value: unknown): value is BilibiliRankingItem {
  return typeof value === 'object' && value !== null
}

function readOptionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

export async function getBilibiliHotSearch(): Promise<HotItem[]> {
  const response = await axios.get<BilibiliResponse>(
    'https://api.bilibili.com/x/web-interface/ranking/v2?rid=0&type=all',
    {
      headers: {
        Referer: 'https://www.bilibili.com',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
      },
    },
  )

  const rawList = response.data?.data?.list
  const list = Array.isArray(rawList) ? rawList.slice(0, 30) : []

  return list.flatMap((value, index) => {
    if (!isRankingItem(value) || typeof value.title !== 'string') {
      return []
    }

    const shortLink =
      readOptionalString(value.short_link_v2) ?? readOptionalString(value.short_link)
    const bvid = readOptionalString(value.bvid)
    const view = value.stat?.view

    return [
      {
        rank: index + 1,
        title: value.title,
        hot: typeof view === 'number' ? view : 0,
        url: shortLink ?? (bvid ? `https://www.bilibili.com/video/${bvid}` : 'https://www.bilibili.com'),
      },
    ]
  })
}
