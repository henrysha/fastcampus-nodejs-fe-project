import { useSetAtom } from 'jotai'
import { IoClose } from 'react-icons/io5'

import { storeOrderPriceAtom } from '@/atoms/storeFilter'
import { OrderPriceOption } from '@/constants/store'

import { FilterModal } from './FilterModal'

export const OrderPriceFilterModal = ({
  closeModal,
}: {
  closeModal: () => void
}) => {
  const setOrderPrice = useSetAtom(storeOrderPriceAtom)

  return (
    <FilterModal closeModal={closeModal}>
      <div className="relative flex items-center justify-center p-3 font-bold">
        배달비
        <IoClose
          className="absolute right-2 text-2xl font-bold"
          onClick={() => closeModal()}
        />
      </div>
      {OrderPriceOption.map(([price, text]) => (
        <button
          className="flex w-full justify-center  border-t border-t-gray-200 p-3"
          onClick={() => {
            setOrderPrice(price)
            closeModal()
          }}
          key={price}
        >
          {text}
        </button>
      ))}
    </FilterModal>
  )
}
