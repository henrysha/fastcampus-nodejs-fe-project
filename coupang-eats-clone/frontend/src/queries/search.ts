import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

import { searchQueryAtom } from '@/atoms/search'
import { storeFilterAtom } from '@/atoms/storeFilter'
import { API_PATH } from '@/constants/apiConfig'
import { removeEmpty } from '@/lib/objectUtils'
import { Store } from '@/types/store'

export const useSearch = () => {
  const query = useAtomValue(searchQueryAtom)
  const storeFilter = useAtomValue(storeFilterAtom)

  return useQuery<Store[]>({
    queryKey: ['SEARCH', { query, storeFilter }],
    queryFn: async () => {
      const response = await fetch(
        `${API_PATH}/store/search/${query}?${new URLSearchParams(
          removeEmpty({
            sort: storeFilter.sort,
            maxDeliveryPrice: String(storeFilter.maxDeliveryPrice),
            minOrderPrice: String(storeFilter.minOrderPrice),
          })
        )}`
      )
      return response.json()
    },
  })
}
