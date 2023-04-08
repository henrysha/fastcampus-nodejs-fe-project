import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { BiChevronRight } from 'react-icons/bi'

import { storeIdAtom } from '@/atoms/storeId'
import { BackButton } from '@/components/common/BackButton'
import { Carousel } from '@/components/common/Carousel'
import { StarsAndReviews } from '@/components/common/StarsAndReviews'
import { useStore } from '@/queries/store'

export const StoreHeader = () => {
  const storeId = useAtomValue(storeIdAtom)
  const { data } = useStore(storeId)

  if (!data) return null

  return (
    <div className="relative pb-16">
      <div className="absolute left-5 top-3 z-50 text-3xl text-white">
        <BackButton />
      </div>
      <Carousel images={data.images} />
      <div className="absolute bottom-0 flex w-full justify-center ">
        <div className="z-50 grid gap-2 border border-gray-300 bg-white px-10 py-5 shadow-md">
          <h1 className="text-3xl">{data.name}</h1>
          <Link
            className="flex items-center justify-center text-sm"
            href={`/store/${storeId}/reviews`}
          >
            <StarsAndReviews
              rating={data.rating}
              reviewCount={data.reviewCount}
            />
            <BiChevronRight className="text-xl" />
          </Link>
        </div>
      </div>
    </div>
  )
}
