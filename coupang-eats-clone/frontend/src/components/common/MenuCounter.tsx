import { BiMinus, BiPlus } from 'react-icons/bi'
import { BsCartX } from 'react-icons/bs'

import { CartMenu } from '@/atoms/cart'
import { Menu, OrderOption } from '@/types/menu'

export function MenuCounter({
  removeMenuFromCart,
  cartMenu,
  itemCount,
  addMenuToCart,
  storeId,
  options,
  isCart,
}: {
  removeMenuFromCart: (menu: { menu: Menu; options?: OrderOption[] }) => boolean
  cartMenu: CartMenu
  itemCount: number
  addMenuToCart: (menu: {
    menu: Menu
    storeId: string
    options?: OrderOption[]
  }) => boolean
  storeId: string
  options?: OrderOption[]
  isCart?: boolean
}) {
  return (
    <div className="flex items-center rounded-full bg-blue-500 py-1 text-white">
      <button
        className="pl-2 pr-3"
        onClick={() => {
          if (confirm('선택한 메뉴를 삭제하시겠습니까?'))
            removeMenuFromCart({ menu: cartMenu.menu, options })
        }}
      >
        {isCart ? <BsCartX /> : <BiMinus />}
      </button>
      {itemCount}
      <button
        className="pl-3 pr-2"
        onClick={() => addMenuToCart({ menu: cartMenu.menu, storeId, options })}
      >
        <BiPlus />
      </button>
    </div>
  )
}
