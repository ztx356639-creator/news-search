# news-search · 技术设计文档（TECH_DESIGN）

> 文档版本：v1.0
> 更新时间：2026-05-30

---

# 一、项目概述

news-search 是一个多平台热点聚合网站。

当前聚合：

- 小红书热榜
- B站热搜
- 知乎热榜

未来扩展：

- AI 热点
- 医药资讯
- QC 行业动态

采用：

前后端分离架构。

---

# 二、技术栈

## 前端

React

TypeScript

Vite

CSS

---

## 后端

Node.js

Express

---

## 数据

JSON API

---

## 缓存

内存缓存

TTL：

300~600 秒

---

## 部署

前端：

Vercel

后端：

Railway

---

# 三、项目结构

news-search/

├── client/
│
├── server/
│
├── RESEARCH.md
│
├── PRD.md
│
├── TECH_DESIGN.md
│
└── README.md

---

## client

client/

├── src/
│
├── components/
│
├── api/
│
├── types/
│
├── hooks/
│
└── styles/

---

## server

server/

├── src/
│
├── routes/
│
├── services/
│
├── cache/
│
└── utils/

---

# 四、数据模型

## HotItem

```ts
type HotItem = {
  rank:number
  title:string
  heat?:string
  url:string
}
```

---

## HotPlatform

```ts
type HotPlatform = {
  id:string
  name:string
  updatedAt:string
  status:'ok'|'stale'|'error'
  items:HotItem[]
}
```

---

### 单平台响应示例

```json
{
  "id": "zhihu",
  "name": "知乎",
  "status": "ok",
  "updatedAt": "2026-05-30T10:00:00Z",
  "items": [
    {
      "rank": 1,
      "title": "如何看待 AI 编程工具的发展？",
      "heat": "842万热度",
      "url": "https://www.zhihu.com/question/xxxxx"
    }
  ]
}
```

# 五、API设计

## GET /api/hot

返回：

```json
{
  "success": true,
  "updatedAt": "",
  "platforms": []
}
```

---

## GET /health

返回：

```json
{
  "ok":true
}
```

用于：

- Railway健康检查
- 服务监控

---

# 六、缓存设计

缓存目标：

降低平台请求频率。

---

缓存结构：

```js
Map()
```

示例：

```js
cache.set(
 'hot_all',
 data
)
```

---

TTL

默认：

600秒

---

缓存流程：

用户请求

↓

检查缓存

↓

命中

↓

返回缓存

↓

未命中

↓

抓取数据

↓

更新缓存

↓

返回结果

---

# 七、前后端通信

开发环境：

```txt
5173
↓
3001
```

---

Vite代理：

```ts
/api
↓
http://localhost:3001
```

---

生产环境：

```txt
Vercel
↓
Railway
```

---

环境变量：

```env
VITE_API_BASE_URL=
```

---

# 八、环境变量

开发与生产环境统一通过环境变量配置。

## 后端

```env
PORT=3001

CACHE_TTL=600

CLIENT_ORIGIN=http://localhost:5173
```

# 九、错误处理

平台失败：

```txt
status=error
```

---

缓存失效：

```txt
status=stale
```

---

全部失败：

```txt
HTTP 503
```

---

# 十、部署架构

浏览器

↓

Vercel

↓

Express API

↓

缓存

↓

平台数据源

---

# 十一、开发顺序

Phase0

前端 Mock

✓ 已完成

---

Phase1

Express

Mock API

---

Phase2

缓存

真实数据

---

Phase3

部署

---

Phase4

AI

医药

QC

---

# 十二、当前状态

已完成：

✓ React

✓ TypeScript

✓ Vite

✓ Mock 热榜

✓ RESEARCH

✓ PRD

---

待完成：

○ Express

○ API

○ 缓存

○ 部署

○ 真实数据