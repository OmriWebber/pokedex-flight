import { Type } from '@/types/Pokemon';
import PokemonTypeColor from './colors';

const getBackgroundColors = (
  types: Type[]
): { light: string; medium: string }[] => {
  return types.map(({ type }) => {
    const entry = Object.entries(PokemonTypeColor).find(
      ([key]) => key === type.name
    );

    if (!entry) {
      console.warn(`No background color found for type: ${name}`);
      return { light: '#FFFFFF', medium: '#CCCCCC' }; // Default colors
    }

    const [, backgroundColor] = entry;
    return backgroundColor;
  });
};

export default getBackgroundColors;