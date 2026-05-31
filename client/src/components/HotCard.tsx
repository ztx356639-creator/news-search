import type { CSSProperties } from 'react'
import type { PlatformHotList } from '../types/hot'
import './HotCard.css'

interface HotCardProps {
  platform?: PlatformHotList
  loading?: boolean
  error?: boolean
  message?: string
  onRetry?: () => void
}

export function HotCard({
  platform,
  loading = false,
  error = false,
  message = '获取数据失败',
  onRetry
}: HotCardProps) {
  if (loading) {
    return (
      <article className="hot-card">
        <div className="hot-card__loading">
          加载中...
        </div>
      </article>
    )
  }

  if (error) {
    return (
      <article className="hot-card">
        <div className="hot-card__error">
          <p>{message}</p>

          {onRetry && (
            <button
              type="button"
              className="hot-card__retry"
              onClick={onRetry}
            >
              重试
            </button>
          )}
        </div>
      </article>
    )
  }

  if (!platform) {
    return (
      <article className="hot-card">
        <div className="hot-card__error">
          <p>暂无平台数据</p>
        </div>
      </article>
    )
  }

  return (
    <article
      className="hot-card"
      style={{ '--card-accent': platform.accent } as CSSProperties}
    >
      <header className="hot-card__header">
        <h2 className="hot-card__title">
          {platform.name}
        </h2>
      </header>

      <ul className="hot-card__list">
        {platform.items.length > 0 ? (
          platform.items.map((item) => (
            <li
              key={item.rank}
              className={`hot-card__item${
                item.rank <= 3 ? ' hot-card__item--top' : ''
              }`}
            >
              <span
                className={`hot-card__rank${
                  item.rank <= 3 ? ' hot-card__rank--top' : ''
                }`}
                aria-hidden
              >
                {item.rank}
              </span>

              <div className="hot-card__body">
                <a
                  className="hot-card__link"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>

                {item.heat && (
                  <span className="hot-card__heat">
                    {item.heat}
                  </span>
                )}
              </div>
            </li>
          ))
        ) : (
          <li className="hot-card__item">
            <div className="hot-card__body">
              暂无数据
            </div>
          </li>
        )}
      </ul>

      <footer className="hot-card__footer">
        <span className="hot-card__footer-label">
          更新时间：
        </span>

        <time dateTime={platform.updatedAt}>
          {platform.updatedAt}
        </time>
      </footer>
    </article>
  )
}

