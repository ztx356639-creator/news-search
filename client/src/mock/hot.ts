import type { PlatformHotList } from '../types/hot'

export const mockPlatforms: PlatformHotList[] = [
  {
    id: 'xiaohongshu',
    name: '小红书',
    accent: '#ff2442',
    updatedAt: '2026-06-01',
    items: [
      {
        rank: 1,
        title: 'AI副业真的能赚钱吗？',
        heat: '128万',
        url: '#'
      },
      {
        rank: 2,
        title: '618必买数码清单',
        heat: '112万',
        url: '#'
      },
      {
        rank: 3,
        title: '打工人的高效时间管理',
        heat: '96万',
        url: '#'
      },
      {
        rank: 4,
        title: '减脂餐一周实测记录',
        heat: '82万',
        url: '#'
      },
      {
        rank: 5,
        title: '2026最值得学习的技能',
        heat: '75万',
        url: '#'
      }
    ]
  },
  {
    id: 'bilibili',
    name: 'B站',
    accent: '#00aeec',
    updatedAt: '2026-06-01',
    items: [
      {
        rank: 1,
        title: 'Claude Code 全流程开发实战',
        heat: '89万',
        url: '#'
      },
      {
        rank: 2,
        title: 'React 项目从0到1开发教程',
        heat: '76万',
        url: '#'
      },
      {
        rank: 3,
        title: 'Cursor 使用技巧大全',
        heat: '70万',
        url: '#'
      },
      {
        rank: 4,
        title: 'Node.js + Express 入门指南',
        heat: '65万',
        url: '#'
      },
      {
        rank: 5,
        title: 'Vibe Coding 21天挑战记录',
        heat: '58万',
        url: '#'
      }
    ]
  },
  {
    id: 'zhihu',
    name: '知乎',
    accent: '#1677ff',
    updatedAt: '2026-06-01',
    items: [
      {
        rank: 1,
        title: 'AI会取代程序员吗？',
        heat: '530万热度',
        url: '#'
      },
      {
        rank: 2,
        title: 'Vibe Coding到底是什么？',
        heat: '480万热度',
        url: '#'
      },
      {
        rank: 3,
        title: '如何系统学习TypeScript？',
        heat: '420万热度',
        url: '#'
      },
      {
        rank: 4,
        title: '独立开发者如何获得第一批用户？',
        heat: '390万热度',
        url: '#'
      },
      {
        rank: 5,
        title: '为什么越来越多人学习AI编程？',
        heat: '350万热度',
        url: '#'
      }
    ]
  }
]