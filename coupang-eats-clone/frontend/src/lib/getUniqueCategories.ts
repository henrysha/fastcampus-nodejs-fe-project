import { Menu } from '@/types/menu'

export const getUniqueCategories = (menus: Menu[]) => {
  const categories = new Set(menus.map((menu) => menu.category))
  return ['추천메뉴', ...Array.from(categories)]
}
