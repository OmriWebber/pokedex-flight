import PokemonImage from '@/components/PokemonImage'
import PokemonStats from '@/components/PokemonStats'

interface PokemonDetailsCardProps {
  pokemon: any
}

const PokemonDetailsCard = ({ pokemon }: PokemonDetailsCardProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col w-full items-center justify-center">
        <PokemonImage pokemon={pokemon} />
        <PokemonStats pokemon={pokemon} />
      </div>
    </div>
  )
}

export default PokemonDetailsCard
