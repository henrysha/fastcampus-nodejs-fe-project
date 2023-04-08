import { useInfiniteScroll } from '@/lib/useInfiniteScroll'
import { useStores } from '@/queries/stores'

import { StoreListUI } from './StoreListUI'

export const StoreList = () => {
  const { isLoading, data, error, hasNextPage, fetchNextPage, isFetching } =
    useStores()

  const loader = useInfiniteScroll(hasNextPage, isFetching, fetchNextPage)

  if (isLoading || !data || error) {
    return null
  }

  return <StoreListUI {...{ data, isFetching, loader }} />
}
