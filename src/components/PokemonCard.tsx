/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import fetcher from '@/utils/fetcher'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import useSWRImmutable from 'swr/immutable'
import { normalizePokemonLite } from '@/utils/normalizePokemon'
import { Type } from '@/types/Pokemon';
import PokemonTypeColor from '@/utils/colors';

interface PokemonCardProps {
  url: string
  index: number
  [x: string]: any
}

const PokemonCard: FC<PokemonCardProps> = ({ url, index, ...props }) => {
  const { data, error } = useSWRImmutable(url, fetcher)

  const pokemon = useMemo(() => {
    if (!data) return null
    return normalizePokemonLite({ pokemon: data })
  }, [data])

  if (error) return null
  if (!pokemon) return null

  const { name, types, bgColors, image, number } = pokemon

  return (
    <Link
      href={`pokemon/${name}`}
      prefetch={false}
      className="
        hover:shadow-gray-300 
        flex 
        h-full 
        w-full 
        flex-col 
        items-center 
        justify-between 
        rounded-2xl 
        shadow-lg 
        shadow-black/10 
        border-2 
        transition-all 
        duration-300 
        ease-in-out 
        will-change-transform 
        hover:scale-110
        hover:shadow-lg
        hover:border-gray-300
        py-8"
      style={{
        background: `linear-gradient(180deg, #fafafa, ${bgColors[0].light})`,
        borderColor: bgColors[0].light,
      }}
      {...props}
    >
      

      <div
        className="
          relative 
          flex 
          h-full 
          w-full 
          flex-col 
          items-center 
          justify-center 
          overflow-visible 
          rounded-t-2xl"
      >
        <img
          src={image}
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

        <p className="text-sm opacity-70 mb-2" >
          {`#${number}`} 
        </p>
        <div className="flex w-full flex-row items-center justify-center gap-4">
          {types.map((t: Type, idx: number) => {
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: Object.entries(PokemonTypeColor).filter(
                    ([key]) => key === t.type.name
                  )[0][1].medium,
                }}
                className="rounded-md px-2 py-1"
              >
                <p className="text-xs font-semibold tracking-wide text-primary">
                  {t.type.name.toUpperCase()}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </Link>
  )
}

export default PokemonCard
