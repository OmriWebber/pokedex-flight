/* eslint-disable react/jsx-key */
'use client';

import { Type } from '@/types/Pokemon'
import PokemonTypeColor from '@/utils/colors'
import EvolutionChain from '@/components/Evolution/EvolutionChain'
import Stats from '@/components/Stats'
import { useState } from 'react'
import About from './About';
import Moves from './Moves';

interface PokemonStatsProps {
  pokemon: any
}

enum Tab {
  ABOUT = 'about',
  STATS = 'stats',
  EVOLUTIONS = 'evolutions',
  Moves = 'moves',
}

const PokemonStats = ({ pokemon }: PokemonStatsProps) => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ABOUT);

  return (
    <div className="relative flex h-[60vh] lg:h-[50vh] w-full flex-col items-start justify-start bg-primary bg-white rounded-t-4xl overflow-hidden">
      <div className="w-full overflow-y-auto">

        {/* Tabs */}
        <div className="sticky top-0 flex w-full justify-between md:justify-center bg-white font-bold pt-16 text-sm lg:text-lg overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveTab(Tab.ABOUT)}
            className={`px-4 py-4 ${activeTab === Tab.ABOUT ? `border-b-2 ${pokemon.bgColors[0].medium}` : 'text-gray-500'}`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab(Tab.STATS)}
            className={`px-4 py-4 ${activeTab === Tab.STATS ? `border-b-2 ${pokemon.bgColors[0].medium}` : 'text-gray-500'}`}
          >
            Base Stats
          </button>
          <button
            onClick={() => setActiveTab(Tab.EVOLUTIONS)}
            className={`px-4 py-4 ${activeTab === Tab.EVOLUTIONS ? `border-b-2 ${pokemon.bgColors[0].medium}` : 'text-gray-500'}`}
          >
            Evolutions
          </button>
          <button
            onClick={() => setActiveTab(Tab.Moves)}
            className={`px-4 py-4 ${activeTab === Tab.Moves ? `border-b-2 ${pokemon.bgColors[0].medium}` : 'text-gray-500'}`}
          >
            Moves
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-8 w-full text-sm lg:text-base">
          {activeTab === Tab.ABOUT && <About about={pokemon.stats} />}

          {activeTab === Tab.STATS && <Stats baseStats={pokemon.baseStats} />}

          {activeTab === Tab.EVOLUTIONS && <EvolutionChain pokemon={pokemon} />}

          {activeTab === Tab.Moves && <Moves moves={pokemon.moves} />}
        </div>
      </div>
    </div>
  )
}

export default PokemonStats
