import { PokemonResponse } from '@/types/Pokemon';

import fetcher from '@/utils/fetcher'
import { useCallback } from 'react'
import useSWRInfinite from 'swr/infinite'

const LIMIT: number = 151

const requestOptions: RequestInit = {
  method: "GET",
  redirect: "follow",
};

const getKey = (pageIndex: any, previousPageData: any) => {
  if (previousPageData && !previousPageData.next) return null

  if (pageIndex === 0)
    return `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${LIMIT}`

  return previousPageData.next
}

const fetchAllPokemon = () => {
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const pokemons = data ? [].concat(...data) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < LIMIT)

  const next = useCallback(() => setSize((size) => size + 1), [])

  return {
    data: pokemons,
    isLoadingMore,
  }
};

export default fetchAllPokemon;