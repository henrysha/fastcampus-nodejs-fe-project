import { useSetAtom } from 'jotai'
import { IoClose } from 'react-icons/io5'

import { storeSortAtom } from '@/atoms/storeFilter'
import { SortText, StoreSort } from '@/constants/store'

import { FilterModal } from './FilterModal'

export const SortFilterModal = ({ closeModal }: { closeModal: () => void }) => {
  const setSortFilter = useSetAtom(storeSortAtom)

  return (
    <FilterModal closeModal={closeModal}>
      <div className="relative flex items-center justify-center p-3 font-bold">
        매장 정렬
        <IoClose
          className="absolute right-2 text-2xl font-bold"
          onClick={() => closeModal()}
        />
      </div>
      {Object.values(StoreSort).map((sort) => (
        <button
          className="flex w-full justify-center  border-t border-t-gray-200 p-3"
          onClick={() => {
            setSortFilter(sort)
            closeModal()
          }}
          key={sort}
        >
          {SortText[sort]}
        </button>
      ))}
    </FilterModal>
  )
}
