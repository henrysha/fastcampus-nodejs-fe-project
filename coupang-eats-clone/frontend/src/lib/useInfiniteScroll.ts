import { useEffect, useRef } from 'react'

import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query'

export function useInfiniteScroll<TData, TError>(
  hasNextPage: boolean | undefined,
  isFetching: boolean,
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<TData[], TError>>
) {
  const loader = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0]
      if (target.isIntersecting && hasNextPage && !isFetching) {
        fetchNextPage()
      }
    }, options)

    if (loader.current) observer.observe(loader.current)
  }, [fetchNextPage, hasNextPage, isFetching])
  return loader
}
