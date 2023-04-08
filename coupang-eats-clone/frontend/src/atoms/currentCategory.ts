import { atom } from 'jotai'

export const currentCategoryAtom = atom<string>('추천메뉴')
currentCategoryAtom.debugLabel = 'currentCategoryAtom'
