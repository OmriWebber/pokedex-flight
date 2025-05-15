import { FC } from 'react'

interface StateProps {
  pokemon: any
  about: {
    title: string
    content: string | string[] | undefined
  }[]
}

const Stats: FC<StateProps> = ({ pokemon ,about }) => {
  return (
    <div className="w-full overflow-hidden max-w-[800px] mx-auto">
      <p className='text-center mb-6 max-w-[400px] mx-auto'>{pokemon.flavorText}</p>
      <table className="w-full border-collapse overflow-hidden">
        <tbody>
          {about.map((s: any, index: number) => {
            const { title, content } = s
            
            return (
              <tr key={index} className="flex flex-row w-full items-center justify-between gap-8 my-2">
                <td className="w-full">
                  <p className="whitespace-nowrap text-right text-sm opacity-50 text-secondary">
                    {title}
                  </p>            
                </td>
                <td className="w-full text-left font-bold">
                  {content}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Stats
