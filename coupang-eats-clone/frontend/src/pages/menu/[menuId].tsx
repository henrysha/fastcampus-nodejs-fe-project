import { useEffect } from 'react'

import { useSetAtom } from 'jotai'
import { GetServerSideProps } from 'next'

import { menuIdAtom } from '@/atoms/menuId'
import { BackButton } from '@/components/common/BackButton'
import { Carousel } from '@/components/common/Carousel'
import { MenuOrder } from '@/components/Menu/MenuOrder'
import { MenuTitle } from '@/components/Menu/MenuTitle'
import { useMenu } from '@/queries/menu'

export default function Menu({ menuId }: { menuId: string }) {
  const setMenuIdAtom = useSetAtom(menuIdAtom)

  const { data } = useMenu(menuId)

  useEffect(() => {
    setMenuIdAtom(menuId)
  }, [menuId, setMenuIdAtom])

  if (!data) {
    return null
  }

  return (
    <>
      <div className="absolute left-5 top-3 z-50 text-3xl text-white">
        <BackButton href={`/store/${data.store}`} />
      </div>
      <Carousel images={data.images} height="h-60" />
      <MenuTitle title={data.name} description={data.description} />
      <MenuOrder menu={data} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { menuId } = context.query ?? {}

  return {
    props: {
      menuId,
    },
  }
}
