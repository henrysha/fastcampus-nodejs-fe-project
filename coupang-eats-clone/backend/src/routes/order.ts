import { DeliveryStatus } from '@/constants/deliveryStatus'
import { Menu } from '@/db/models/menu'
import { Order } from '@/db/models/order'
import { Store } from '@/db/models/store'
import { User } from '@/db/models/user'
import express from 'express'
import { ObjectId } from 'mongodb'
import { z } from 'zod'

const router = express.Router()

/**
 * 주문을 넣는다
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
        menu: z.string(),
        count: z.number(),
        options: z
          .array(z.object({ title: z.string(), price: z.number() }))
          .optional(),
      })
    ),
    store: z.string(),
  })

  console.log(JSON.stringify(req.body))

  const parsedBody = bodySchema.safeParse(req.body)

  if (!parsedBody.success) {
    console.error('주문 request body 형식이 잘못되었습니다.', parsedBody)
    res.sendStatus(500)
    return
  }

  const body = parsedBody.data

  const user = await User.findOne({
    email: body.user.email,
  })

  if (!user) {
    res.sendStatus(401)
    return
  }

  const userId = user._id

  try {
    await Order.create({
      // 이번 프로젝트의 scope에선 주문하면 바로 배달 완료되는 것으로 mocking합니다.
      status: DeliveryStatus.COMPLETED,
      user: userId,
      menus: body.menus,
      store: body.store,
    })

    try {
      await Menu.updateMany(
        { _id: { $in: body.menus.map((menu) => menu.menu) } },
        { $inc: { orderCount: 1 } }
      )
    } catch (err) {
      console.error('메뉴 orderCount 업데이트중 에러 발생', err)
    }

    try {
      await Store.updateOne({ id: body.store }, { $inc: { orderCount: 1 } })
    } catch (err) {
      console.error('상점 orderCount 업데이트중 에러 발생', err)
    }

    res.sendStatus(200)
  } catch (error) {
    console.error('주문 생성 중 에러 발생', error)
    res.sendStatus(500)
  }
})

/**
 * 과거 주문내역을 조회한다.
 */
router.get('/history', async (req, res) => {
  const querySchema = z.object({
    email: z.string(),
  })

  const parsedQuery = querySchema.safeParse(req.query)

  if (!parsedQuery.success) {
    res.sendStatus(400)
    return
  }

  const { email } = parsedQuery.data

  const user = await User.findOne({
    email: email,
  })

  if (!user) {
    res.sendStatus(401)
    return
  }

  const userId = user._id

  try {
    const docs = await Order.aggregate([
      { $match: { user: userId } },
      {
        $lookup: {
          from: 'menus',
          localField: 'menus.menu',
          foreignField: '_id',
          as: 'menu_items',
        },
      },
      {
        $lookup: {
          from: 'stores',
          localField: 'store',
          foreignField: '_id',
          as: 'store',
        },
      },
      {
        $project: {
          _id: 1,
          timestamp: 1,
          status: 1,
          user: 1,
          menus: {
            $map: {
              input: '$menus',
              as: 'menu',
              in: {
                menu: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: '$menu_items',
                        cond: { $eq: ['$$this._id', '$$menu.menu'] },
                      },
                    },
                    0,
                  ],
                },
                count: '$$menu.count',
                options: '$$menu.options',
              },
            },
          },
          store: { $arrayElemAt: ['$store', 0] },
          review: 1,
        },
      },
    ])
      .sort({ timestamp: -1 })
      .exec()
    res.status(200).json(docs)
  } catch (e) {
    console.error('주문 내역 조회중 오류 발생', e)
    res.sendStatus(500)
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const order = await Order.aggregate([
    { $match: { _id: new ObjectId(id) } },
    {
      $lookup: {
        from: 'menus',
        localField: 'menus.menu',
        foreignField: '_id',
        as: 'menu_items',
      },
    },
    {
      $lookup: {
        from: 'stores',
        localField: 'store',
        foreignField: '_id',
        as: 'store',
      },
    },
    {
      $project: {
        _id: 1,
        timestamp: 1,
        status: 1,
        user: 1,
        menus: {
          $map: {
            input: '$menus',
            as: 'menu',
            in: {
              menu: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: '$menu_items',
                      cond: { $eq: ['$$this._id', '$$menu.menu'] },
                    },
                  },
                  0,
                ],
              },
              count: '$$menu.count',
              options: '$$menu.options',
            },
          },
        },
        store: { $arrayElemAt: ['$store', 0] },
        review: 1,
      },
    },
  ])
  if (!order) {
    res.sendStatus(404)
    return
  }
  res.json(order[0])
})

export default router
