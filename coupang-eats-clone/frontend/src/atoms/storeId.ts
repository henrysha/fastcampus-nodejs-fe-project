import { atom } from 'jotai'

export const storeIdAtom = atom<string>('')
storeIdAtom.debugLabel = 'storeIdAtom'
