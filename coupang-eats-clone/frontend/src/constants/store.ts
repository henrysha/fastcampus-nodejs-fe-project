export const StoreSort = {
  RATING: 'RATING',
  REVIEW: 'REVIEW',
  DELIVERY: 'DELIVERY',
} as const

export type StoreSort = (typeof StoreSort)[keyof typeof StoreSort]

export const SortText = {
  [StoreSort.RATING]: '별점높은순',
  [StoreSort.REVIEW]: '리뷰많은순',
  [StoreSort.DELIVERY]: '배달비낮은순',
}

export type SortText = (typeof SortText)[keyof typeof SortText]

export const DeliveryOption = [
  [0, '무료배달'],
  [1000, '1000원 이하'],
  [2000, '2000원 이하'],
  [3000, '3000원 이하'],
  ['ALL', '전체'],
] as const

export type DeliveryPrice = (typeof DeliveryOption)[number][0]
export type DeliveryText = (typeof DeliveryOption)[number][1]

export const OrderPriceOption = [
  [5000, '5,000원 이하'],
  [10000, '10,000원 이하'],
  [12000, '12,000원 이하'],
  [15000, '15,000원 이하'],
  ['ALL', '전체'],
] as const

export type OrderPrice = (typeof OrderPriceOption)[number][0]
export type OrderText = (typeof OrderPriceOption)[number][1]
