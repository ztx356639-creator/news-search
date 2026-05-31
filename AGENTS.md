# news-search · AI 开发指令（AGENTS）

> 适用于 Cursor、Claude、Codex、GPT 等 AI 开发助手

---

# 一、项目概述

项目名称：

news-search

项目目标：

构建一个多平台热点聚合网站。

当前平台：

- 小红书
- B站
- 知乎

未来扩展：

- AI 热点
- 医药资讯
- QC 行业动态

采用：

前后端分离架构。

---

# 二、开发原则

## 1. 优先保证可运行

优先：

可运行
可调试
可部署

不要为了炫技增加复杂度。

---

## 2. 小步迭代

一次只实现一个功能。

禁止：

一次性重构整个项目。

---

## 3. 保持 MVP

优先完成：

- 热点展示
- API
- 缓存
- 部署

暂不实现：

- 登录
- 收藏
- 评论
- 用户系统

---

# 三、前端规范

技术栈：

React

TypeScript

Vite

CSS

---

组件：

使用函数式组件。

使用 Hooks。

禁止 class component。

---

目录：

```txt
src/
├── components/
├── api/
├── hooks/
├── types/
└── styles/
```

---

命名：

组件：

PascalCase

示例：

```txt
HotCard
HotList
Layout
```

---

变量：

camelCase

示例：

```txt
hotList
updatedAt
fetchHotData
```

---

# 四、后端规范

技术栈：

Node.js

Express

---

目录：

```txt
server/
├── routes/
├── services/
├── cache/
└── utils/
```

---

路由：

统一：

```txt
/api/*
```

例如：

```txt
/api/hot
/api/health
```

---

# 五、API规范

返回统一结构：

```json
{
  "success": true,
  "updatedAt": "",
  "platforms": []
}
```

---

单平台：

```json
{
  "id": "zhihu",
  "name": "知乎",
  "status": "ok",
  "updatedAt": "",
  "items": []
}
```

---

错误：

```json
{
  "success": false,
  "message": "获取数据失败"
}
```

---

# 六、缓存规范

缓存实现：

Map()

---

默认：

```txt
CACHE_TTL=600
```

---

缓存命中：

返回缓存。

---

缓存失效：

重新抓取。

---

# 七、错误处理

单平台失败：

```txt
status=error
```

---

缓存过期：

```txt
status=stale
```

---

禁止：

一个平台失败导致全站崩溃。

---

# 八、UI规范

风格：

- 简洁
- 信息密度高
- 卡片式布局

参考：

- 今日热榜
- 今日头条

---

布局：

桌面：

```txt
3列
```

移动端：

```txt
1列
```

---

排名：

1~3 高亮。

---

# 九、代码质量要求

必须：

- TypeScript 类型完整
- 避免 any
- 保持可读性
- 保持目录清晰

---

新增功能时：

说明：

1. 修改哪些文件
2. 为什么修改
3. 如何验证

---

# 十、Git提交规范

提交格式：

feat: 新功能

fix: 修复问题

docs: 文档更新

refactor: 重构

chore: 杂项修改

# 十一、部署要求

前端：

Vercel

---

后端：

Railway

---

环境变量：

```env
PORT=3001
CACHE_TTL=600
CLIENT_ORIGIN=
VITE_API_BASE_URL=
```

---

# 十二、开发阶段

Phase1

Mock API

---

Phase2

缓存

---

Phase3

真实数据

---

Phase4

部署

---

Phase5

AI / QC 扩展

---

# 十三、与 AI 协作要求

当生成代码时：

必须：

1. 先说明方案
2. 再生成代码
3. 说明修改文件
4. 给出验证步骤

禁止：

直接输出大量代码而不解释。

# 十四、禁止事项

禁止：

- 引入未讨论的大型框架
- 修改已确定的数据结构
- 删除已有文档
- 使用 any 逃避类型定义
- 一次性重构整个项目