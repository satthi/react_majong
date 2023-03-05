import { useState } from 'react'
import type { GameMapProp } from '../components/board/type'
import { Game } from '../components/game'

export const SingleGameManual = (): JSX.Element => {
  const initialGameMapInfo: GameMapProp = {
    tensu: {
      own: 27000,
      player1: 24000,
      player2: 25000,
      player3: 24000
    },
    bakaze: 2,
    kyoku: 4,
    hon: 1,
    reach: 1,
    oya: 'own',
    ownAuto: false
  }

  const [gameMap, setGameMap] = useState(initialGameMapInfo)

  return <Game gameMap={gameMap} setGameMap={setGameMap} />
}
