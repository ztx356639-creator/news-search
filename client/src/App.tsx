import { useEffect, useState } from 'react'
import { HotCard } from './components/HotCard'
import { SiteFooter } from './components/SiteFooter'
import { mockPlatforms } from './mock/hot'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="page">
        <header className="page-header">
          <h1 className="page-header__title">今日热搜</h1>
        </header>

        <main className="hot-grid">
          <HotCard loading />
          <HotCard loading />
          <HotCard loading />
        </main>
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
        {mockPlatforms.map((platform) => (
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