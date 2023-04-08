import { DeliveryStatus } from '@/constants/deliveryStatus'

import { Menu } from './menu'
import { Store } from './store'

export type OrderHistory = {
  _id: string
  timestamp: string
  status: DeliveryStatus
  user: string
  menus: OrderMenu[]
  store: Store
  review: string
}

export type OrderMenu = {
  menu: Menu
  count: number
  options: [
    {
      title: string
      price: number
    }
  ]
}
