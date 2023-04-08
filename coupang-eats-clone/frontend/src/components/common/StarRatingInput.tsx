import { Dispatch, SetStateAction } from 'react'

import { FaRegStar, FaStar } from 'react-icons/fa'

export function StarRatingInput({
  rating = 5,
  setRating,
}: {
  rating?: number
  setRating: Dispatch<SetStateAction<number>>
}) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <button onClick={() => setRating(i + 1)} key={i}>
          {i < rating ? <FaStar /> : <FaRegStar />}
        </button>
      ))}
    </div>
  )
}
