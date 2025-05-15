import { FC } from 'react'

interface StateProps {
  about: {
    title: string
    content: string | string[] | undefined
  }[]
}

const Stats: FC<StateProps> = ({ about }) => {
  return (
    <div className="w-full overflow-hidden max-w-[800px] mx-auto">
      <table className="w-full border-collapse overflow-hidden">
        <tbody>
          {about.map((s: any, index: number) => {
            const { title, content } = s
            
            return (
              <tr key={index} className="flex flex-row w-full items-center justify-between gap-1 my-2">
                <td className="w-2/4">
                  <p className="whitespace-nowrap">
                    {title}
                  </p>            
                </td>
                <td className="w-2/4 text-left">
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
