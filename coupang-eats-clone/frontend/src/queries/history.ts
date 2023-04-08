import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { API_PATH } from '@/constants/apiConfig'
import { OrderHistory } from '@/types/order'

export const useOrderHistory = () => {
  const { data: session } = useSession()

  const { user } = session ?? {}

  return useQuery<OrderHistory[]>({
    queryKey: ['ORDER_HISTORY', user],
    queryFn: async () => {
      if (!user?.email) return null

      const response = await fetch(
        `${API_PATH}/order/history?email=${user.email}`
      )
      return response.json()
    },
    refetchOnMount: 'always',
  })
}
