export interface Pokemon {
    id: number
    name: string
    type: Type[]
    Image: string
    stats: Stat[]
    url: string
}

export interface Type2 {
  name: string
  url: string
}

export interface Type {
  slot: number
  type: Type2
}

export interface Stat {
    base_stat: number
    effort: number
    stat: {
        name: string
        url: string
    }
}

export interface Ability2 {
  name: string
  url: string
}

export interface Ability {
  is_hidden: boolean
  slot: number
  ability: Ability2
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}