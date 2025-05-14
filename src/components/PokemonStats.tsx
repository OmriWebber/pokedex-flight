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

  console.log('PokemonStats', pokemon);

  return (
    <div className="relative overscroll-visible flex h-full w-full flex-col items-start justify-start bg-primary lg:max-h-[70vh] lg:overflow-y-auto bg-white rounded-t-4xl overflow-hidden -mt-16">
      <div className="w-full">

        {/* Tabs */}
        <div className="sticky top-0 flex w-full justify-center bg-white font-bold pt-16">
          <button
            onClick={() => setActiveTab(Tab.ABOUT)}
            className={`px-4 py-4 ${activeTab === Tab.ABOUT ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab(Tab.STATS)}
            className={`px-4 py-4 ${activeTab === Tab.STATS ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          >
            Base Stats
          </button>
          <button
            onClick={() => setActiveTab(Tab.EVOLUTIONS)}
            className={`px-4 py-4 ${activeTab === Tab.EVOLUTIONS ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          >
            Evolutions
          </button>
          <button
            onClick={() => setActiveTab(Tab.Moves)}
            className={`px-4 py-4 ${activeTab === Tab.Moves ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          >
            Moves
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-8 w-full">
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
