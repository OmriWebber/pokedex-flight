import PokemonDetailsCard from '@/components/PokemonDetailsCard';
import fetcher from '@/utils/fetcher';
import getPokemon from '@/utils/getPokemon';
import { normalizePokemon } from '@/utils/normalizePokemon';
import Head from 'next/head';
import capitaliseFirstLetter from '@/utils/capatilise';

interface PokemonPageProps {
  params: Promise<{ 
    name: string 
  }>;
}

export default async function Pokemon({ params }: PokemonPageProps) {
  const {name} = await params;

    if (!name) {
    throw new Error('Invalid params: "name" is required');
  }

  const { pokemonData, pokemonSpeciesData } = await getPokemon({ name });

  console.log('pokemonData', pokemonData);
  console.log('pokemonSpeciesData', pokemonSpeciesData);

  if (!(pokemonData && pokemonSpeciesData)) {
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
  const pokemons = await fetcher('https://pokeapi.co/api/v2/pokemon?limit=10');
  return pokemons.results.map((pokemon: any) => ({
    name: pokemon.name,
  }));
}


