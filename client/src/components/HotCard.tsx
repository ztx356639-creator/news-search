import type { CSSProperties } from 'react'
import type { PlatformHotList } from '../types'
import './HotCard.css'

interface HotCardProps {
  platform: PlatformHotList
}

export function HotCard({ platform }: HotCardProps) {
  return (
    <article
      className="hot-card"
      style={{ '--card-accent': platform.accent } as CSSProperties}
    >
      <header className="hot-card__header">
        <h2 className="hot-card__title">{platform.name}</h2>
      </header>

      <ol className="hot-card__list">
        {platform.items.map((item) => (
          <li
            key={item.rank}
            className={`hot-card__item${item.rank <= 3 ? ' hot-card__item--top' : ''}`}
          >
            <span
              className={`hot-card__rank${item.rank <= 3 ? ' hot-card__rank--top' : ''}`}
              aria-hidden
            >
              {item.rank}
            </span>
            <div className="hot-card__body">
              <a className="hot-card__link" href="#">
                {item.title}
              </a>
              <span className="hot-card__heat">{item.heat}</span>
            </div>
          </li>
        ))}
      </ol>

      <footer className="hot-card__footer">
        <span className="hot-card__footer-label">更新时间：</span>
        <time dateTime={platform.updatedAt}>{platform.updatedAt}</time>
      </footer>
    </article>
  )
}
