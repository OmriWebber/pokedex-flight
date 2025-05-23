import { Species } from '@/types/EvolutionChain'
import Link from 'next/link'
import { FC } from 'react'

interface EvolutionImageProps {
  species: Species
  imageURL?: string
  bgColor: { light: string; medium: string }[]
}

const EvolutionImage: FC<EvolutionImageProps> = ({ species, imageURL, bgColor }) => {
  return (
    <div className="ease-out-in mb-3 mr-3 flex flex-col items-center justify-center duration-700 will-change-transform hover:-translate-y-2 xl:mr-6">
      <Link
        href={`/pokemon/${species.name}`}
        className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full"
        style={{
          background: `radial-gradient(#fafafa,50%, ${bgColor[0].medium})`,
        }}
      >
        <img
          key={species.name}
          src={`${imageURL}`}
          height={80}
          width={80}
          alt={species.name}
        />
      </Link>
      <p className="text-sm font-semibold capitalize">{species.name}</p>
    </div>
  )
}

export default EvolutionImage
