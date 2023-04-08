export const StoreCategory = {
  한식: '한식',
  일식: '일식',
  중식: '중식',
  치킨: '치킨',
  피자: '피자',
  아시아: '아시아',
  멕시칸: '멕시칸',
} as const

export type StoreCategory = (typeof StoreCategory)[keyof typeof StoreCategory]

export const StoreCategoryImages: Record<StoreCategory, string> = {
  한식: '/imgs/bibimbap.jpeg',
  일식: '/imgs/sushi.jpeg',
  중식: '/imgs/jjajang.jpeg',
  치킨: '/imgs/chicken.jpeg',
  피자: '/imgs/pizza.jpeg',
  아시아: '/imgs/pho.jpeg',
  멕시칸: '/imgs/burrito.jpeg',
}
