import { EvolvesTo } from '@/types/EvolutionChain'
import getBackgroundColors from '@/utils/getBackgroundColors'
import { FC } from 'react'
import { CaretRight } from '@/components/Icons'
import EvolutionImage from '@/components/Evolution/EvolutionImage'
import { IMAGE_URL } from '@/utils/constants'

interface EvolutionChainProps {
  pokemon: any
}

const EvolutionChain: FC<EvolutionChainProps> = ({ pokemon }) => {
  return (
    <div className="my-8 flex flex-wrap justify-center overflow-visible">
      {pokemon?.evolution?.chain?.species && (
        <EvolutionImage
          species={pokemon.evolution?.chain.species}
          imageURL={`${IMAGE_URL + pokemon.evolution?.chain.species.url.split('/').slice(-2, -1)[0]}.png`} // TODO
          bgColor={pokemon.bgColors}
        />
      )}

      {pokemon.evolution?.chain.evolves_to.length !== 0 && (
        <>
          <CaretRight className="mb-8 mr-3 self-center text-lg text-secondary xl:mr-6 " />
          {pokemon.evolution?.chain.evolves_to.map(
            (s: EvolvesTo, idx: number) => {
              return (
                <EvolutionImage
                  key={idx}
                  species={s.species}
                  imageURL={`${IMAGE_URL + s.species.url.split('/').slice(-2, -1)[0]}.png`} // TODO
                  bgColor={pokemon.bgColors}
                />
              )
            }
          )}
        </>
      )}

      {typeof pokemon.evolution?.chain.evolves_to[0]?.evolves_to !==
        'undefined' &&
        pokemon.evolution?.chain.evolves_to[0].evolves_to.length !== 0 && (
          <>
            <CaretRight className="mb-8 mr-3 self-center text-lg text-secondary  xl:mr-6 " />
            {pokemon.evolution?.chain.evolves_to[0].evolves_to.map(
              (s: EvolvesTo, idx: number) => {
                return (
                  <EvolutionImage
                    key={idx}
                    species={s.species}
                    imageURL={`${IMAGE_URL + s.species.url.split('/').slice(-2, -1)[0]}.png`} // TODO
                    bgColor={getBackgroundColors(pokemon.types)}
                  />
                )
              }
            )}
          </>
        )}
    </div>
  )
}

export default EvolutionChain
