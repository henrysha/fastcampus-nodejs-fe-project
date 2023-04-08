import { useAtomValue, useSetAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsCartX } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'

import {
  addMenuToCartAtom,
  cartAtom,
  removeMenuFromCartAtom,
} from '@/atoms/cart'
import { MenuCounter } from '@/components/common/MenuCounter'
import { CartHeader } from '@/components/Header/cart'
import { KRW } from '@/lib/currency'
import { getMenuPrice } from '@/lib/menu'
import { useSubmitOrder } from '@/queries/order'
import { useStore } from '@/queries/store'

export default function Order() {
  const cart = useAtomValue(cartAtom)
  const { storeId } = cart
  const { data: store } = useStore(storeId)
  const router = useRouter()

  const { mutate } = useSubmitOrder()

  const addMenuToCart = useSetAtom(addMenuToCartAtom)
  const removeMenuFromCart = useSetAtom(removeMenuFromCartAtom)

  if (!storeId || !store || !cart.menus) {
    return (
      <div className="flex h-screen flex-col">
        <CartHeader />
        <div className="grid flex-grow place-items-center">
          <div className="grid place-items-center gap-2 text-gray-500">
            <BsCartX className="text-5xl" />
            장바구니가 비어있습니다
            <Link
              href="/"
              className="rounded-lg border border-black p-2 text-black"
            >
              쿠팡이츠 맛집 구경가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const totalPrice = cart.menus.reduce(
    (acc, menu) => acc + getMenuPrice(menu),
    0
  )

  const submitOrder = async () => {
    mutate(cart, {
      onSuccess: (data) => {
        router.push('/history')
      },
      onError(error, variables, context) {
        console.error(error, variables, context)
      },
    })
  }

  return (
    <>
      <div className="grid gap-2  pb-20">
        <CartHeader />
        <div className="grid gap-2 border-t-8 border-t-gray-200 bg-white">
          <Link
            className="border-b border-b-gray-100 p-4 text-lg font-bold"
            href={`/store/${storeId}`}
          >
            {store.name}
          </Link>
          {cart.menus?.map((menu) => (
            <div
              key={menu.menu._id}
              className="grid gap-2 border-b border-b-gray-100 p-4"
            >
              <div className="flex items-center justify-between">
                <div>{menu.menu.name}</div>
                <IoClose
                  className="text-xl text-gray-400"
                  onClick={() =>
                    removeMenuFromCart({
                      menu: menu.menu,
                      options: menu.options,
                    })
                  }
                />
              </div>
              {menu.options?.map((option) => (
                <div
                  key={option.option.title}
                  className="text-sm text-gray-500"
                >
                  {option.option.title} (+{KRW(option.option.price)})
                </div>
              ))}
              <div className="flex justify-between">
                <div>{KRW(getMenuPrice(menu))}</div>
                <MenuCounter
                  storeId={storeId}
                  cartMenu={menu}
                  options={menu.options}
                  addMenuToCart={addMenuToCart}
                  removeMenuFromCart={removeMenuFromCart}
                  itemCount={menu.count}
                  isCart
                />
              </div>
            </div>
          ))}
          <Link
            href={`/store/${storeId}`}
            className="grid place-items-center p-2 text-blue-500"
          >
            + 메뉴추가
          </Link>
        </div>
      </div>
      <button
        className="fixed bottom-0 flex h-20 w-screen justify-center bg-blue-500 p-4 text-white disabled:bg-gray-200"
        disabled={totalPrice < store.minimumOrderPrice}
        onClick={submitOrder}
      >
        배달주문 {KRW(totalPrice)} 결제하기
      </button>
    </>
  )
}
