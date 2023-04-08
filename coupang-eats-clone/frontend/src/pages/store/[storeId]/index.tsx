import { useEffect } from 'react'

import { useSetAtom } from 'jotai'
import { GetServerSidePropsContext } from 'next'

import { storeIdAtom } from '@/atoms/storeId'
import { CartButton } from '@/components/common/CartButton'
import { StoreDescription } from '@/components/Store/StoreDescription'
import { StoreHeader } from '@/components/Store/StoreHeader'
import { StoreMenus } from '@/components/Store/StoreMenus'

export default function Store({ storeId }: { storeId: string }) {
  const setStoreId = useSetAtom(storeIdAtom)

  useEffect(() => {
    setStoreId(storeId)
  }, [setStoreId, storeId])

  return (
    <>
      <StoreHeader />
      <StoreDescription />
      <StoreMenus />
      <CartButton />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { storeId } = context.query ?? {}

  return {
    props: {
      storeId,
    },
  }
}
