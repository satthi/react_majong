import { useState } from 'react'
import type { GameMapProp } from '../components/board/type'
import { Game } from '../components/game'

export const HanchanGame = (): JSX.Element => {
  const initialGameMapInfo: GameMapProp = {
    tensu: {
      own: 25000,
      player1: 25000,
      player2: 25000,
      player3: 25000
    },
    bakaze: 1,
    kyoku: 1,
    hon: 0,
    reach: 0,
    oya: 'player1',
    ownAuto: true
  }

  const [gameMap, setGameMap] = useState(initialGameMapInfo)

  return <Game gameMap={gameMap} setGameMap={setGameMap} />
}
