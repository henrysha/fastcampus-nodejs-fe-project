import { RefObject } from 'react'

import { InfiniteData } from '@tanstack/react-query'

import { Store } from '@/types/store'

import { StoreFilters } from './StoreFilters'
import { StoreItem } from './StoreItem'

export function StoreListUI({
  data,
  isFetching,
  loader,
}: {
  data: InfiniteData<Store[]>
  isFetching: boolean
  loader: RefObject<HTMLDivElement>
}) {
  return (
    <div>
      <StoreFilters />
      {data.pages.map((stores) =>
        stores.map((store) => <StoreItem key={store._id} store={store} />)
      )}
      {!isFetching && <div ref={loader} />}
    </div>
  )
}
