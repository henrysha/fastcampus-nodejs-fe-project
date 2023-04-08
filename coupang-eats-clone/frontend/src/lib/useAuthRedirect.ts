import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export const useAuthRedirect = () => {
  const { status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/signin')
    }
  }, [router, status])
}
