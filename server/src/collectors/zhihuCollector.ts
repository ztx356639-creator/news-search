import type { Collector, RawArticle } from './types.js'
import { getZhihuHotSearch } from '../../services/zhihuService.js'

export const zhihuCollector: Collector = {
  id: 'zhihu',
  name: '知乎',
  async fetch(): Promise<RawArticle[]> {
    const collectedAt = new Date().toISOString()
    const items = await getZhihuHotSearch()

    return items.map((item) => ({
      sourceId: this.id,
      sourceName: this.name,
      title: item.title,
      url: item.url,
      rank: item.rank,
      metric: item.hot,
      collectedAt,
    }))
  },
}
