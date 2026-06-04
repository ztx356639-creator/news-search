import NodeCache from 'node-cache'

interface HotItem {
  rank: number
  title: string
  hot: string | number
  url: string
}

const cache = new NodeCache({
  stdTTL: 300,
})

export async function getZhihuHotSearch(): Promise<HotItem[]> {
  const cached = cache.get<HotItem[]>('zhihu-hot')

  if (cached) {
    return cached
  }

  const result: HotItem[] = [
    {
      rank: 1,
      title: '知乎热榜接口维护中',
      hot: '待接入',
      url: 'https://www.zhihu.com/hot',
    },
    {
      rank: 2,
      title: '后续将替换为真实热榜',
      hot: '待接入',
      url: 'https://www.zhihu.com/hot',
    },
  ]

  cache.set('zhihu-hot', result)

  return result
}