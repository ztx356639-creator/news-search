import type { Collector, RawArticle } from './types.js'
import { getBilibiliHotSearch } from '../../services/bilibiliService.js'

export const bilibiliCollector: Collector = {
  id: 'bilibili',
  name: 'B站',
  async fetch(): Promise<RawArticle[]> {
    const collectedAt = new Date().toISOString()
    const items = await getBilibiliHotSearch()

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
