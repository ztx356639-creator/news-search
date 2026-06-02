import { useEffect, useState } from 'react'
import { HotCard } from './components/HotCard'
import { SiteFooter } from './components/SiteFooter'
import { fetchHotPlatforms } from './api/hot'
import type { PlatformHotList } from './types/hot'
import './App.css'

function App() {
  const [platforms, setPlatforms] = useState<PlatformHotList[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchHotPlatforms()
        setPlatforms(data)
      } catch {
        setError('获取热榜失败，请检查后端服务是否启动')
      } finally {
        setLoading(false)
      }
    }

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
            onRetry={() => window.location.reload()}
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
      </header>

      <main className="hot-grid">
        {platforms.map((platform) => (
          <HotCard
            key={platform.id}
            platform={platform}
          />
        ))}
      </main>

      <SiteFooter />
    </div>
  )
}

export default App