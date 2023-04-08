import { useMutation } from '@tanstack/react-query'

import { API_PATH } from '@/constants/apiConfig'

export const useImageUpload = () => {
  return useMutation({
    mutationFn: async (image: FormData) => {
      const response = await fetch(`${API_PATH}/image`, {
        method: 'POST',
        body: image,
      })
      return response.json()
    },
  })
}
