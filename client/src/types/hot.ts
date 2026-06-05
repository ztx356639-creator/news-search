export type HotItem = {
  rank: number
  title: string
  hot: string | number
  url: string
}

export type PlatformHotList = {
  id: string
  name: string
  items: HotItem[]
  error?: string
}

export type HotApiResponse = {
  success: boolean
  updatedAt: string
  platforms: PlatformHotList[]
}
