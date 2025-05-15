import { FC } from 'react'

interface StateProps {
  baseStats: {
    base_stat: string
    stat: {
      name: string
    }
  }[]
}

const BaseStats: FC<StateProps> = ({ baseStats }) => {

  const totalBaseStats = baseStats.reduce((acc: number, stat: any) => {
    return acc + stat.base_stat
  }, 0)

  const getProgressBarColor = (value: number) => {
    if (value >= 50) return 'bg-green-500';
    return 'bg-red-500';
  };

  const getTotalProgressBarColor = (value: number) => {
    if (value >= 300) return 'bg-green-500';
    return 'bg-red-500';
  }

  

  return (
    <div className="w-full overflow-hidden max-w-[800px] mx-auto">
      <table className="w-full border-collapse overflow-hidden">
        <tbody>
          {baseStats.map((s: any, index: number) => {
            const { base_stat, stat } = s
            
            return (
              <tr key={index} className="flex flex-row w-full items-center justify-between gap-1  my-2">
                <td className="w-2/8">
                  <p className="whitespace-nowrap">
                    {stat.name
                      .charAt(0)
                      .toUpperCase() + stat.name
                      .replace('special-attack', 'Sp. Atk')
                      .replace('special-defense', 'Sp. Def')
                      .slice(1)}
                  </p>            
                </td>
                <td className="w-1/4 text-center">
                  {base_stat}
                </td>
                <td className="w-full h-1.5 bg-gray-200 rounded overflow-hidden">
                  <div
                    className={`h-full rounded-2xl ${getProgressBarColor(base_stat)}`}
                    style={{ width: `${(base_stat / 100) * 100}%` }}
                  >  
                  </div>
                </td>
              </tr>
            )
          })}
          <tr className="flex flex-row w-full items-center justify-between gap-1">
            <td className="w-2/8">
              <p className='whitespace-nowrap'>Total</p>
            </td>
            <td className="w-1/4 text-center">
              {totalBaseStats}
            </td>
            <td className="w-full h-1.5 bg-gray-200 rounded overflow-hidden">
              <div
                className={`h-full rounded ${getTotalProgressBarColor(totalBaseStats)}`}
                style={{ width: `${(totalBaseStats / 600) * 100}%` }}
              ></div>
            </td>
          </tr>

        </tbody>
        
      </table>
    </div>
  )
}

export default BaseStats
