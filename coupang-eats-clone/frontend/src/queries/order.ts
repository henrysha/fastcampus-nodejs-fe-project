import { useMutation, useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { Cart } from '@/atoms/cart'
import { API_PATH } from '@/constants/apiConfig'
import { OrderHistory } from '@/types/order'

export const useSubmitOrder = () => {
  const { data: session } = useSession()

  return useMutation({
    mutationFn: async (cart: Cart) => {
      if (!session?.user) return
      const menus = cart?.menus?.map((menu) => ({
        menu: menu.menu._id,
        count: menu.count,
        options: menu.options?.map((option) => ({
          title: option.option.title,
          price: option.option.price,
        })),
      }))
      return fetch(`${API_PATH}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: session.user,
          store: cart.storeId,
          menus,
        }),
      })
    },
  })
}

export const useOrder = (orderId: string) => {
  return useQuery<OrderHistory>({
    queryKey: ['order', orderId],
    queryFn: async () => {
      if (!orderId) return null

      const response = await fetch(`${API_PATH}/order/${orderId}`)
      return response.json()
    },
  })
}
