import type { AllPaiProp } from '../board/type'
import { execSuteru } from './exec_suteru'

export const cpuThink = (allPai: any, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>): void => {
  const turnUserMatch = boardStatus.match(/^turn_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (turnUserMatch === null) {
    return
  }

  const turnUser = turnUserMatch[1]
  // 自分自身の場合はオートで実行しない
  if (turnUser === 'own') {
    return
  }

  // @todo: ここのロジックを色々頑張りたいところ

  // ひとまず自摸切りしておく
  execSuteru(allPai, setAllPai, turnUser, setBoardStatus, allPai[turnUser].base.length - 1, yama)
  setExecUser(turnUser)
}
