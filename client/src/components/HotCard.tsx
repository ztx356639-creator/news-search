import type { PlatformHotList } from '../types/hot'
import './HotCard.css'

type HotCardProps = {
  platform?: PlatformHotList
  loading?: boolean
  error?: boolean
  message?: string
  updatedAt?: string
  onRetry?: () => void
}

type DisplayHotItem = {
  rank: number
  title: string
  hot: string | number
  url: string
}

function formatHot(value: string | number) {
  if (typeof value === 'number') {
    return value >= 10000 ? `${(value / 10000).toFixed(1)}万` : `${value}`
  }

  return value || '暂无热度'
}

function getPlatformIcon(id?: string) {
  if (id === 'weibo') return '🔥'
  if (id === 'zhihu') return '💡'
  if (id === 'bilibili') return '📺'
  return '📌'
}

function getPlatformClassName(id?: string) {
  if (id === 'weibo') return 'platform-badge platform-badge--weibo'
  if (id === 'zhihu') return 'platform-badge platform-badge--zhihu'
  if (id === 'bilibili') return 'platform-badge platform-badge--bilibili'

  return 'platform-badge'
}

function getRankClassName(index: number) {
  if (index === 0) return 'hot-item__rank top1'
  if (index === 1) return 'hot-item__rank top2'
  if (index === 2) return 'hot-item__rank top3'

  return 'hot-item__rank'
}

export function HotCard({
  platform,
  loading = false,
  error = false,
  message = '',
  onRetry,
}: HotCardProps) {
  if (loading) {
    return (
      <section className="hot-card">
        <div className="hot-card__header">
          <div className="skeleton skeleton-title" />
        </div>

        <div className="hot-card__body">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              className="hot-item hot-item--loading"
              key={index}
            >
              <div className="skeleton skeleton-rank" />
              <div className="skeleton skeleton-line" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="hot-card hot-card--error">
        <div className="hot-card__empty">
          <p>{message || '加载失败'}</p>

          {onRetry && (
            <button
              className="retry-button"
              type="button"
              onClick={onRetry}
            >
              重新加载
            </button>
          )}
        </div>
      </section>
    )
  }

  if (!platform) {
    return null
  }

  const items = platform.items as DisplayHotItem[]
  const hasItems = items.length > 0

  return (
    <section className="hot-card">
      <div className="hot-card__header">
        <div className={getPlatformClassName(platform.id)}>
          <span>{getPlatformIcon(platform.id)}</span>
          <span>{platform.name}</span>
        </div>

        <span className="hot-card__count">{items.length} 条</span>
      </div>

      <div className="hot-card__body">
        {!hasItems ? (
          <div className="hot-card__empty">
            <p>
              {platform.id === 'zhihu'
                ? '知乎热榜接口维护中，后续可接入备用数据源'
                : '暂无数据'}
            </p>
          </div>
        ) : (
          items.map((item, index) => (
            <a
              className="hot-item"
              href={item.url}
              target="_blank"
              rel="noreferrer"
              key={`${platform.id}-${item.rank}-${item.title}`}
              title={item.title}
            >
              <span className={getRankClassName(index)}>{item.rank}</span>

              <span className="hot-item__main">
                <div className="hot-item__title">{item.title}</div>
                <span className="hot-item__meta">
                  热度：{formatHot((item as any).hot)}
                </span>
              </span>

              <span className="hot-item__arrow">→</span>
            </a>
          ))
        )}
      </div>
    </section>
  )
}
