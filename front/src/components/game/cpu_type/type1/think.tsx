import type { AllPaiProp, GameMapProp, HaiInfoProp, PaiProp, UserProp } from '../../../board/type'
import { isAnkanableList } from '../../detection/is_ankanable_list'
import { execAnkan } from '../../exec_ankan'
import { execSuteru } from '../../exec_suteru'
import { shantenBase } from '../../shanten_base'
import { minShantenPick } from '../common/min_shanten_pick'
import { shuffle } from '../common/shuffle'
import { tenpaiSokuReach } from '../common/tenpai_soku_reach'

export const think = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>, turnUser: UserProp, ownAuto: boolean, bakaze: number, gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>): void => {
  // アンカン判定
  // type1でもアンカンだけは実行する
  let kanExec = false
  const ankanableList = isAnkanableList(allPai[turnUser])
  ankanableList.forEach((ah) => {
    // eslint-disable-next-line
    if (kanExec === true) {
      return
    }
    const kanhaiMatch = ah.match(/^hai_([1-4])_([1-9])$/)
    if (kanhaiMatch === null) {
      return
    }
    const kanhaiKaiseki: HaiInfoProp = {
      hai: ah,
      type: Number(kanhaiMatch[1]),
      num: Number(kanhaiMatch[2])
    }

    const ankanCheckPaiInfo: PaiProp = JSON.parse(JSON.stringify(allPai[turnUser]))
    // keyがずれる関係で一気に実行せずに4回実行する
    let cutHaiExec = false
    ankanCheckPaiInfo.base.forEach((b, bk) => {
      // eslint-disable-next-line
      if (b === ah && cutHaiExec === false) {
        ankanCheckPaiInfo.base.splice(bk, 1)
        cutHaiExec = true
      }
    })
    cutHaiExec = false
    ankanCheckPaiInfo.base.forEach((b, bk) => {
      // eslint-disable-next-line
      if (b === ah && cutHaiExec === false) {
        ankanCheckPaiInfo.base.splice(bk, 1)
        cutHaiExec = true
      }
    })
    cutHaiExec = false
    ankanCheckPaiInfo.base.forEach((b, bk) => {
      // eslint-disable-next-line
      if (b === ah && cutHaiExec === false) {
        ankanCheckPaiInfo.base.splice(bk, 1)
        cutHaiExec = true
      }
    })
    cutHaiExec = false
    ankanCheckPaiInfo.base.forEach((b, bk) => {
      // eslint-disable-next-line
      if (b === ah && cutHaiExec === false) {
        ankanCheckPaiInfo.base.splice(bk, 1)
        cutHaiExec = true
      }
    })
    // nakiHai情報にセットする
    ankanCheckPaiInfo.naki.push({
      type: 'ankan',
      keyHai: {
        haiInfo: kanhaiKaiseki,
        position: 'none'
      },
      hai: [
        kanhaiKaiseki,
        kanhaiKaiseki,
        kanhaiKaiseki
      ]
    })

    // シャンテン数の確認
    const kanShantenCheck = shantenBase(allPai, ankanCheckPaiInfo, yama, bakaze, ankanCheckPaiInfo.jikaze)
    // シャンテン数が変わらないならカンを実行する
    if (kanShantenCheck.shanten === allPai[turnUser].shantenInfo.shanten) {
      execAnkan(allPai, setAllPai, turnUser, ah, boardStatus, setBoardStatus, setExecUser)
      kanExec = true
    }
  })

  // カン実行後
  if (kanExec) {
    return
  }

  const minShantenList = minShantenPick(allPai, allPai[turnUser], yama, bakaze)
  // 牌のリストをコストで見るようにしてみる
  const shuffleShanteList = shuffle(minShantenList)

  // テンパイ即リーチする
  const suteType = tenpaiSokuReach(allPai[turnUser], boardStatus)

  execSuteru(allPai, setAllPai, turnUser, boardStatus, setBoardStatus, shuffleShanteList[0].key, yama, setYama, suteType, ownAuto, bakaze, setExecUser, gameMap, setGameMap)
}
