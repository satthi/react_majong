import { useState } from 'react'
import type { GameMapProp } from '../components/board/type'
import { Game } from '../components/game'

export const SingleGame = (): JSX.Element => {
  const initialGameMapInfo: GameMapProp = {
    tensu: {
      own: 27000,
      player1: 24000,
      player2: 25000,
      player3: 24000
    },
    cpuType: {
      own: 2,
      player1: 2,
      player2: 2,
      player3: 2
    },
    bakaze: 1,
    kyoku: 1,
    hon: 1,
    reach: 1,
    oya: 'own',
    ownAuto: true
  }

  const [gameMap, setGameMap] = useState(initialGameMapInfo)

  return <Game gameMap={gameMap} setGameMap={setGameMap} />
}
