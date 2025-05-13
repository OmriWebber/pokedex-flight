'use client';

import { useEffect, useState } from 'react';
import fetchAllPokemon from '@/hooks/fetchAllPokemon';
import PokemonCard from '@/components/PokemonCard';
import { PokemonResponse } from '@/types/Pokemon';

export default function Home() {
  const [data, setData] = useState<PokemonResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAllPokemon();
        setData(result);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchData();
  }, []);

  const pokemons = data?.results || [];

  return (
    <div className="grid grid-cols-3 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {pokemons.map((pokemon, index) => (
        <PokemonCard key={index} index={index} name={pokemon.name} url={pokemon.url} />
      ))}
    </div>
  );
}