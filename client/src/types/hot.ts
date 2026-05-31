export interface HotItem {
  // 排名
  rank: number

  // 标题
  title: string

  // 热度（可选）
  heat?: string

  // 跳转链接
  url: string
}

export interface PlatformHotList {
  // 平台ID
  id: string

  // 平台名称
  name: string

  // 卡片主题色
  accent: string

  // 更新时间
  updatedAt: string

  // 热榜列表
  items: HotItem[]
}