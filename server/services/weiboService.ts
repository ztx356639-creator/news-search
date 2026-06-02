import axios from 'axios'
import NodeCache from 'node-cache'

const cache = new NodeCache({
  stdTTL: 300,
})

export async function getWeiboHotSearch() {
  const cached = cache.get('weibo-hot')

  if (cached) {
    return cached
  }

  const response = await axios.get(
    'https://weibo.com/ajax/side/hotSearch',
    {
      headers: {
        Referer: 'https://weibo.com/',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
      },
    },
  )

  const list =
    response.data?.data?.realtime ?? []

  const result = list.map(
    (item: any, index: number) => ({
      rank: index + 1,
      title: item.word,
      hot: item.num || 0,
      url: `https://s.weibo.com/weibo?q=${encodeURIComponent(item.word)}`,
    }),
  )

  cache.set('weibo-hot', result)

  return result
}