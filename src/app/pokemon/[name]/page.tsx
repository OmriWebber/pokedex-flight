import PokemonDetailsCard from '@/components/PokemonDetailsCard';
import fetcher from '@/utils/fetcher';
import getPokemon from '@/utils/getPokemon';
import { normalizePokemon } from '@/utils/normalizePokemon';
import Head from 'next/head';
import capitaliseFirstLetter from '@/utils/capatilise';
import { Metadata } from 'next';

interface PokemonPageProps {
  params: Promise<{ 
    name: string 
  }>;
}

export async function generateMetadata({ params }: PokemonPageProps) {
  const { name } = await params;

  const { pokemonData, pokemonSpeciesData } = await getPokemon({ name });

  if (!(pokemonData && pokemonSpeciesData)) {
    return {
      title: 'Pokedex | Flight',
      description: 'No data found',
    };
  }

  const evolution = await fetcher(pokemonSpeciesData.evolution_chain.url);

  // Normalize the data
  const pokemon = normalizePokemon({
    pokemon: pokemonData,
    species: pokemonSpeciesData,
    evolution,
  });

  // Capitalize the first letter of each word in the name
  const formatedName = pokemon.name
    .toLowerCase()
    .split(' ')
    .map((word: string) => capitaliseFirstLetter(word))
    .join(' ');

  // Return metadata for the page
  return {
    title: formatedName + ` | Pokedex - Flight`,
    description: `Stats for ${formatedName}`,
    openGraph: {
      title: formatedName,
      description: `Stats for ${formatedName}`,
      images: [
        {
          url: pokemon.image,
          alt: formatedName,
        },
      ],
    },
    twitter: {
      title: formatedName,
      description: `Stats for ${formatedName}`,
      images: [
        {
          url: pokemon.image,
          alt: formatedName,
        },
      ],
      card: 'summary_large_image',
    },
  };
}

export default async function Pokemon({ params }: PokemonPageProps) {
  const {name} = await params;

    if (!name) {
    throw new Error('Invalid params: "name" is required');
  }

  const { pokemonData, pokemonSpeciesData } = await getPokemon({ name });

  if (!(pokemonData && pokemonSpeciesData)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const evolution = await fetcher(pokemonSpeciesData.evolution_chain.url);

  // Normalize the data
  const pokemon = normalizePokemon({
    pokemon: pokemonData,
    species: pokemonSpeciesData,
    evolution,
  });

  // Capitalize the first letter of each word in the name
  const formatedName = pokemon.name
    .toLowerCase()
    .split(' ')
    .map((word: string) => capitaliseFirstLetter(word))
    .join(' ');

  return (
    <>
      <PokemonDetailsCard pokemon={pokemon} />
    </>
  );
}

// Generates static paths for the dynamic route
export async function generateStaticParams() {
  const pokemons = await fetcher('https://pokeapi.co/api/v2/pokemon?limit=10');
  return pokemons.results.map((pokemon: any) => ({
    name: pokemon.name,
  }));
}


