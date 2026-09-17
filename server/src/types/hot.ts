export type HotItem = {
  rank: number
  title: string
  hot: string | number
  url: string
}

export type HotPlatform = {
  id: string
  name: string
  items: HotItem[]
  error?: string
}

export type HotResponse = {
  success: boolean
  updatedAt: string
  platforms: HotPlatform[]
}
