const UPDATED_AT = '2026-06-02'

type HotItem = {
  rank: number
  title: string
  heat: string
  url: string
}

type PlatformPayload = {
  id: string
  name: string
  accent: string
  status: 'ok'
  updatedAt: string
  items: HotItem[]
}

function buildItems(titles: string[], heats: string[]): HotItem[] {
  return titles.map((title, i) => ({
    rank: i + 1,
    title,
    heat: heats[i] ?? `${(10 - i) * 1.2}万`,
    url: '#',
  }))
}

export function buildHotResponse() {
  return {
    success: true as const,
    updatedAt: `${UPDATED_AT}T00:00:00Z`,
    platforms: [
      {
        id: 'xiaohongshu',
        name: '小红书',
        accent: '#ff2442',
        status: 'ok',
        updatedAt: UPDATED_AT,
        items: buildItems(
          [
            '春日野餐穿搭灵感',
            '平价护肤好物分享',
            '城市徒步路线推荐',
            '减脂便当一周食谱',
            '租房改造小户型',
            '通勤妆容 5 分钟搞定',
            '周末短途旅行攻略',
            '居家健身无器械',
            '咖啡探店打卡地图',
            '书单｜治愈系散文',
          ],
          [
            '128.6万',
            '96.3万',
            '84.1万',
            '72.8万',
            '65.4万',
            '58.2万',
            '51.7万',
            '47.3万',
            '42.9万',
            '38.5万',
          ],
        ),
      },
      {
        id: 'bilibili',
        name: 'B站',
        accent: '#00aeec',
        status: 'ok',
        updatedAt: UPDATED_AT,
        items: buildItems(
          [
            '新番首播讨论',
            '游戏实况高能集锦',
            '科技新品开箱测评',
            '美食 UP 深夜食堂',
            '编程入门系列更新',
            '音乐翻唱挑战赛',
            '纪录片解说推荐',
            '动漫名场面盘点',
            '手工 DIY 教程',
            '校园 vlog 日常',
          ],
          [
            '356.2万',
            '289.4万',
            '241.7万',
            '198.6万',
            '176.3万',
            '154.8万',
            '132.1万',
            '118.5万',
            '95.7万',
            '82.4万',
          ],
        ),
      },
      {
        id: 'zhihu',
        name: '知乎',
        accent: '#1677ff',
        status: 'ok',
        updatedAt: UPDATED_AT,
        items: buildItems(
          [
            '如何看待 AI 工具普及',
            '职场新人如何快速成长',
            '医药研发趋势解读',
            'QC 质检流程优化实践',
            '远程办公效率提升',
            '宏观经济热点分析',
            '教育行业变革讨论',
            '健康生活方式建议',
            '科技创新案例分享',
            '读书笔记与思考',
          ],
          [
            '412.8万',
            '367.5万',
            '298.3万',
            '256.1万',
            '223.6万',
            '189.4万',
            '167.2万',
            '145.8万',
            '128.3万',
            '112.6万',
          ],
        ),
      },
    ] satisfies PlatformPayload[],
  }
}
