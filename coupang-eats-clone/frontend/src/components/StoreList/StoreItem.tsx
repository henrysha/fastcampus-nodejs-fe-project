import { useMemo } from 'react'

import Link from 'next/link'

import { Store } from '@/types/store'

import { StarsAndReviews } from '../common/StarsAndReviews'

const expandImages = (images?: string[]) => {
  if (!images?.length) return Array(3).fill('/imgs/noimage.svg')
  return images.concat(Array(3 - images.length).fill(images[images.length - 1]))
}

export const StoreItem = ({ store }: { store: Store }) => {
  const images = useMemo(() => expandImages(store.images), [store.images])
  return (
    <Link className="m-4 block" href={`/store/${store._id}`}>
      <div className="grid grid-cols-3 grid-rows-2 gap-1">
        {images?.map((image, idx) => (
          <div
            className={`${
              idx === 0
                ? 'col-span-2 row-span-full aspect-auto rounded-l-xl'
                : idx === 1
                ? 'aspect-square rounded-tr-xl'
                : 'aspect-square rounded-br-xl'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            key={`${image}_${idx}`}
          />
        ))}
      </div>
      <h3 className="text-lg font-semibold">{store.name}</h3>
      <div className="flex gap-2 text-sm">
        <StarsAndReviews
          rating={store.rating}
          reviewCount={store.reviewCount}
        />
        <span className="text-gray-500">배달비 {store.deliveryPrice}원</span>
      </div>
    </Link>
  )
}
