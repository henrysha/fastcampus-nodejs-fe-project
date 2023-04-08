import { Schema, model } from 'mongoose'

const menuSchema = new Schema({
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
    index: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  images: [String],
  category: { type: String, required: true },
  isRecommended: Boolean,
  orderCount: Number,
  likeCount: Number,
  dislikeCount: Number,
  additionalSelections: [
    {
      title: String,
      options: [
        {
          title: String,
          price: Number,
        },
      ],
      required: Boolean,
      multiple: Boolean,
    },
  ],
})

export const Menu = model('Menu', menuSchema)
