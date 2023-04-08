export type Menu = {
  _id: string
  store: string
  name: string
  price: number
  description?: string
  images?: string[]
  category: string
  isRecommended?: boolean
  orderCount?: number
  likeCount?: number
  dislikeCount?: number
  additionalSelections?: AdditionalSelection[]
}

export type AdditionalSelection = {
  title: string
  options: AdditionalOption[]
  required?: boolean
  multiple: boolean
}

export type AdditionalOption = {
  title: string
  price: number
}

export type OrderOption = { selectionTitle: string; option: AdditionalOption }
