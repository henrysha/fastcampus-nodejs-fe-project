import { useRouter } from 'next/router'
import { IoClose } from 'react-icons/io5'

export function CartHeader() {
  const router = useRouter()
  return (
    <div className="relative flex w-screen items-center justify-center bg-white p-2 pb-4 text-2xl font-bold">
      <IoClose className="absolute left-2" onClick={() => router.back()} />
      카트
    </div>
  )
}
