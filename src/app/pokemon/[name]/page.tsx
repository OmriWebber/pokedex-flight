import PokemonDetailsCard from '@/components/PokemonDetailsCard';
import fetcher from '@/utils/fetcher';
import getPokemon from '@/utils/getPokemon';
import { normalizePokemon } from '@/utils/normalizePokemon';
import Head from 'next/head';
import * as React from 'react'
import capitaliseFirstLetter from '@/utils/capatilise';

interface PokemonPageProps {
  params: { 
    name: string 
  };
}

export default async function Pokemon({ params }: PokemonPageProps) {
  const { name } = await params;

  const { pokemonData, pokemonSpeciesData } = await getPokemon({ name });

  if (!(pokemonData && pokemonSpeciesData)) {
    // Redirect if data is not found
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const evolution = await fetcher(pokemonSpeciesData.evolution_chain.url);

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
      <Head>
        <title>{formatedName}</title>
        <meta name="description" content={`Stats for ${formatedName}`} />
        <meta property="og:title" content={formatedName} />
      </Head>

      <PokemonDetailsCard pokemon={pokemon} />
    </>
  );
}

export async function generateStaticParams() {
  const pokemons: any = await fetcher(
    `https://pokeapi.co/api/v2/pokemon/?limit=15`
  );

  return pokemons.results.map((pokemon: any) => ({
    name: pokemon.name,
  }));
}