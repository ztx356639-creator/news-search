import axios from 'axios'
import type { HotItem } from '../src/types/hot.js'

type WeiboRealtimeItem = {
  word?: unknown
  num?: unknown
}

type WeiboResponse = {
  data?: {
    realtime?: unknown
  }
}

function isWeiboRealtimeItem(value: unknown): value is WeiboRealtimeItem {
  return typeof value === 'object' && value !== null
}

export async function getWeiboHotSearch(): Promise<HotItem[]> {
  const response = await axios.get<WeiboResponse>(
    'https://weibo.com/ajax/side/hotSearch',
    {
      headers: {
        Referer: 'https://weibo.com/',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
      },
    },
  )

  const rawList = response.data?.data?.realtime
  const list = Array.isArray(rawList) ? rawList : []

  return list.flatMap((value, index) => {
    if (!isWeiboRealtimeItem(value) || typeof value.word !== 'string') {
      return []
    }

    return [
      {
        rank: index + 1,
        title: value.word,
        hot:
          typeof value.num === 'number' || typeof value.num === 'string'
            ? value.num
            : 0,
        url: `https://s.weibo.com/weibo?q=${encodeURIComponent(value.word)}`,
      },
    ]
  })
}
