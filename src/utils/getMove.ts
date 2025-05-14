import { MoveDetails } from '@/types/Pokemon'
import fetcher from './fetcher'

const getMove = async ({ url }: { url: string }) => {
  const moveData: MoveDetails = await fetcher(
    `${url}`
  )

  return {
    moveData,
  }

}

export default getMove
