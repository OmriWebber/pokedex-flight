/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import fetcher from '@/utils/fetcher'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import useSWRImmutable from 'swr/immutable'

interface PokemonCardProps {
  url: string
  index: number
  [x: string]: any
}

const PokemonCard: FC<PokemonCardProps> = ({ url, index, ...props }) => {
  const { data, error } = useSWRImmutable(url, fetcher)

  const pokemon = useMemo(() => {
    if (!data) return null
    return { pokemon: data }
  }, [data])

  if (error) return null
  if (!pokemon) return null

  const { name, types } = pokemon.pokemon
  const imageUrl = pokemon.pokemon.sprites.other['official-artwork'].front_default

  return (
    <Link
      href={`pokemon/${name}`}
      prefetch={false}
      className="hover:shadow-gray-300 flex h-full w-full flex-col items-center justify-between rounded-2xl shadow-lg shadow-secondary/10 transition-all duration-500 ease-in-out will-change-transform hover:-translate-y-3 hover:scale-105"
      {...props}
    >
      <div
        className="relative flex h-2/3 w-full flex-col items-center justify-center overflow-hidden rounded-t-2xl"

      >
        <p
          className="absolute top-2 left-8 text-4xl font-bold tracking-widest drop-shadow-2xl"

        >
        </p>

        <img
          src={imageUrl}
          alt={name}
          height={200}
          width={200}
          loading={index === 1 ? 'eager' : 'lazy'}
          decoding="async"
          className="drop-shadow xl:h-36 xl:w-36 2xl:h-44 2xl:w-44"
          style={{ contentVisibility: 'auto' }}>
        </img>
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-evenly ">
        <h3 className="text-2xl font-bold capitalize tracking-wide text-secondary">
          {name}
        </h3>

        <div className="flex w-full flex-row items-center justify-center gap-4">
          {types.map((type: any, index: number) => (
            <div
              key={index}
              className={`rounded-full bg-black px-4 py-1 text-center text-sm font-semibold capitalize text-white`}
            >
              {type.type.name}
            </div>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default PokemonCard
