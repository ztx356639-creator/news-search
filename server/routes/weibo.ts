import express from 'express'
import { getWeiboHotSearch } from '../services/weiboService.js'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const data = await getWeiboHotSearch()

    res.json({
      code: 0,
      message: 'success',
      source: 'weibo',
      updatedAt: new Date().toISOString(),
      data,
    })
  } catch (error) {
    console.error('获取微博热搜失败:', error)

    res.status(500).json({
      code: 500,
      message: '获取微博热搜失败',
      data: [],
    })
  }
})

export default router