import { atom } from 'jotai'

import { DeliveryPrice, OrderPrice, StoreSort } from '@/constants/store'

export type StoreParam = {
  sort: StoreSort
  maxDeliveryPrice?: number
  minOrderPrice?: number
}
export const initialFilter = {
  sort: StoreSort.RATING,
  maxDeliveryPrice: undefined,
  minOrderPrice: undefined,
}

export const storeFilterAtom = atom<StoreParam>(initialFilter)
storeFilterAtom.debugLabel = 'storeFilterAtom'

export const storeSortAtom = atom(
  (get) => get(storeFilterAtom).sort,
  (get, set, newSort: StoreSort) =>
    set(storeFilterAtom, { ...get(storeFilterAtom), sort: newSort })
)

export const storeDeliveryPriceAtom = atom(
  (get) => get(storeFilterAtom).maxDeliveryPrice,
  (get, set, newMaxDeliveryPrice: DeliveryPrice) =>
    set(storeFilterAtom, {
      ...get(storeFilterAtom),
      maxDeliveryPrice:
        newMaxDeliveryPrice === 'ALL' ? undefined : newMaxDeliveryPrice,
    })
)

export const storeOrderPriceAtom = atom(
  (get) => get(storeFilterAtom).minOrderPrice,
  (get, set, newMinOrderPrice: OrderPrice) =>
    set(storeFilterAtom, {
      ...get(storeFilterAtom),
      minOrderPrice: newMinOrderPrice === 'ALL' ? undefined : newMinOrderPrice,
    })
)
