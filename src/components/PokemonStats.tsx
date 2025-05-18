/* eslint-disable react/jsx-key */
'use client';
import { Type } from '@/types/Pokemon'
import PokemonTypeColor from '@/utils/colors'
import EvolutionChain from '@/components/Evolution/EvolutionChain'
import Stats from '@/components/Stats'
import { useEffect, useState } from 'react'
import About from './About';
import Moves from './Moves';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';
import getBackgroundColors from '@/utils/getBackgroundColors';
import getMove from '@/utils/getMove';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [moveDetailsMap, setMoveDetailsMap] = useState<Record<string, any>>({});
  const { bgColors } = pokemon;

  const tabs = [Tab.ABOUT, Tab.STATS, Tab.EVOLUTIONS, Tab.Moves];

  // Handle swipe gestures
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      const currentIndex = tabs.indexOf(activeTab);
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1]); 
      }
    },
    onSwipedRight: () => {
      const currentIndex = tabs.indexOf(activeTab);
      if (currentIndex > 0) {
        setActiveTab(tabs[currentIndex - 1]);
      }
    },
    preventScrollOnSwipe: true,
  });

  // Animation variants for tab transitions
  const variants = {
    initial: { opacity: 0, y: 50 }, 
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  // Fetch move details for all moves on mount
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    Promise.all(
      pokemon.moves.map(async (move: any) => {
        const details = await getMove({ url: move.move.url });
        return { name: move.move.name, details };
      })
    ).then((moveDetails) => {
      if (isMounted) {
        const map = moveDetails.reduce((acc: any, move: any) => {
          acc[move.name] = move.details;
          return acc;
        }, {});
        setMoveDetailsMap(map);
        setIsLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [pokemon.moves]);

  return (
    <div {...swipeHandlers} className="relative flex h-[60vh] lg:h-[50vh] w-full flex-col items-start justify-start bg-primary bg-white rounded-t-4xl overflow-hidden">
      <div className="w-full overflow-y-auto relative overflow-x-hidden">

        {/* Tabs */}
        <div className="sticky top-0 flex w-full justify-between md:justify-center bg-white font-bold pt-16 text-sm lg:text-lg overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveTab(Tab.ABOUT)}
            className={`px-4 py-4 ${activeTab === Tab.ABOUT ? `border-b-2` : 'text-gray-500'}`}
            style={activeTab && { borderColor: bgColors[0].medium }}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab(Tab.STATS)}
            className={`px-4 py-4 ${activeTab === Tab.STATS ? `border-b-2` : 'text-gray-500'}`}
            style={activeTab && { borderColor: bgColors[0].medium }}
          >
            Base Stats
          </button>
          <button
            onClick={() => setActiveTab(Tab.EVOLUTIONS)}
            className={`px-4 py-4 ${activeTab === Tab.EVOLUTIONS ? `border-b-2` : 'text-gray-500'}`}
            style={activeTab && { borderColor: bgColors[0].medium }}
          >
            Evolutions
          </button>
          <button
            onClick={() => setActiveTab(Tab.Moves)}
            className={`px-4 py-4 ${activeTab === Tab.Moves ? `border-b-2` : 'text-gray-500'}`}
            style={activeTab && { borderColor: bgColors[0].medium }}
          >
            Moves
          </button>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="p-4 md:p-8 w-full text-sm lg:text-base"
        >
          {activeTab === Tab.ABOUT && <About pokemon={pokemon} about={pokemon.stats} />}
          {activeTab === Tab.STATS && <Stats baseStats={pokemon.baseStats} />}
          {activeTab === Tab.EVOLUTIONS && <EvolutionChain pokemon={pokemon} />}
          {activeTab === Tab.Moves && <Moves moves={pokemon.moves} moveDetails={moveDetailsMap} loading={isLoading} />}
        </motion.div>
      </div>
    </div>
  )
}

export default PokemonStats
