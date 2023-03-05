
import type { AllPaiProp, GameMapProp, UserProp } from '../board/type'
import { cpuThink } from './cpu_think'
import { shantenCheck } from './shanten_check'

export const turn = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, execUser: string, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean, gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>): void => {
  const turnUserMatch = boardStatus.match(/^turn_(own|player1|player2|player3)_[0-9]+$/)
  // マッチしないときは何もしない
  if (turnUserMatch === null) {
    return
  }
  const turnUser = turnUserMatch[1] as UserProp

  // 既に処理済み
  if (execUser === turnUser) {
    return
  }

  // 2回実行されることがあるので牌の数が足りてるときは何もしないようにする
  if (allPai[turnUser].base.length + allPai[turnUser].naki.length * 3 >= 14) {
    return
  }

  // 牌をツモる
  const catYama = yama.splice(0, 1)
  setYama(yama)

  // 1枚もらう
  allPai[turnUser].base = allPai[turnUser].base.concat(catYama)
  setAllPai(allPai)

  shantenCheck(allPai, setAllPai, yama, gameMap.bakaze, turnUser)

  setTimeout(() => {
    if (turnUser === 'own' && !ownAuto) {
      setExecUser(turnUser)
      setBoardStatus('think_'.concat(turnUser))
    } else {
      cpuThink(allPai, setAllPai, turnUser, yama, setYama, boardStatus, setBoardStatus, setExecUser, ownAuto, gameMap.bakaze, gameMap, setGameMap)
    }
  }, 250)
}
