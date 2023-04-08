import { useAtomValue } from 'jotai'

import { searchQueryAtom } from '@/atoms/search'
import { BottomNav } from '@/components/common/BottomNav'
import { OrderHistory } from '@/components/History/OrderHistory'
import { HistorySearchBar } from '@/components/SearchBar/history'
import { useOrderHistory } from '@/queries/history'

export default function History() {
  const { data } = useOrderHistory()
  const searchQuery = useAtomValue(searchQueryAtom)

  const histories = data?.filter(
    (history) =>
      history.store.name.includes(searchQuery ?? '') ||
      history.menus.some((menu) => menu.menu.name.includes(searchQuery ?? ''))
  )

  return (
    <>
      <div className="pb-16">
        <HistorySearchBar />
        <div className="grid gap-2 p-4">
          {histories?.map((history) => (
            <OrderHistory key={history._id} history={history} />
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  )
}
