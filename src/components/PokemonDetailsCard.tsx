'use client';
import PokemonImage from '@/components/PokemonImage'
import PokemonStats from '@/components/PokemonStats'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PokemonDetailsCardProps {
  pokemon: any
}

const PokemonDetailsCard = ({ pokemon }: PokemonDetailsCardProps) => {
  const statsContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(statsContainer.current, { 
      opacity: 0,
      y: '100vh'
    }, { 
      opacity: 1, 
      y: 0,
      ease: 'power2.out',
      duration: 0.3, 
    });
    return () => {
      tl.kill();
    }
  }, [pokemon]);
  return (
    <div className="flex w-full h-screen items-stretch">
      <div className='fixed inset-0' style={{ background: `radial-gradient(#fafafa,30%, ${pokemon.bgColors[0].medium})`}}>

      </div>
      <div className="flex flex-col w-full items-center justify-center">
        <PokemonImage pokemon={pokemon} />
        <div ref={statsContainer} className='px-4 md:px-8 flex w-full h-full flex-col items-center justify-center'>
          <PokemonStats pokemon={pokemon} />

        </div>
      </div>
    </div>
  )
}

export default PokemonDetailsCard
