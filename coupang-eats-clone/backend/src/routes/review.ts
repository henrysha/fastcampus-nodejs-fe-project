import { Menu } from '@/db/models/menu'
import { Order } from '@/db/models/order'
import { Review } from '@/db/models/review'
import { User } from '@/db/models/user'
import express from 'express'
import { z } from 'zod'

const router = express.Router()

const Sort = z.enum(['RECENT', 'RATING_DESC', 'RATING_ASC'])
const SortQuery = {
  [Sort.Enum.RECENT]: { createdAt: -1 },
  [Sort.Enum.RATING_DESC]: { rating: -1 },
  [Sort.Enum.RATING_ASC]: { rating: 1 },
} as const

/**
 * 매장 별 리뷰를 가져온다.
 *
 * @param storeId - 매장 id
 * @param photo - 포토리뷰 필터 여부. 0 - false, 1 - true
 * @param sort - 정렬 순서
 */
router.get('/store/:storeId', async (req, res) => {
  const { storeId } = req.params

  const querySchema = z.object({
    photo: z.string().optional(),
    sort: Sort.optional().default(Sort.Enum.RECENT),
    page: z.coerce.number().optional().default(1),
    limit: z.coerce.number().optional().default(10),
  })

  const parsedQuery = querySchema.safeParse(req.query)

  if (!parsedQuery.success) {
    res.sendStatus(400)
    return
  }

  const { photo, sort, page, limit } = parsedQuery.data
  const query: Record<string, string | object> = { store: storeId }

  if (photo === 'true')
    query.image = {
      $exists: true,
      $type: 'string',
      $ne: '',
    }

  try {
    const docs = await Review.find(query)
      .sort(SortQuery[sort])
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()

    res.status(200).json(docs)
  } catch (error) {
    console.log('매장의 리뷰를 가져오던 중 에러 발생', error)
    res.sendStatus(500)
  }
})

/**
 * 리뷰를 등록한다.
 *
 * body는 다음 값들을 받는다
 *  menus: z.array(
 *  z.object({
 *    id: z.string(),
 *    name: z.string(),
 *    like: z.coerce.boolean().optional(),
 *    dislike: z.coerce.boolean().optional(),
 *  })
 *  ),
 *  store: z.string(),
 *  order: z.string(),
 *  rating: z.coerce.number(),
 *  images: z.string().optional(),
 *  review: z.string().optional(),
 */
router.post('/', async (req, res) => {
  const bodySchema = z.object({
    user: z.object({
      name: z.string(),
      email: z.string(),
      image: z.string(),
    }),
    menus: z.array(
      z.object({
        _id: z.string(),
        name: z.string(),
        like: z.coerce.boolean().optional(),
        dislike: z.coerce.boolean().optional(),
      })
    ),
    store: z.string(),
    order: z.string(),
    rating: z.coerce.number(),
    image: z.string().optional(),
    review: z.string().optional(),
  })
  const body = bodySchema.safeParse(req.body)

  if (!body.success) {
    res.sendStatus(400)
    return
  }
  const { data } = body

  const userDoc = await User.findOne({
    email: data.user.email,
  })

  if (!userDoc) {
    res.sendStatus(401)
    return
  }

  const userId = userDoc._id

  try {
    const review = await Review.create({
      ...data,
      user: userId,
    })

    try {
      await Order.findByIdAndUpdate(data.order, {
        review: review._id,
      })
    } catch (error) {
      console.error('주문에 리뷰 연동중 에러 발생', error)
    }

    try {
      for (const menu of data.menus) {
        const update: Record<string, string | object | number> = {}
        if (menu.like) update['$inc'] = { likeCount: 1 }
        if (menu.dislike) update['$inc'] = { dislikeCount: 1 }
        await Menu.findByIdAndUpdate(menu._id, update)
      }
    } catch (error) {
      console.error('메뉴에 likeCount / dislikeCount 연동중 에러 발생', error)
    }

    res.sendStatus(200)
  } catch (error) {
    console.error('리뷰 등록하는 중 에러 발생', error)
    res.sendStatus(500)
  }
})

export default router
