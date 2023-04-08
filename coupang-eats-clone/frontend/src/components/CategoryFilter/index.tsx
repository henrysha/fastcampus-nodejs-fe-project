import Image from 'next/image'
import Link from 'next/link'

import { StoreCategory, StoreCategoryImages } from '@/constants/storeCategory'

export const CategoryFilters = ({ cols }: { cols: number }) => {
  return (
    <div className={`grid ${getGridCol(cols)} gap-4 p-4`}>
      {Object.values(StoreCategory).map((category) => {
        return (
          <Link
            className="grid place-items-stretch text-center"
            key={category}
            href={`/category/${category}`}
          >
            <Image
              className="rounded-full"
              src={StoreCategoryImages[category]}
              alt={category}
              width={500}
              height={500}
            />
            <div className="self-end">{category}</div>
          </Link>
        )
      })}
    </div>
  )
}

const getGridCol = (col: number) => {
  if (col in Object.keys(gridColMap)) return gridColMap[col]
  return gridColMap[4]
}

const gridColMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
}
