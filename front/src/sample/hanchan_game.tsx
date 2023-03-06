import { useState } from 'react'
import type { GameMapProp } from '../components/board/type'
import { Game } from '../components/game'
import { Initial } from '../components/game/initial'

export const HanchanGame = (): JSX.Element => {
  const initialGameMapInfo: GameMapProp = {
    tensu: {
      own: 25000,
      player1: 25000,
      player2: 25000,
      player3: 25000
    },
    cpuType: {
      own: 1,
      player1: 1,
      player2: 1,
      player3: 1
    },
    bakaze: 1,
    kyoku: 1,
    hon: 0,
    reach: 0,
    oya: 'player1',
    ownAuto: true
  }

  const [gameMap, setGameMap] = useState(initialGameMapInfo)
  const [setting, setSetting] = useState(false)

  // eslint-disable-next-line
  return setting ? <Game gameMap={gameMap} setGameMap={setGameMap} /> : <Initial setting={setting} setSetting={setSetting} gameMap={gameMap} setGameMap={setGameMap} />
}
