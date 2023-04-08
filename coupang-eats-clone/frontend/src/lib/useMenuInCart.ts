import { useAtomValue } from 'jotai'

import { Menu } from '@/types/menu'

import { cartAtom } from '../atoms/cart'

export const useMenuInCart = (menu: Menu) => {
  const cart = useAtomValue(cartAtom)
  if (!cart) {
    return null
  }
  return cart.menus?.filter((_menu) => _menu.menu._id === menu._id)
}
