/* eslint-disable @typescript-eslint/no-explicit-any */

import { Ability } from '@/types/Pokemon'
import { Genera } from '@/types/PokemonSpecies'
import capitaliseFirstLetter from './capatilise'

const getStats = ({ species, pokemon }: any) => {
  const stats = [
    {
      title: 'Species',
      content: species?.genera?.find((l: Genera) => l.language.name === 'en')
        ?.genus,
    },
    {
      title: 'Habitat',
      content: capitaliseFirstLetter(species?.habitat?.name),
    },
    {
      title: 'Height',
      content: pokemon?.height?.toString().padEnd(1, '.0') + ' m',
    },
    {
      title: 'Weight',
      content: (pokemon?.weight / 10).toFixed(1) + ' kg',
    },
    {
      title: 'Abilities',
      content: pokemon?.abilities
        ?.map((ability: Ability) => capitaliseFirstLetter(ability.ability.name))
        .join(', '),
    },
    {
      title: 'Base Exp',
      content: pokemon?.base_experience.toString(),
    },
    {
      title: 'Catch Rate',
      content: ((species?.capture_rate / 255) * 100).toFixed(1) + '%',
    },
    {
      title: 'Growth Rate',
      content: capitaliseFirstLetter(species?.growth_rate.name),
    },
  ]

  return stats
}

export default getStats
