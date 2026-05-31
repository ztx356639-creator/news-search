import HotCard from './HotCard'
import { mockPlatforms } from '../mock/hot'

export default function Home() {
  return (
    <>
      <header>
        <h1>今日热搜</h1>

        <p>
          快速浏览多平台热点
        </p>
      </header>

      <section className="grid">
        {mockPlatforms.map(platform => (
          <HotCard
            key={platform.id}
            platform={platform}
          />
        ))}
      </section>
    </>
  )
}