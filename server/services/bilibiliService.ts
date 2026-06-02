import axios from 'axios'
import NodeCache from 'node-cache'

const cache = new NodeCache({
  stdTTL: 300,
})

export interface BilibiliHotItem {
  rank: number
  title: string
  hot: number
  url: string
}

export async function getBilibiliHotSearch(): Promise<BilibiliHotItem[]> {
  const cached = cache.get<BilibiliHotItem[]>('bilibili-hot')

  if (cached) {
    return cached
  }

  const response = await axios.get(
    'https://api.bilibili.com/x/web-interface/ranking/v2?rid=0&type=all',
    {
      headers: {
        Referer: 'https://www.bilibili.com',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36',
      },
    },
  )

  const list = response.data?.data?.list ?? []

  const result: BilibiliHotItem[] = list
    .slice(0, 30)
    .map((item: any, index: number) => ({
      rank: index + 1,
      title: item.title,
      hot: item.stat?.view ?? 0,
      url:
        item.short_link_v2 ||
        item.short_link ||
        `https://www.bilibili.com/video/${item.bvid}`,
    }))

  cache.set('bilibili-hot', result)

  return result
}