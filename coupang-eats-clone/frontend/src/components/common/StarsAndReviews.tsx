import { FaStar } from 'react-icons/fa'

export const StarsAndReviews = ({
  rating,
  reviewCount,
}: {
  rating?: number
  reviewCount?: number
}) => {
  if (!rating) {
    return null
  }

  return (
    <div className="flex items-center gap-0.5">
      <FaStar className="inline text-yellow-500" />
      <span className="text-gray-500">
        {rating?.toFixed(1)}({reviewCount})
      </span>
    </div>
  )
}
