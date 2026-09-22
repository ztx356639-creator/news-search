export type RawArticle = {
  sourceId: string
  sourceName: string
  title: string
  url: string
  rank?: number
  metric?: string | number
  collectedAt: string
}

export interface Collector {
  readonly id: string
  readonly name: string
  fetch(): Promise<RawArticle[]>
}
