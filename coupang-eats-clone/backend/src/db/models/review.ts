import { Schema, model } from 'mongoose'

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  menus: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
      },
      name: { type: String, required: true },
      like: { type: Boolean, default: false },
      dislike: { type: Boolean, default: false },
    },
  ],
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
    index: true,
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
})

export const Review = model('Review', reviewSchema)
