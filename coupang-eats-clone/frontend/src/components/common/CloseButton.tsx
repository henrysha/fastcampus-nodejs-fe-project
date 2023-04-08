import Link from 'next/link'
import { IoClose } from 'react-icons/io5'

export const CloseButton = ({ href }: { href?: string }) => {
  return (
    <Link href={href ?? '/'}>
      <IoClose />
    </Link>
  )
}
