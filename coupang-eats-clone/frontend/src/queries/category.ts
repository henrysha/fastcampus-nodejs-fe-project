import { useInfiniteQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

import { storeFilterAtom } from '@/atoms/storeFilter'
import { API_PATH } from '@/constants/apiConfig'
import { StoreCategory } from '@/constants/storeCategory'
import { removeEmpty } from '@/lib/objectUtils'
import { Store } from '@/types/store'

const STORE_PER_PAGE = 3

export const useCategoryStores = (category?: StoreCategory) => {
  const storeFilter = useAtomValue(storeFilterAtom)

  return useInfiniteQuery<Store[]>({
    queryKey: ['CATEGORY_STORES', { category, storeFilter }],
    queryFn: async ({ pageParam = 1 }) => {
      if (!category) {
        return []
      }
      const response = await fetch(
        `${API_PATH}/store/category/${category}?` +
          new URLSearchParams(
            removeEmpty({
              sort: storeFilter.sort,
              maxDeliveryPrice: String(storeFilter.maxDeliveryPrice),
              minOrderPrice: String(storeFilter.minOrderPrice),
              page: String(pageParam),
              limit: String(STORE_PER_PAGE),
            })
          )
      )
      return response.json()
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === STORE_PER_PAGE) return allPages.length + 1
    },
  })
}
