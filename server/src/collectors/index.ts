import type { Collector } from './types.js'
import { bilibiliCollector } from './bilibiliCollector.js'
import { weiboCollector } from './weiboCollector.js'
import { zhihuCollector } from './zhihuCollector.js'

export type { Collector, RawArticle } from './types.js'

export const collectors: Collector[] = [
  weiboCollector,
  zhihuCollector,
  bilibiliCollector,
]
