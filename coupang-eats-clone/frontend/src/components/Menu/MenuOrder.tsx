import { ChangeEventHandler, useEffect, useRef, useState } from 'react'

import { useSetAtom } from 'jotai'
import { useRouter } from 'next/router'
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci'

import { addMenuToCartAtom } from '@/atoms/cart'
import { KRW } from '@/lib/currency'
import { AdditionalOption, Menu, OrderOption } from '@/types/menu'

export const MenuOrder = ({ menu }: { menu: Menu }) => {
  const { price, additionalSelections } = menu

  const router = useRouter()

  const addMenuToCart = useSetAtom(addMenuToCartAtom)

  const ref = useRef<HTMLFormElement>(null)

  const [orderPrice, setOrderPrice] = useState(price)
  const [options, setOptions] = useState<OrderOption[]>([])
  const [orderCount, setOrderCount] = useState(1)

  const decrementCount = () => {
    if (orderCount > 1) setOrderCount((prev) => prev - 1)
  }

  const incrementCount = () => {
    setOrderCount((prev) => prev + 1)
  }

  const handleForm: ChangeEventHandler<HTMLFormElement> = () => {
    const inputs = ref.current?.querySelectorAll('input')
    if (!inputs) return

    let opts: { selectionTitle: string; option: AdditionalOption }[] = []

    inputs.forEach((input) => {
      const [selectionTitle, optionTitle] = input.value.split('-')

      if (!additionalSelections) return

      const selection = additionalSelections.find(
        (_selection) => _selection.title === selectionTitle
      )

      if (!selection) return

      const option = selection.options.find(
        (_option) => _option.title === optionTitle
      )

      if (!option) return

      if (!input.checked) {
        const optionIndex = opts.findIndex(
          (option) => option.option.title === optionTitle
        )
        if (optionIndex !== -1) {
          opts = opts.slice(0, optionIndex).concat(opts.slice(optionIndex + 1))
        }
        return
      }

      opts.push({ selectionTitle, option })
    })

    setOptions(opts)
  }

  const addToCart = () => {
    addMenuToCart({ storeId: menu.store, menu, options })
    router.push(`/store/${menu.store}`)
  }

  useEffect(() => {
    setOrderPrice(
      price * orderCount +
        options.reduce((sum, option) => sum + option.option.price, 0)
    )
  }, [options, orderCount, price])

  return (
    <>
      <div className="pb-20">
        <div className="p-4">
          <div className="flex justify-between pb-4">
            <div className="flex items-center">
              <p className="text-lg font-semibold">가격</p>
            </div>
            <div className="flex items-center">
              <p className="text-lg">{KRW(orderPrice)}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <p className="text-lg font-semibold">수량</p>
            </div>
            <div className="flex items-center gap-2">
              <CiCircleMinus
                className="text-4xl text-gray-400"
                onClick={decrementCount}
              />
              <p className="text-lg">{orderCount}</p>
              <CiCirclePlus
                className="text-4xl text-gray-400"
                onClick={incrementCount}
              />
            </div>
          </div>
        </div>
        <form ref={ref} onChange={handleForm}>
          {additionalSelections?.map((selection) => (
            <div key={selection.title}>
              <h3
                id={selection.title}
                className="flex items-center justify-between bg-gray-100 p-4 font-bold"
              >
                <div>{selection.title}</div>
                {selection.required && (
                  <div className="text-sm font-normal text-orange-600">
                    필수 선택
                  </div>
                )}
              </h3>
              <fieldset>
                {selection.options.map((option) => (
                  <div
                    key={option.title}
                    className="flex items-center gap-2 p-4"
                  >
                    <input
                      id={`${selection.title}-${option.title}`}
                      type={selection.multiple ? 'checkbox' : 'radio'}
                      name={selection.multiple ? option.title : selection.title}
                      value={`${selection.title}-${option.title}`}
                      className="p-3 focus:outline-none focus:ring-0"
                      // onChange={handleOption}
                    />
                    <label htmlFor={`${selection.title}-${option.title}`}>
                      {option.title}
                      {option.price && (
                        <span className="text-gray-400">
                          (+{KRW(option.price)})
                        </span>
                      )}
                    </label>
                  </div>
                ))}
              </fieldset>
            </div>
          ))}
        </form>
      </div>
      <button
        className="fixed bottom-0 flex h-20 w-screen items-center justify-center bg-blue-500 pb-4 text-lg text-white"
        onClick={addToCart}
      >
        배달 카트에 담기
      </button>
    </>
  )
}
