import { useSession } from 'next-auth/react'

import { CategoryFilters } from '@/components/CategoryFilter'
import { BottomNav } from '@/components/common/BottomNav'
import { CartButton } from '@/components/common/CartButton'
import { MainSearchBar } from '@/components/SearchBar/main'
import { StoreList } from '@/components/StoreList'

export default function Home() {
  const { data } = useSession()

  return (
    <>
      <div className="pb-16">
        <MainSearchBar userName={data?.user?.name} />
        <CategoryFilters cols={4} />
        <h3 className="pl-8 text-xl font-bold">골라먹는 맛집</h3>
        <StoreList />
      </div>
      <BottomNav />
      <CartButton />
    </>
  )
}
