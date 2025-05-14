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
}

const Moves: FC<StateProps> = ({ moves }) => {
  const [moveDetails, setMoveDetails] = useState<Record<string, MoveDetails | null>>({}); // Store move details by name
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    const fetchMoveDetails = async () => {
      setLoading(true);
      try {
        const details: any = {};
        for (const move of moves) {
          const data: any = await getMove({ url: move.move.url }); // Use the Move type
          details[move.move.name] = data;
        }
        setMoveDetails(details);
      } catch (error) {
        console.error('Error fetching move details:', error);
      } finally {
        setLoading(false);
      }
    };
    console.log('moves', moveDetails);
    fetchMoveDetails();
  }, [moves]);



  return (
    <div className="mt-8 w-full overflow-hidden max-w-[800px] mx-auto">
      <table className="w-full border-collapse overflow-hidden">
        <thead>
          <tr>
            <th className="text-left">Move Name</th>
            <th className="text-left">Power</th>
            <th className="text-left">PP</th>
            <th className="text-left">Accuracy</th>
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
                  <td>{details?.power || 'N/A'}</td>
                  <td>{details?.pp || 'N/A'}</td>
                  <td>{details?.accuracy || 'N/A'}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Moves;