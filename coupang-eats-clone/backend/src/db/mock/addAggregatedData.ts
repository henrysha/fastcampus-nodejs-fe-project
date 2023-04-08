import mongoose from 'mongoose'
import { Menu } from '../models/menu'
import { Store } from '../models/store'
import { User } from '../models/user'
import { connectToDB } from '../mongoClient'
import { Review } from '../models/review'
;(async () => {
  await connectToDB()

  // Aggregate reviews into store
  const storeAgg = await Store.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'store',
        as: 'reviewObjs',
      },
    },
    {
      $project: {
        _id: 1,
        rating: { $avg: '$reviewObjs.rating' },
        reviewCount: { $size: '$reviewObjs' },
      },
    },
    {
      $merge: {
        into: 'stores',
        on: '_id',
      },
    },
  ])

  console.log('store aggregation done', storeAgg)

  // Aggregate reviews into menu
  const ReviewAgg = await Review.aggregate([
    {
      $unwind: '$menus',
    },
    {
      $group: {
        _id: '$menus.id',
        likeCount: {
          $sum: {
            $cond: {
              if: '$menus.like',
              then: 1,
              else: 0,
            },
          },
        },
        dislikeCount: {
          $sum: {
            $cond: {
              if: '$menus.dislike',
              then: 1,
              else: 0,
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        likeCount: 1,
        dislikeCount: 1,
      },
    },
    {
      $lookup: {
        from: 'menus',
        localField: '_id',
        foreignField: '_id',
        as: 'menu',
      },
    },
    {
      $unwind: '$menu',
    },
    {
      $set: {
        'menu.likeCount': '$likeCount',
        'menu.dislikeCount': '$dislikeCount',
      },
    },
    {
      $project: {
        _id: 0,
        menu: 1,
      },
    },
    {
      $replaceRoot: {
        newRoot: '$menu',
      },
    },
    {
      $out: 'menus',
    },
  ])
  console.log('review aggregation done', ReviewAgg)

  await mongoose.disconnect()
  console.log('mongoose disconnected')
})()
