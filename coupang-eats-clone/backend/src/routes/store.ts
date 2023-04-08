import { Store } from '@/db/models/store'
import express from 'express'
import { PipelineStage } from 'mongoose'
import { z } from 'zod'

const router = express.Router()

const DOC_IN_PAGE = 5

const Sort = z.enum(['RATING', 'REVIEW', 'DELIVERY'])

const SortQuery = {
  [Sort.Enum.RATING]: { rating: -1 },
  [Sort.Enum.REVIEW]: { reviewCount: -1 },
  [Sort.Enum.DELIVERY]: { deliveryPrice: 1 },
} as const

/**
 * 매장 목록을 받아온다.
 *
 * 다음과 같은 query parameter를 허용한다.
 *
 * @param sort - 정렬방식
 * @param page - 요청하는 페이지. default: 1
 * @param maxDeliveryPrice - 배달비 최대값
 * @param minOrderPrice - 최소주문금액
 * @param limit - 한 페이지에 보여질 매장 수 default: 5
 */
router.get('/', async (req, res) => {
  const querySchema = z.object({
    sort: Sort.optional().default('RATING'),
    page: z.coerce.number().optional().default(1),
    maxDeliveryPrice: z.coerce.number().optional(),
    minOrderPrice: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
  })

  const parsedQuery = querySchema.safeParse(req.query)

  if (!parsedQuery.success) {
    res.sendStatus(400)
    return
  }

  const { sort, page, maxDeliveryPrice, minOrderPrice, limit } =
    parsedQuery.data

  const query: Record<string, string | object> = {}
  if (typeof maxDeliveryPrice === 'number')
    query.deliveryPrice = { $lte: maxDeliveryPrice }
  if (typeof minOrderPrice === 'number')
    query.minimumOrderPrice = { $lte: minOrderPrice }

  const storeLimit = limit || DOC_IN_PAGE
  try {
    const docs = await Store.find(query)
      .sort(SortQuery[sort])
      .limit(storeLimit)
      .skip((page - 1) * storeLimit)
      .exec()

    res.status(200).json(docs)
  } catch (error) {
    console.error('매장 리스트 가져오던 중 에러 발생', error)
    res.sendStatus(500)
  }
})

/**
 * 특정 매장의 정보를 받아온다.
 *
 * @param id - 매장의 id
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const doc = await Store.findById(id)
    res.status(200).json(doc)
  } catch (error) {
    console.log('매장 정보 가져오던 중 에러 발생', error)
    res.sendStatus(500)
  }
})

/**
 * 매장 검색을 한다.
 *
 * @param query - 검색어
 */
router.get('/search/:query', async (req, res) => {
  const { query } = req.params

  const querySchema = z.object({
    sort: Sort.optional().default('RATING'),
    maxDeliveryPrice: z.coerce.number().optional(),
    minOrderPrice: z.coerce.number().optional(),
  })

  const parsedQuery = querySchema.safeParse(req.query)

  if (!parsedQuery.success) {
    res.sendStatus(400)
    return
  }

  const { sort, maxDeliveryPrice, minOrderPrice } = parsedQuery.data

  try {
    const aggregationPipeline: PipelineStage[] = [
      {
        $search: {
          index: 'search_store',
          text: {
            query: query,
            path: {
              wildcard: '*',
            },
          },
        },
      },
    ]

    if (typeof maxDeliveryPrice === 'number')
      aggregationPipeline.push({
        $match: { deliveryPrice: { $lte: maxDeliveryPrice } },
      })

    if (typeof minOrderPrice === 'number')
      aggregationPipeline.push({
        $match: { minimumOrderPrice: { $lte: minOrderPrice } },
      })

    aggregationPipeline.push({
      $sort: SortQuery[sort],
    })

    const docs = await Store.aggregate(aggregationPipeline)

    res.status(200).json(docs)
  } catch (error) {
    console.log('매장 검색중 에러 발생', error)
    res.status(500).json(error)
  }
})

/**
 * 카테고리별로 매장 목록을 받아온다.
 *
 * @param category - 카테고리
 */
router.get('/category/:category', async (req, res) => {
  const { category } = req.params

  const querySchema = z.object({
    sort: Sort.optional().default('RATING'),
    page: z.coerce.number().optional().default(1),
    maxDeliveryPrice: z.coerce.number().optional(),
    minOrderPrice: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
  })

  const parsedQuery = querySchema.safeParse(req.query)

  if (!parsedQuery.success) {
    res.sendStatus(400)
    return
  }

  const { sort, page, maxDeliveryPrice, minOrderPrice, limit } =
    parsedQuery.data

  const query: Record<string, string | object> = { category: category }

  if (typeof maxDeliveryPrice === 'number')
    query.deliveryPrice = { $lte: maxDeliveryPrice }
  if (typeof minOrderPrice === 'number')
    query.minimumOrderPrice = { $lte: minOrderPrice }

  const storeLimit = limit || DOC_IN_PAGE

  try {
    const docs = await Store.find(query)
      .sort(SortQuery[sort])
      .limit(storeLimit)
      .skip((page - 1) * storeLimit)
      .exec()
    res.status(200).json(docs)
  } catch (error) {
    console.error('카테고리별 매장 가져오던 중 에러 발생', error)
    res.sendStatus(500)
  }
})

export default router
