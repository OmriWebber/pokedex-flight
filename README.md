# Pokedex

Developed for a technical test for Flight Digital. Built with [Next.js](https://nextjs.org). It allows users to browse Pokémon, view their stats, evolutions, and moves.

## Features

- **Pokémon Search**: Search for Pokémon by name or number.
- **Tabs with Swipe Gestures**: Navigate between tabs (About, Stats, Evolutions, Moves) by swiping or clicking.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Server-Side Rendering (SSR)**: Pre-rendered pages for better performance and SEO.
- **Pagination**: Efficiently browse through Pokémon data.

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Fetching**: SWR with `useSWRInfinite`
- **Animations**: GSAP and Framer Motion
- **Swipe Gestures**: [react-swipeable](https://www.npmjs.com/package/react-swipeable)
- **API**: [PokeAPI](https://pokeapi.co)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- Yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/pokedex-flight.git
cd pokedex-flight
```

2. Install dependencies:

```bash
yarn install
```

### Running the Dev Server

Start the dev server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.


## Deployment

Deployed with vercel at [https://pokedex-flight.vercel.app/](https://pokedex-flight.vercel.app/)