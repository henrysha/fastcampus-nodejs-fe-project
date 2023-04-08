import { StoreCategory } from '@/constants/storeCategory'

export type Store = {
  _id: string
  name: string
  images?: string[]
  category: StoreCategory
  reviewCount?: number
  rating?: number
  deliveryPrice: number
  minimumOrderPrice: number
  menus: string[]
}
