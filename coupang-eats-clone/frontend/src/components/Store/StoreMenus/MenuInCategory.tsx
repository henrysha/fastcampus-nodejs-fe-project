import { useEffect, useRef } from 'react'

import { useSetAtom } from 'jotai'

import { currentCategoryAtom } from '@/atoms/currentCategory'
import { getRecommendedMenus, getMenusInCategory } from '@/lib/menu'
import { Menu } from '@/types/menu'

import { MenuItem } from './MenuItem'

export function MenuInCategory({
  category,
  data,
}: {
  category: string
  data: Menu[]
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const setCurrentCategory = useSetAtom(currentCategoryAtom)

  const recommendedMenus = getRecommendedMenus(data)

  useEffect(() => {
    const options: IntersectionObserverInit = {
      rootMargin: '-42px 0px -90% 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentCategory(category)
        }
      })
    }, options)

    if (ref.current) observer.observe(ref.current)
  }, [category, setCurrentCategory])

  return (
    <div className="grid gap-4" ref={ref}>
      <div>
        <h2 id={category} className="text-xl">
          {category}
        </h2>
        <small className="text-gray-600">
          메뉴 사진은 연출 된 이미지로 실제 조리 된 음식과 다를 수 있습니다.
        </small>
      </div>
      {category === '추천메뉴' ? (
        <>
          {recommendedMenus.map((menu) => (
            <MenuItem menu={menu} key={`${menu.name}_RECOMMENDED`} />
          ))}
        </>
      ) : (
        <>
          {getMenusInCategory(data, category)?.map((menu) => (
            <MenuItem menu={menu} key={`${menu.name}_RECOMMENDED`} />
          ))}
        </>
      )}
    </div>
  )
}
