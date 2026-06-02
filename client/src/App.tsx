import { useEffect, useState } from 'react'
import { HotCard } from './components/HotCard'
import { SiteFooter } from './components/SiteFooter'
import { fetchHotData } from './api/hot'
import type { HotApiResponse, PlatformHotList } from './types/hot'
import './App.css'

function formatUpdateTime(value: string) {
  if (!value) return '未知'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '未知'
  }

  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function App() {
  const [platforms, setPlatforms] = useState<PlatformHotList[]>([])
  const [updatedAt, setUpdatedAt] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadData() {
    try {
      setLoading(true)
      setError('')

      const data: HotApiResponse = await fetchHotData()

      setPlatforms(data.platforms)
      setUpdatedAt(data.updatedAt)
    } catch {
      setError('获取热榜失败，请检查后端服务是否启动')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="page">
        <header className="page-header">
          <h1 className="page-header__title">今日热搜</h1>
          <p className="page-header__subtitle">
            快速浏览多平台热点，持续关注 AI 与行业动态
          </p>
          <p className="page-header__meta">正在加载最新热榜...</p>
        </header>

        <main className="hot-grid">
          <HotCard loading />
          <HotCard loading />
          <HotCard loading />
        </main>

        <SiteFooter />
      </div>
    )
  }

  if (error) {
    return (
      <div className="page">
        <header className="page-header">
          <h1 className="page-header__title">今日热搜</h1>
          <p className="page-header__subtitle">
            快速浏览多平台热点，持续关注 AI 与行业动态
          </p>
        </header>

        <main className="hot-grid">
          <HotCard
            error
            message={error}
            onRetry={loadData}
          />
        </main>

        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-header__title">今日热搜</h1>
        <p className="page-header__subtitle">
          快速浏览多平台热点，持续关注 AI 与行业动态
        </p>
        <p className="page-header__meta">
          最后更新：{formatUpdateTime(updatedAt)}
          <button
            className="refresh-button"
            type="button"
            onClick={loadData}
          >
            刷新
          </button>
        </p>
      </header>

      <main className="hot-grid">
        {platforms.map((platform) => (
          <HotCard
            key={platform.id}
            platform={platform}
            updatedAt={updatedAt}
          />
        ))}
      </main>

      <SiteFooter />
    </div>
  )
}

export default App