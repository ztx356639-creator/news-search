import type { Collector, RawArticle } from './types.js'
import { getWeiboHotSearch } from '../../services/weiboService.js'

export const weiboCollector: Collector = {
  id: 'weibo',
  name: '微博',
  async fetch(): Promise<RawArticle[]> {
    const collectedAt = new Date().toISOString()
    const items = await getWeiboHotSearch()

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
