import { setTsumo } from '../board/common/set_tsumo'
import type { AllPaiProp, PaiProp, ShantenListProp, SuteType, UserProp } from '../board/type'
import { isReachable } from './detection/is_reachable'
import { execSuteru } from './exec_suteru'
import { shantenBase } from './shanten_base'

export const cpuThink = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean): void => {
  const turnUserMatch = boardStatus.match(/^turn_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (turnUserMatch === null) {
    return
  }

  const turnUser = turnUserMatch[1] as UserProp

  // 上がり
  if (allPai[turnUser].shantenInfo.shanten === -1) {
    setTsumo(allPai, turnUser, setBoardStatus)
    return
  }

  // @todo: ここのロジックを色々頑張りたいところ
  // リーチ状態では考えることはなくツモ切り
  // eslint-disable-next-line
  if (allPai[turnUser].isReach) {
    execSuteru(allPai, setAllPai, turnUser, boardStatus, setBoardStatus, allPai[turnUser].base.length - 1, yama, 'normal', ownAuto)
  } else {
    cpuThink1(allPai, setAllPai, yama, setYama, boardStatus, setBoardStatus, setExecUser, turnUser, ownAuto)
  }

  setExecUser(turnUser)
}

const cpuThink1 = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>, turnUser: UserProp, ownAuto: boolean): void => {
  const minShantenList = minShantenPick(allPai[turnUser])

  // シャンテン数が少ないものをランダムで切るようにする
  const shuffleShanteList = shuffle(minShantenList)

  // テンパイ即リーチする
  const suteType = tenpaiSokuReach(allPai[turnUser], boardStatus)

  execSuteru(allPai, setAllPai, turnUser, boardStatus, setBoardStatus, shuffleShanteList[0].key, yama, suteType, ownAuto)
}

const minShantenPick = (hai: PaiProp): ShantenListProp[] => {
  // とりあえずシャンテン数が減る方向に切ってみる
  const shantenList: ShantenListProp[] = []
  let minShanten = 99
  hai.base.forEach((_c: string, k: number) => {
    const paiInfoCopy: PaiProp = JSON.parse(JSON.stringify(hai))
    // 1個ずつずらしてみる
    paiInfoCopy.base.splice(k, 1)

    const shantenInfo = shantenBase(paiInfoCopy)
    shantenList.push({
      key: k,
      shantenInfo
    })
    if (minShanten > shantenInfo.shanten) {
      minShanten = shantenInfo.shanten
    }
  })

  return shantenList.filter((s) => {
    return s.shantenInfo.shanten === minShanten
  })
}

const tenpaiSokuReach = (hai: PaiProp, boardStatus: string): SuteType => {
  return isReachable(hai, boardStatus) ? 'reach' : 'normal'
}

const shuffle = ([...array]): ShantenListProp[] => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
