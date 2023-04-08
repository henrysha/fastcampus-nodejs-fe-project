import { PropsWithChildren } from 'react'

import { Portal } from 'react-portal'

export const FilterModal = ({
  closeModal,
  children,
}: PropsWithChildren<{ closeModal: () => void }>) => {
  return (
    <>
      <Portal>
        <div
          className="fixed top-0 z-40 h-screen w-screen bg-gray-500/50"
          onClick={closeModal}
        ></div>
        <div className="fixed bottom-0 z-50 w-full bg-white pb-10">
          {children}
        </div>
      </Portal>
    </>
  )
}
