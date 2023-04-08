import { useQuery } from '@tanstack/react-query'

import { API_PATH } from '@/constants/apiConfig'
import { Menu } from '@/types/menu'

export const useStoreMenus = (storeId: string) => {
  return useQuery<Menu[]>({
    queryKey: ['STORE_MENUS', storeId],
    queryFn: async () => {
      if (!storeId) return []

      const response = await fetch(`${API_PATH}/menu/store/${storeId}`)
      return response.json()
    },
  })
}
