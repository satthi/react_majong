import { setTsumo } from '../board/common/set_tsumo'
import type { AllPaiProp, GameMapProp, HaiInfoProp, UserProp } from '../board/type'
import { execSuteru } from './exec_suteru'
import { think as type1Think } from './cpu_type/type1/think'
import { naki as type1Naki } from './cpu_type/type1/naki'
import { think as type2Think } from './cpu_type/type2/think'
import { naki as type2Naki } from './cpu_type/type2/naki'
import { think as type3Think } from './cpu_type/type3/think'
import { naki as type3Naki } from './cpu_type/type3/naki'

export const cpuThink = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, turnUser: UserProp, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean, bakaze: number, gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>): void => {
  // 上がり
  if (allPai[turnUser].shantenInfo.shanten === -1) {
    setTsumo(allPai, turnUser, setBoardStatus)
    return
  }

  // @todo: ここのロジックを色々頑張りたいところ
  // リーチ状態では考えることはなくツモ切り
  // eslint-disable-next-line
  if (allPai[turnUser].isReach) {
    execSuteru(allPai, setAllPai, turnUser, boardStatus, setBoardStatus, allPai[turnUser].base.length - 1, yama, setYama, 'normal', ownAuto, bakaze, setExecUser, gameMap, setGameMap)
  } else {
    if (gameMap.cpuType[turnUser] === 1) {
      type1Think(allPai, setAllPai, yama, setYama, boardStatus, setBoardStatus, setExecUser, turnUser, ownAuto, bakaze, gameMap, setGameMap)
    } else if (gameMap.cpuType[turnUser] === 2) {
      type2Think(allPai, setAllPai, yama, setYama, boardStatus, setBoardStatus, setExecUser, turnUser, ownAuto, bakaze, gameMap, setGameMap)
    } else if (gameMap.cpuType[turnUser] === 3) {
      // 牌の切り方はCPU2と共通とする
      type3Think(allPai, setAllPai, yama, setYama, boardStatus, setBoardStatus, setExecUser, turnUser, ownAuto, bakaze, gameMap, setGameMap)
    } else {
      // 未指定はないはずだが何もないことがないようにだけはしておく
      type1Think(allPai, setAllPai, yama, setYama, boardStatus, setBoardStatus, setExecUser, turnUser, ownAuto, bakaze, gameMap, setGameMap)
    }
  }
}

export const cpuNakiThink = (gameMap: GameMapProp, allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, checkUser: UserProp, yama: string[], suteruHaiKaiseki: HaiInfoProp, ownAuto: boolean, bakaze: number): void => {
  // 自身で操作中の場合は何もしない
  if (checkUser === 'own' && !ownAuto) {
    return
  }

  if (gameMap.cpuType[checkUser] === 1) {
    type1Naki(allPai, setAllPai, checkUser)
  } else if (gameMap.cpuType[checkUser] === 2) {
    type2Naki(allPai, setAllPai, checkUser)
  } else if (gameMap.cpuType[checkUser] === 3) {
    type3Naki(allPai, setAllPai, checkUser, yama, suteruHaiKaiseki, bakaze)
  } else {
    // 未指定はないはずだが何もないことがないようにだけはしておく
    type1Naki(allPai, setAllPai, checkUser)
  }
}
