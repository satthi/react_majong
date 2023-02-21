import { setTsumo } from '../board/common/set_tsumo'
import type { AllPaiProp } from '../board/type'
import { execSuteru } from './exec_suteru'
import { shantenBase } from './shanten_base'

export const cpuThink = (allPai: any, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>): void => {
  const turnUserMatch = boardStatus.match(/^turn_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (turnUserMatch === null) {
    return
  }

  const turnUser = turnUserMatch[1]

  // 上がり
  if (allPai[turnUser].shanten.shanten === -1) {
    setTsumo(allPai, turnUser, setBoardStatus)
    return
  }

  // @todo: ここのロジックを色々頑張りたいところ
  cpuThink1(allPai, setAllPai, yama, setYama, boardStatus, setBoardStatus, setExecUser, turnUser)
}

const cpuThink1 = (allPai: any, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>, turnUser: string): void => {
  // とりあえずシャンテン数が減る方向に切ってみる
  const shantenList: any[] = []
  let minShanten = 99
  allPai[turnUser].base.forEach((_c: any, k: number) => {
    const paiInfoCopy = JSON.parse(JSON.stringify(allPai[turnUser]))
    // 1個ずつずらしてみる
    paiInfoCopy.base.splice(k, 1)

    const shanten = shantenBase(paiInfoCopy)
    shantenList.push({
      key: k,
      shanten
    })
    if (minShanten > shanten.shanten) {
      minShanten = shanten.shanten
    }
  })

  const minShantenList = shantenList.filter((s) => {
    return s.shanten.shanten === minShanten
  })

  // シャンテン数が少ないものをランダムで切るようにする
  const shuffleShanteList = shuffle(minShantenList)

  // ひとまず自摸切りしておく
  execSuteru(allPai, setAllPai, turnUser, setBoardStatus, shuffleShanteList[0].key, yama)

  setExecUser(turnUser)
}

const shuffle = ([...array]): any[] => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
