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
    bakaze: 1,
    kyoku: 1,
    hon: 1,
    reach: 1,
    oya: 'own'
  }

  const [gameMap, setGameMap] = useState(initialGameMapInfo)

  return <Game ownAuto={false} gameMap={gameMap} setGameMap={setGameMap} />
}
