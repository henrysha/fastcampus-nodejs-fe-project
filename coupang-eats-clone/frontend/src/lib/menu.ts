import { CartMenu } from '@/atoms/cart'
import { Menu } from '@/types/menu'
import { OrderMenu } from '@/types/order'

export const getRecommendedMenus = (menus: Menu[]) => {
  return menus.filter((menu) => menu.isRecommended)
}

export const getMenusInCategory = (menus: Menu[], category: string) => {
  return menus.filter((menu) => menu.category === category)
}

export const getMenuPrice = (menu: CartMenu) => {
  if (menu.options)
    return (
      menu.menu.price * menu.count +
      menu.options.reduce((sum, option) => sum + option.option.price, 0) *
        menu.count
    )
  return menu.menu.price * menu.count
}

export const getOrderMenuPrice = (menu: OrderMenu) => {
  if (menu.options)
    return (
      menu.menu.price * menu.count +
      menu.options.reduce((sum, option) => sum + option.price, 0) * menu.count
    )
  return menu.menu.price * menu.count
}

export const getTotalPrice = (menus: OrderMenu[]) => {
  return menus.reduce((sum, menu) => sum + getOrderMenuPrice(menu), 0)
}
