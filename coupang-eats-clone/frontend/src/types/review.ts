export type ReviewMenu = {
  _id: string
  name: string
  like?: boolean
  dislike?: boolean
}

export type Review = {
  _id: string
  user: string
  menus: ReviewMenu[]
  store: string
  order?: string
  rating: number
  review?: string
  image?: string
  createdAt?: string
}
