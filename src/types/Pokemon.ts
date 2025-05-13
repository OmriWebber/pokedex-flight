export interface Pokemon {
    id: number
    name: string
    type: Type[]
    Image: string
    stats: Stat[]
    url: string
}

export interface Type {
    name: string
    url: string
}

export interface Stat {
    base_stat: number
    effort: number
    stat: {
        name: string
        url: string
    }
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}