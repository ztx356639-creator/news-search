import { HotCard } from './components/HotCard'
import { SiteFooter } from './components/SiteFooter'
import { mockHotTopics } from './data/mockHotTopics'
import './App.css'

function App() {
  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-header__title">今日热搜</h1>
        <p className="page-header__subtitle">
          快速浏览多平台热点，持续关注 AI 与行业动态
        </p>
      </header>

      <main className="hot-grid">
        {mockHotTopics.map((platform) => (
          <HotCard key={platform.id} platform={platform} />
        ))}
      </main>

      <SiteFooter />
    </div>
  )
}

export default App
