import { apiUrl } from '../config/env'
import type { HotApiResponse } from '../types/hot'

export async function fetchHotData(): Promise<HotApiResponse> {
  const response = await fetch(apiUrl('/api/hot'))

  if (!response.ok) {
    throw new Error('获取热榜失败')
  }

  const data = (await response.json()) as HotApiResponse

  if (!data.success) {
    throw new Error('获取热榜失败')
  }

  return data
}