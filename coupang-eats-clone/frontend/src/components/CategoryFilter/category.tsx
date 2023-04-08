import Link from 'next/link'

import { ScrollTabs } from '@/components/common/ScrollTabs'
import { StoreCategory } from '@/constants/storeCategory'

export const CategoryTabs = ({ category }: { category?: StoreCategory }) => {
  return (
    <ScrollTabs>
      {Object.values(StoreCategory).map((cat) => (
        <Link
          href={`/category/${cat}`}
          className={`${
            category === cat
              ? 'border-b border-b-blue-500 font-bold text-blue-500 '
              : ''
          }py-2 whitespace-nowrap px-4`}
          key={cat}
        >
          {cat}
        </Link>
      ))}
    </ScrollTabs>
  )
}
