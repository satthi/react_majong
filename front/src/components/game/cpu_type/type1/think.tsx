import type { AllPaiProp, GameMapProp, UserProp } from '../../../board/type'
import { execSuteru } from '../../exec_suteru'
import { minShantenPick } from '../common/min_shanten_pick'
import { shuffle } from '../common/shuffle'
import { tenpaiSokuReach } from '../common/tenpai_soku_reach'

export const think = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>, turnUser: UserProp, ownAuto: boolean, bakaze: number, gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>): void => {
  const minShantenList = minShantenPick(allPai, allPai[turnUser], yama, bakaze)
  // 牌のリストをコストで見るようにしてみる
  const shuffleShanteList = shuffle(minShantenList)

  // テンパイ即リーチする
  const suteType = tenpaiSokuReach(allPai[turnUser], boardStatus)

  execSuteru(allPai, setAllPai, turnUser, boardStatus, setBoardStatus, shuffleShanteList[0].key, yama, setYama, suteType, ownAuto, bakaze, setExecUser, gameMap, setGameMap)
}
