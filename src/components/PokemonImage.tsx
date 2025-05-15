import Link from 'next/link'
import { ArrowLeft } from '@/components/Icons'
import { Type } from '@/types/Pokemon'
import PokemonTypeColor from '@/utils/colors'

interface PokemonImageProps {
  pokemon: any
}

const PokemonImage = ({ pokemon }: PokemonImageProps) => {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-between"
    >
      <div className="flex w-full flex-row items-center justify-between p-3 pr-5">
        <Link href={'/'} className='relative bg-white rounded-full p-1 drop-shadow-2xl'>
          <ArrowLeft className="w-8 h-8 font-light text-primary opacity-80 transition-colors duration-150 hover:text-secondary z-10" />
        </Link>

        
      </div>

      <div className="absolute z-30 px-8 top-24 flex flex-col gap-4 items-start justify-start w-full text-left text-4xl font-bold text-white  drop-shadow-xl lg:top-24 lg:text-7xl">
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


      


      <div className="relative flex  w-3/4 items-end justify-end lg:w-[400px] overflow-visible z-20 -mb-16">
        <img
          key={pokemon.id}
          src={pokemon.image}
          alt={pokemon.name}
          width={200}
          height={200}
          className="h-full w-full animate-poke-bounce object-contain"
        />
      </div>
    </div>
  )
}

export default PokemonImage
