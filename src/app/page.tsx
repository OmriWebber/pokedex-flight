'use client';

import { useEffect, useState } from 'react';
import fetchAllPokemon from '@/hooks/fetchAllPokemon';
import PokemonCard from '@/components/PokemonCard';
import { PokemonResponse } from '@/types/Pokemon';
import { useMemo } from 'react'
import { useInView } from 'react-cool-inview'


export interface Result {
  name: string
  url: string
}
export interface PokemonIDList {
  count: number
  next: string
  previous?: any
  results: Result[]
}

export default function Home() {
  const { data, next } = fetchAllPokemon()

  const pokemons: any = useMemo(
    () => data?.flatMap((page: any) => page?.results) ?? [],
    [data]
  )

  const { observe } = useInView({
    rootMargin: '300px',
    onEnter: ({ unobserve }) => {
      unobserve()
      next()
    },
  })

  return (
    <div className="grid grid-cols-3 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {pokemons?.map((data: any, index: number) => {
        const isLast = index === pokemons.length - 1
        const { name, url } = data

        return (
          <div
            key={name}
            ref={isLast ? observe : null}
            className="h-80 w-full"
          >
            <PokemonCard url={url} index={++index} />
          </div>
        )
      })}
    </div>
  );
}