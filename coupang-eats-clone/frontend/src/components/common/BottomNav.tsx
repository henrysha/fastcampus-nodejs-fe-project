import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiHome, BiSearch } from 'react-icons/bi'
import { BsClipboard2Check } from 'react-icons/bs'

export const BottomNav = () => {
  const { pathname } = useRouter()

  return (
    <div className="fixed bottom-0 grid h-16 w-screen grid-cols-3 place-items-center border-t border-t-gray-200 bg-white text-center text-sm text-gray-500">
      <Link
        href="/"
        className={`grid place-items-center ${
          pathname === '/' ? 'font-bold text-black' : ''
        }`}
      >
        <BiHome className="text-2xl" />홈
      </Link>
      <Link
        href="/search"
        className={`grid place-items-center ${
          pathname === '/search' ? 'font-bold text-black' : ''
        }`}
      >
        <BiSearch className="text-2xl" />
        검색
      </Link>
      <Link
        href="/history"
        className={`grid place-items-center ${
          pathname === '/history' ? 'font-bold text-black' : ''
        }`}
      >
        <BsClipboard2Check className="text-2xl " />
        주문내역
      </Link>
    </div>
  )
}
