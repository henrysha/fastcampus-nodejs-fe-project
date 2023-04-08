import { Menu } from '@/db/models/menu'
import express from 'express'

const router = express.Router()

/**
 * 메뉴의 정보를 가져온다
 *
 * @param menuId
 */
router.get('/:menuId', async (req, res) => {
  const { menuId } = req.params

  try {
    const menu = await Menu.findOne({ _id: menuId })
    res.status(200).json(menu)
  } catch (error) {
    console.error('메뉴 가져오던중 에러 발생', error)
    res.sendStatus(500)
  }
})

/**
 * 특정 매장의 메뉴들을 가져온다
 *
 * @param storeId - 매장의 id정보
 */
router.get('/store/:storeId', async (req, res) => {
  const { storeId } = req.params

  try {
    const menus = await Menu.find({ store: storeId })
    res.status(200).json(menus)
  } catch (error) {
    console.error('매장의 메뉴를 가져오던중 에러 발생', error)
    res.sendStatus(500)
  }
})

export default router
