import type { PlatformHotList } from '../types/hot'

type HotCardProps = {
  platform?: PlatformHotList
  loading?: boolean
  error?: boolean
  message?: string
  updatedAt?: string
  onRetry?: () => void
}

function formatHot(value: string | number) {
  if (typeof value === 'number') {
    if (value >= 10000) {
      return `${(value / 10000).toFixed(1)}万`
    }

    return String(value)
  }

  return value || '暂无热度'
}

function getPlatformIcon(id?: string) {
  if (id === 'weibo') return '🔥'
  if (id === 'zhihu') return '💡'
  if (id === 'bilibili') return '📺'
  return '📌'
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

  const hasItems = platform.items.length > 0

  return (
    <section className="hot-card">
      <div className="hot-card__header">
        <h2 className="hot-card__title">
          <span>{getPlatformIcon(platform.id)}</span>
          {platform.name}
        </h2>
      </div>

      <div className="hot-card__body">
        {!hasItems ? (
          <div className="hot-card__empty">
            <p>
              {platform.id === 'zhihu'
                ? '知乎接口暂不可用，后续可接入备用数据源'
                : '暂无数据'}
            </p>
          </div>
        ) : (
          platform.items.map((item) => (
            <a
              className="hot-item"
              href={item.url}
              target="_blank"
              rel="noreferrer"
              key={`${platform.id}-${item.rank}-${item.title}`}
              title={item.title}
            >
              <span className="hot-item__rank">{item.rank}</span>

              <span className="hot-item__main">
                <span className="hot-item__title">{item.title}</span>
                <span className="hot-item__meta">
                  热度：{formatHot(item.hot)}
                </span>
              </span>

              <span className="hot-item__arrow">↗</span>
            </a>
          ))
        )}
      </div>
    </section>
  )
}