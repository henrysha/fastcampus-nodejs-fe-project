import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { API_PATH } from '@/constants/apiConfig'
import { ReviewMenu } from '@/types/review'

export const useSubmitReview = () => {
  const { data: session } = useSession()
  const { user } = session ?? {}
  return useMutation({
    mutationFn: async ({
      order,
      store,
      review,
      rating,
      image,
      menus,
    }: {
      order: string
      store: string
      review?: string
      rating: number
      image?: string
      menus: ReviewMenu[]
    }) => {
      if (
        !order ||
        !store ||
        typeof rating !== 'number' ||
        !menus.length ||
        !user
      )
        throw new Error('invalid input')

      return fetch(`${API_PATH}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user,
          menus,
          store,
          image,
          review,
          order,
          rating,
        }),
      })
    },
  })
}
