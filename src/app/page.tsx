'use client';

import { useState, useMemo } from 'react';
import fetchAllPokemon from '@/hooks/fetchAllPokemon';
import PokemonCard from '@/components/PokemonCard';
import Search from '@/components/Search';

export interface Result {
  name: string;
  url: string;
}

export default function Home() {
  const { data } = fetchAllPokemon();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'number'>('number');
  const itemsPerPage = 15;

  // Flatten all Pokemon data into a single array
  const pokemons: any = useMemo(
    () => data?.flatMap((page: any) => page?.results) ?? [],
    [data]
  );

  // Filter Pokemon based on the search term
  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemons, searchTerm]);

  // Sort Pokemon based on the selected criteria (name or number)
  const sortedPokemons = useMemo(() => {
    return [...filteredPokemons].sort((a: any, b: any) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name); // Sort alphabetically by name
      } else {
        const aNumber = parseInt(a.url.split('/').slice(-2, -1)[0]); // Extract number from URL
        const bNumber = parseInt(b.url.split('/').slice(-2, -1)[0]);
        return aNumber - bNumber; // Sort numerically by number
      }
    });
  }, [filteredPokemons, sortBy]);

  // Paginate the sorted Pokémon
  const paginatedPokemons = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedPokemons.slice(startIndex, endIndex);
  }, [sortedPokemons, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  return (
    <div className="min-h-screen p-8 pb-20">
      <div className='mb-8'>
        <h1 className='text-center w-full text-6xl'>PokeDex</h1>

      </div>
      <div className="flex flex-col md:flex-row items-center justify-end w-full gap-4 mb-8">
        {/* Search Input */}
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Sort Button */}
        <button
          onClick={() => setSortBy((prev) => (prev === 'name' ? 'number' : 'name'))}
          className="whitespace-nowrap h-full px-4 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Sort by {sortBy === 'name' ? 'Number' : 'Name'}
        </button>
      </div>
      

      {/* Pokemon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-center gap-8 pb-8">
        
        {paginatedPokemons.map((data: any, index: number) => {
          const { name, url } = data;

          return (
            <div key={name} className="w-full">
              <PokemonCard url={url} index={index + 1} />
            </div>
          );
        })}
      </div>

      {paginatedPokemons.length === 0 && (
        <div className="w-full flex items-center justify-center">
          <p className="text-xl text-center font-bold text-gray-500">No Pokémon found</p>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="fixed bottom-0 left-0 w-full p-4 drop-shadow-2xl border-t border-black/10 bg-white flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}