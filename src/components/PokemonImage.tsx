import Link from 'next/link'
import { ArrowLeft } from '@/components/Icons'

interface PokemonImageProps {
  pokemon: any
}

const PokemonImage = ({ pokemon }: PokemonImageProps) => {
  return (
    <div
      className="relative flex h-full max-h-[70vh] min-h-[50vh] w-full flex-col items-center justify-between"
      style={{
        background: `radial-gradient(#fafafa,30%, ${pokemon.bgColors[0].medium})`,
      }}
    >
      <div className="flex w-full flex-row items-center justify-between p-3 pr-5">
        <Link href={'/'} className='relative bg-white rounded-full p-1 drop-shadow-2xl'>
          <ArrowLeft className="w-8 h-8 font-light text-primary opacity-80 transition-colors duration-150 hover:text-secondary z-10" />
        </Link>

        <p className="select-none text-xl font-bold text-primary/70 drop-shadow-2xl">
          {`#${pokemon.id.toString().padStart(3, '0')}`}
        </p>
      </div>

      <div className="absolute top-28 flex select-none flex-col items-center justify-center text-4xl font-bold text-primary opacity-60 drop-shadow-xl lg:top-36 lg:text-7xl">
        <h1 className="capitalize">{pokemon.name}</h1>
      </div>

      <div className="relative flex h-2/4 w-3/4 items-center justify-center lg:h-full lg:w-[400px] overflow-visible z-20">
        {/* The next/image component is not used here because this project is hosted by vercel and they 
      only allow 1000 image optimizations per month on the free tier. */}
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
