import { FC } from 'react'

interface StateProps {
  about: {
    title: string
    content: string | string[] | undefined
  }[]
}

const Stats: FC<StateProps> = ({ about }) => {
  return (
    <div className="mt-8 w-full overflow-hidden rounded-lg">
      <table className="w-full border-collapse overflow-hidden">
        <thead>
          <tr>
            <th
              colSpan={2}
              className="w-full bg-secondary px-5 py-1 text-center text-lg font-semibold text-primary lg:py-2 lg:text-xl"
            >
              Pokemon Stats
            </th>
          </tr>
        </thead>

        <tbody>
          {about.map((s: any, index: number) => {
            const { title, content } = s
            
            return (
              <tr key={index} className="border even:bg-primary-600">
                <td className="p-2 text-left">
                  {title}
                </td>
                <td className="p-2 text-left">
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
