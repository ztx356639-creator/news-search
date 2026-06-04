import { useEffect, useMemo, useState } from 'react'
import { HotCard } from './components/HotCard'
import { SiteFooter } from './components/SiteFooter'
import { fetchHotData } from './api/hot'
import type { HotApiResponse, PlatformHotList } from './types/hot'
import './App.css'

function formatUpdateTime(value: string) {
  if (!value) return '未知'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return '未知'

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
  const [keyword, setKeyword] = useState('')
  const [activePlatform, setActivePlatform] = useState('all')

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

    const timer = setInterval(() => {
      loadData()
    }, 300000)

    return () => clearInterval(timer)
  }, [])

  const filteredPlatforms = useMemo(() => {
    return platforms
      .filter((platform) => {
        if (activePlatform === 'all') return true
        return platform.id === activePlatform
      })
      .map((platform) => ({
        ...platform,
        items: platform.items.filter((item) =>
          item.title.toLowerCase().includes(keyword.trim().toLowerCase()),
        ),
      }))
  }, [platforms, keyword, activePlatform])

  const totalItems = platforms.reduce(
    (sum, platform) => sum + platform.items.length,
    0,
  )

  const hasResult = filteredPlatforms.some((platform) => platform.items.length > 0)

  return (
    <div className="page">
      <header className="hero">
        <div className="hero__badge">⚡ Real-time Trends Dashboard</div>

        <h1 className="hero__title">今日热搜</h1>

        <p className="hero__subtitle">
          聚合微博、知乎、B站热点内容，快速捕捉全网正在发生的事。
        </p>

        <div className="hero__stats">
          <div className="stat-card">
            <span className="stat-card__label">平台数量</span>
            <strong>{platforms.length}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-card__label">热搜条目</span>
            <strong>{totalItems}</strong>
          </div>

          <div className="stat-card">
            <span className="stat-card__label">更新频率</span>
            <strong>5min</strong>
          </div>
        </div>

        <div className="toolbar">
          <div className="search-box">
            <span>⌕</span>
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="搜索热搜关键词..."
            />
          </div>

          <button
            className="refresh-button"
            type="button"
            onClick={loadData}
          >
            刷新
          </button>
        </div>

        <div className="platform-tabs">
          <button
            className={activePlatform === 'all' ? 'active' : ''}
            onClick={() => setActivePlatform('all')}
            type="button"
          >
            全部
          </button>

          {platforms.map((platform) => (
            <button
              className={activePlatform === platform.id ? 'active' : ''}
              key={platform.id}
              onClick={() => setActivePlatform(platform.id)}
              type="button"
            >
              {platform.name}
            </button>
          ))}
        </div>

        <p className="hero__meta">
          最后更新：{formatUpdateTime(updatedAt)}
        </p>
      </header>

      {loading ? (
        <main className="hot-grid">
          <HotCard loading />
          <HotCard loading />
          <HotCard loading />
        </main>
      ) : error ? (
        <main className="hot-grid">
          <HotCard
            error
            message={error}
            onRetry={loadData}
          />
        </main>
      ) : !hasResult ? (
        <main className="empty-result">
          <div className="empty-result__icon">🔍</div>
          <h2>没有找到相关热搜</h2>
          <p>换个关键词试试，或者切换平台查看。</p>
        </main>
      ) : (
        <main className="hot-grid">
          {filteredPlatforms.map((platform) => (
            <HotCard
              key={platform.id}
              platform={platform}
              updatedAt={updatedAt}
            />
          ))}
        </main>
      )}

      <SiteFooter />
    </div>
  )
}

export default App