import { Schema, model } from 'mongoose'

import { StoreCategory } from '@/constants/storeCategory'

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  images: [String],
  category: {
    type: String,
    enum: StoreCategory,
    required: true,
  },
  reviewCount: Number,
  rating: Number,
  deliveryPrice: {
    type: Number,
    required: true,
  },
  minimumOrderPrice: {
    type: Number,
    required: true,
  },
  menus: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Menu',
    },
  ],
})

export const Store = model('Store', storeSchema)
