import { GetStaticPropsContext, NextPageContext } from 'next'

import { CategoryTabs } from '@/components/CategoryFilter/category'
import { CartButton } from '@/components/common/CartButton'
import { CategoryHeader } from '@/components/Header/category'
import { CategoryStoreList } from '@/components/StoreList/CategoryStoreList'
import { StoreCategory } from '@/constants/storeCategory'

export default function Category({ category }: { category: string }) {
  const currentCategory =
    category in StoreCategory
      ? StoreCategory[category as StoreCategory]
      : undefined

  return (
    <>
      <CategoryHeader>{currentCategory}</CategoryHeader>
      <CategoryTabs category={currentCategory} />
      <CategoryStoreList category={currentCategory} />
      <CartButton />
    </>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const category = context.params?.category
  return {
    props: { category },
  }
}

export async function getStaticPaths() {
  return {
    paths: Object.values(StoreCategory).map((category) => ({
      params: {
        category,
      },
    })),
    fallback: false,
  }
}
