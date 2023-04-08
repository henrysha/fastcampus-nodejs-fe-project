import { useQuery } from '@tanstack/react-query'

import { API_PATH } from '@/constants/apiConfig'
import { Menu } from '@/types/menu'

export const useMenu = (menuId: string) => {
  return useQuery<Menu>({
    queryKey: ['MENU', menuId],
    queryFn: async () => {
      const response = await fetch(`${API_PATH}/menu/${menuId}`)

      return response.json()
    },
  })
}
