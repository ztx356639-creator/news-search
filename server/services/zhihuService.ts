import type { HotItem } from '../src/types/hot.js'

export async function getZhihuHotSearch(): Promise<HotItem[]> {
  return [
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
}
