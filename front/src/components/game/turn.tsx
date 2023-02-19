
import type { AllPaiProp } from '../board/type'
import { cpuThink } from './cpu_think'
import { shantenCheck } from './shanten_check'

export const turn = (allPai: any, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, execUser: string, setExecUser: React.Dispatch<React.SetStateAction<string>>): void => {
  const turnUserMatch = boardStatus.match(/^turn_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (turnUserMatch === null) {
    return
  }
  const turnUser = turnUserMatch[1]

  // 既に処理済み
  if (execUser === turnUser) {
    return
  }

  // 2回実行されることがあるので牌の数が足りてるときは何もしないようにする
  if ((allPai[turnUser].base.length as number) + (allPai[turnUser].naki.length as number) * 3 >= 14) {
    return
  }
  // 牌をツモる
  const catYama = yama.splice(0, 1)
  setYama(yama)

  // 1枚もらう
  allPai[turnUser].base = allPai[turnUser].base.concat(catYama)
  setAllPai(allPai)

  shantenCheck(allPai, setAllPai)

  setTimeout(() => {
    if (turnUser === 'own') {
      setExecUser(turnUser)
      setBoardStatus('think_' + turnUser)
    } else {
      cpuThink(allPai, setAllPai, yama, setYama, boardStatus, setBoardStatus, setExecUser)
    }
  }, 250)
}
