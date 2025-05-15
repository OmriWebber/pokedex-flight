import PokemonImage from '@/components/PokemonImage'
import PokemonStats from '@/components/PokemonStats'

interface PokemonDetailsCardProps {
  pokemon: any
}

const PokemonDetailsCard = ({ pokemon }: PokemonDetailsCardProps) => {
  return (
    <div className="flex w-full h-screen items-stretch">
      <div className='fixed inset-0' style={{ background: `radial-gradient(#fafafa,30%, ${pokemon.bgColors[0].medium})`}}>

      </div>
      <div className="flex flex-col w-full items-center justify-center">
        <PokemonImage pokemon={pokemon} />
        <div className='px-4 md:px-8 flex w-full h-full flex-col items-center justify-center'>
          <PokemonStats pokemon={pokemon} />

        </div>
      </div>
    </div>
  )
}

export default PokemonDetailsCard
