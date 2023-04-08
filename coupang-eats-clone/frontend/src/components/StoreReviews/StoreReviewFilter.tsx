import { Dispatch } from 'react'

import { SetStateAction } from 'jotai'

import { ReviewSort, ReviewSortText } from '@/constants/review'

export function StoreReviewFilter({
  setPhoto,
  setSort,
  sort,
}: {
  setPhoto: Dispatch<SetStateAction<boolean>>
  setSort: Dispatch<SetStateAction<ReviewSort>>
  sort: ReviewSort
}) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-1 font-bold text-blue-500">
        <input
          type="checkbox"
          name="photoToggle"
          id="photoToggle"
          className="p-2 focus:outline-none focus:ring-0"
          onChange={(e) => setPhoto(e.target.checked)}
        />
        <label htmlFor="photoToggle">포토리뷰</label>
      </div>
      <div>
        <select
          name="sort"
          id="sort"
          className="border-0 p-2 focus:outline-none focus:ring-0"
          onChange={(e) => setSort(e.target.value as ReviewSort)}
          value={sort}
        >
          {Object.values(ReviewSort).map((sort) => (
            <option value={sort} key={sort}>
              {ReviewSortText[sort]}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
