import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaSearch } from 'react-icons/fa'

export const MainSearchBar = ({ userName }: { userName?: string | null }) => {
  return (
    <div className="px-4 py-2">
      <Link
        className="flex items-center justify-stretch rounded-full border border-b-4 border-gray-300 p-2"
        href={'/search'}
      >
        <FaSearch />
        <span className="ml-4 truncate">
          {userName ? `${userName}님, 맥도날드 어때요?` : '검색해보세요'}
        </span>
      </Link>
    </div>
  )
}
