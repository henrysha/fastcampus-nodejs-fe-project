import { StarRating } from '@/components//common/StarRating'
import { BackButton } from '@/components/common/BackButton'
import { useStore } from '@/queries/store'

export function StoreReviewTop({ storeId }: { storeId: string }) {
  const { data: store } = useStore(storeId)

  if (!store) return null

  return (
    <>
      <div className="relative grid place-items-center p-4 text-lg font-bold">
        <div className="absolute left-4 top-0 flex h-full items-center ">
          <BackButton href={`/store/${storeId}`} />
        </div>
        {store.name} 리뷰
      </div>
      <div className="flex p-4">
        <h1 className="pr-4 text-3xl font-bold">
          {Number(store.rating).toFixed(1)}
        </h1>
        <div>
          <div className="text-lg text-yellow-400">
            <StarRating rating={store.rating} />
          </div>
          <div>
            리뷰 <span className="font-bold">{store.reviewCount}</span>개
          </div>
        </div>
      </div>
    </>
  )
}
