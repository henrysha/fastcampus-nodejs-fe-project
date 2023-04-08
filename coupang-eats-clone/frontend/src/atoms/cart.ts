import { atom } from 'jotai'

import { Menu, OrderOption } from '@/types/menu'

export type CartMenu = {
  menu: Menu
  count: number
  options?: OrderOption[]
}

export type Cart = {
  storeId?: string
  menus?: CartMenu[]
}

export const cartAtom = atom<Cart>({})
cartAtom.debugLabel = 'cartAtom'

const findMenuInCart = (m: CartMenu, menu: Menu, options?: OrderOption[]) => {
  if (options) return m.menu._id === menu._id && m.options === options
  return m.menu._id === menu._id
}

export const addMenuToCartAtom = atom(
  undefined,
  (
    get,
    set,
    {
      menu,
      storeId,
      options,
    }: { menu: Menu; storeId: string; options?: OrderOption[] }
  ) => {
    const prev = get(cartAtom)
    if (!prev.storeId) {
      set(cartAtom, {
        storeId,
        menus: [{ menu, count: 1, options }],
      })
      return true
    }

    if (prev.storeId !== storeId) {
      return false
    }

    const currentMenu = prev.menus?.find((_menu) =>
      findMenuInCart(_menu, menu, options)
    )

    set(cartAtom, {
      ...prev,
      menus: prev.menus
        ? [
            ...(prev.menus?.filter(
              (_menu) => !findMenuInCart(_menu, menu, options)
            ) ?? []),
            {
              menu,
              count: currentMenu ? currentMenu.count + 1 : 1,
              options: options ?? currentMenu?.options,
            },
          ]
        : [{ menu, count: 1 }],
    })
    return true
  }
)

export const removeMenuFromCartAtom = atom(
  undefined,
  (get, set, { menu, options }: { menu: Menu; options?: OrderOption[] }) => {
    const cart = get(cartAtom)
    if (!cart.menus) {
      return false
    }

    const currentMenuIndex = cart.menus?.findLastIndex((_menu) =>
      findMenuInCart(_menu, menu, options)
    )

    if (currentMenuIndex === -1) {
      return false
    }

    const currentMenu = cart.menus[currentMenuIndex]

    if (currentMenu.count === 1) {
      if (cart.menus.length === 1) {
        set(cartAtom, {})
        return true
      }
      set(cartAtom, {
        ...cart,
        menus: cart.menus
          .slice(0, currentMenuIndex)
          .concat(cart.menus.slice(currentMenuIndex + 1, cart.menus.length)),
      })
      return true
    }

    set(cartAtom, {
      ...cart,
      menus: [
        ...(cart.menus
          .slice(0, currentMenuIndex)
          .concat(cart.menus.slice(currentMenuIndex + 1, cart.menus.length)) ??
          []),
        { menu, count: currentMenu.count - 1, options: currentMenu.options },
      ],
    })

    return true
  }
)
