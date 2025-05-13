import { PokemonResponse } from '@/types/Pokemon';

const requestOptions: RequestInit = {
  method: "GET",
  redirect: "follow",
};

const fetchAllPokemon = async (): Promise<PokemonResponse> => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon", requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PokemonResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch Pokémon data:", error);
    throw error;
  }
};

export default fetchAllPokemon;