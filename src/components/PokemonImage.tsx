'use client';

import Link from 'next/link'
import { use, useEffect, useRef } from 'react'
import { ArrowLeft } from '@/components/Icons'
import { Type } from '@/types/Pokemon'
import PokemonTypeColor from '@/utils/colors'
import gsap from 'gsap'

gsap.registerPlugin()

interface PokemonImageProps {
  pokemon: any
}

const PokemonImage = ({ pokemon }: PokemonImageProps) => {
  const pokeImage = useRef<HTMLImageElement>(null)

  // Animation for the Pokemon image
  useEffect(() => {
    if (pokeImage.current) {
      gsap.fromTo(
        pokeImage.current,
        { scale: 0.1, opacity: 0, y: 200 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }
      )
    }
  }, [pokemon])

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-end"
    >
      <div className="absolute z-30 px-8 top-8 flex flex-col gap-4 items-start justify-start w-full text-left font-bold text-white  drop-shadow-xl text-[8vw] md:text-[5vw] 2xl:text-[100px] !leading-[100%]">
        <Link href={'/'} className='relative bg-white rounded-full p-1 drop-shadow-2xl'>
          <ArrowLeft className="w-8 h-8 font-light text-primary opacity-80 transition-colors duration-150 hover:text-secondary z-10" />
        </Link>
        <div className='flex flex-row gap-2 items-center'>
          <h1 className="capitalize text-left">{pokemon.name}</h1>
          <p className="text-xl font-bold text-primary/70 drop-shadow-2xl opacity-70">
            {`#${pokemon.id.toString().padStart(3, '0')}`}
          </p>
        </div>
        
        <div className='flex flex-row gap-4'>
          {pokemon.types.map((t: Type, idx: number) => {
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


      


      <div className="relative flex w-3/4 max-w-[400px] lg:max-w-[100%] items-end justify-end md:w-[400px] lg:w-[600px] overflow-visible z-20 -mb-16">
        <img
          ref={pokeImage}
          key={pokemon.id}
          src={pokemon.image}
          alt={pokemon.name}
          width={200}
          height={200}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  )
}

export default PokemonImage
