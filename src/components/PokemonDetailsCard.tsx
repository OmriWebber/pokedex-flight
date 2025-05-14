import PokemonImage from '@/components/PokemonImage'
import PokemonStats from '@/components/PokemonStats'

interface PokemonDetailsCardProps {
  pokemon: any
}

const PokemonDetailsCard = ({ pokemon }: PokemonDetailsCardProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center p-4 sm:p-8 pt-16">
      <div className="flex flex-col w-full max-w-[800px] items-center justify-center rounded-2xl border-2 border-gray-300 bg-white p-4 shadow-lg shadow-black/10">
        <PokemonImage pokemon={pokemon} />
        <PokemonStats pokemon={pokemon} />
      </div>
    </div>
  )
}

export default PokemonDetailsCard
