'use client';

import { FC, useEffect, useState } from 'react';
import getMove from '@/utils/getMove';
import { MoveDetails } from '@/types/Pokemon';

interface StateProps {
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: any[];
  }[];
  moveDetails: Record<string, MoveDetails | null>;
  loading: boolean;
}

const Moves: FC<StateProps> = ({ moves, moveDetails, loading }) => {


  return (
    <div className="w-full overflow-hidden max-w-[800px] mx-auto">
      <table className="w-full border-collapse overflow-hidden">
        <thead>
          <tr>
            <th className="text-left">Move Name</th>
            <th className="text-center">Power</th>
            <th className="text-center">PP</th>
            <th className="text-center">Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={4} className="text-center py-4">
                Loading move details...
              </td>
            </tr>
          )}
          {!loading &&
            moves.map((move: any, index: number) => {
              const { name } = move.move;
              const details = moveDetails[name]; // Access move details by name
              return (
                <tr key={index}>
                  <td className="py-2">{name.charAt(0).toUpperCase() + name.slice(1)}</td>
                  <td className='text-center'>{details?.moveData.power || 'N/A'}</td>
                  <td className='text-center'>{details?.moveData.pp || 'N/A'}</td>
                  <td className='text-center'>{details?.moveData.accuracy || 'N/A'}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Moves;