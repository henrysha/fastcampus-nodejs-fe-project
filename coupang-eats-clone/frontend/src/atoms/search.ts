import { atom } from 'jotai'

export const searchQueryAtom = atom<string | undefined>(undefined)
searchQueryAtom.debugLabel = 'searchQueryAtom'
