import { FormEvent, useRef } from 'react'

import { useSetAtom } from 'jotai'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'
import { IoArrowBack } from 'react-icons/io5'

import { searchQueryAtom } from '@/atoms/search'

export const SearchBar = ({ userName }: { userName?: string | null }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const setQuery = useSetAtom(searchQueryAtom)

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (inputRef.current) {
      setQuery(inputRef.current.value)
    }
  }

  return (
    <form
      className="grid grid-cols-12 place-items-center px-4 py-2"
      onSubmit={handleSearch}
    >
      <Link href="/">
        <IoArrowBack />
      </Link>
      <input
        ref={inputRef}
        className="col-span-10 w-full rounded-full border border-b-4 border-gray-300 px-4 py-2"
        placeholder={
          userName ? `${userName}님, 맥도날드 어때요?` : '검색해보세요'
        }
        autoFocus
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  )
}
