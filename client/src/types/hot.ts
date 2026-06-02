export interface HotItem {
  rank: number
  title: string
  heat?: string
  url: string
}

export type PlatformStatus = 'ok' | 'error' | 'stale'

export interface PlatformHotList {
  id: string
  name: string
  accent: string
  status?: PlatformStatus
  updatedAt: string
  items: HotItem[]
}

export interface HotApiResponse {
  success: boolean
  updatedAt: string
  platforms: PlatformHotList[]
}