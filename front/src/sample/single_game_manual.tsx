import { useState } from 'react'
import type { TensuMapProp } from '../components/board/type'
import { Game } from '../components/game'

export const SingleGameManual = (): JSX.Element => {
  const ininitialTensuMap: TensuMapProp = {
    own: 27000,
    player1: 24000,
    player2: 25000,
    player3: 24000
  }
  const [tensuMap, setTensuMap] = useState(ininitialTensuMap)

  return <Game oya='own' ownAuto={false} bakaze={1} kyoku={1} hon={1} reach={1} tensuMap={tensuMap} setTensuMap={setTensuMap} />
}
