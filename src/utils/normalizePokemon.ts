/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlavorTextEntry } from '@/types/PokemonSpecies'
import getBackgroundColors from './getBackgroundColors'
import getStats from '@/utils/getStats'

interface NormalizePokemon {
  pokemon: any
  species: any
  evolution: any
}

export const normalizePokemon = ({
  pokemon,
  species,
  evolution,
}: NormalizePokemon) => {
  const imageURL = pokemon.sprites.other['official-artwork'].front_default

  const data = {
    id: pokemon.id,
    name: pokemon.name,
    number: pokemon.id.toString().padStart(3, '0'),
    image: `${imageURL}`,
    bgColors: getBackgroundColors(pokemon.types),
    types: pokemon.types,
    flavorText: species.flavor_text_entries.find(
      (l: FlavorTextEntry) => l.language.name === 'en'
    )?.flavor_text,
    stats: getStats({ species, pokemon }),
    baseStats: pokemon.stats,
    moves: pokemon.moves,
    abilities: pokemon.abilities,
    evolution: evolution,
  }

  return data
}

interface NormalizePokemonLite {
  pokemon: any
}

export const normalizePokemonLite = ({ pokemon }: NormalizePokemonLite) => {
  const imageURL = pokemon.sprites.other['official-artwork'].front_default

  const data = {
    id: pokemon.id,
    name: pokemon.name,
    number: pokemon.id.toString().padStart(3, '0'),
    image: imageURL,
    bgColors: getBackgroundColors(pokemon.types),
    baseStats: pokemon.stats,
    stats: pokemon.stats,
    moves: pokemon.moves,
    abilities: pokemon.abilities,
    types: pokemon.types,
  }

  return data
}
