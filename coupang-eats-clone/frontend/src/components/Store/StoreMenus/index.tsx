import { useAtomValue } from 'jotai'

import { storeIdAtom } from '@/atoms/storeId'
import { useStoreMenus } from '@/queries/menus'

import { MenuCategories } from './MenuCategories'
import { MenuList } from './MenuList'

export const StoreMenus = () => {
  const storeId = useAtomValue(storeIdAtom)
  const { data } = useStoreMenus(storeId)

  if (!data) return null

  return (
    <>
      <MenuCategories />
      <MenuList />
    </>
  )
}
