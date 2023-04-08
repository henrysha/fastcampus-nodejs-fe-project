import { MouseEventHandler } from 'react'

import { FaChevronDown } from 'react-icons/fa'

export const StoreFilter = ({
  filterType,
  currentValue,
  onClick,
}: {
  filterType: string
  currentValue?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <button
      className="flex items-center rounded-full border border-gray-300 px-3 py-1 text-sm"
      onClick={onClick}
    >
      {currentValue ?? filterType}
      <FaChevronDown className="ml-1" />
    </button>
  )
}
