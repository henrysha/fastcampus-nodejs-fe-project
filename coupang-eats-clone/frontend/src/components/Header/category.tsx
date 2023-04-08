import { PropsWithChildren } from 'react'

import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'

import { BackButton } from '../common/BackButton'

export const CategoryHeader = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-cols-12 place-items-center p-2 text-xl">
      <BackButton />
      <h1 className="col-span-10 font-bold">{children}</h1>
      <Link href="/search">
        <FaSearch />
      </Link>
    </div>
  )
}
