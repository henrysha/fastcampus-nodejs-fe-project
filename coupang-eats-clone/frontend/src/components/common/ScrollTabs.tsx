import { PropsWithChildren } from 'react'

export const ScrollTabs = ({ children }: PropsWithChildren) => {
  return (
    <div className="scrollbar-hide sticky top-0 z-50 mb-4 mt-2 flex overflow-x-scroll border-b border-b-gray-300 bg-white">
      {children}
    </div>
  )
}
