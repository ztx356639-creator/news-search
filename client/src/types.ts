export interface HotItem {
  rank: number
  title: string
  heat: string
  updatedAt: string
}

export interface PlatformHotList {
  id: string
  name: string
  accent: string
  updatedAt: string
  items: HotItem[]
}
