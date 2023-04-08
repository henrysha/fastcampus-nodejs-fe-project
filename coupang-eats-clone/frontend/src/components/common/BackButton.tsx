import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'

export const BackButton = ({ href }: { href?: string }) => {
  return (
    <Link href={href ?? '/'}>
      <IoArrowBack />
    </Link>
  )
}
