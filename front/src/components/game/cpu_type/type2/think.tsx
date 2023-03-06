import { getDora } from '../../../board/common/get_dora'
import type { AllPaiProp, GameMapProp, HaiInfoProp, PaiProp, SutehaiListWeightProp, UserProp } from '../../../board/type'
import { isAddMinkanabkeList } from '../../detection/is_add_minkanable_list'
import { isAnkanableList } from '../../detection/is_ankanable_list'
import { execAddMinkan } from '../../exec_add_minkan'
import { execAnkan } from '../../exec_ankan'
import { execSuteru } from '../../exec_suteru'
import { shantenBase } from '../../shanten_base'
import { minShantenPick } from '../common/min_shanten_pick'
import { shuffle } from '../common/shuffle'
import { tenpaiSokuReach } from '../common/tenpai_soku_reach'

export const think = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>, turnUser: UserProp, ownAuto: boolean, bakaze: number, gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>): void => {
  // アンカン判定
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

  // 追加ミンカン判定
  let addMinkanExec = false
  const addMinkanabkeList = isAddMinkanabkeList(allPai[turnUser])
  addMinkanabkeList.forEach((ah) => {
    // eslint-disable-next-line
    if (addMinkanExec === true) {
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

    const addminkanCheckPaiInfo: PaiProp = JSON.parse(JSON.stringify(allPai[turnUser]))
    let cutHaiExec = false
    addminkanCheckPaiInfo.base.forEach((b, bk) => {
      // eslint-disable-next-line
      if (b === ah && cutHaiExec === false) {
        addminkanCheckPaiInfo.base.splice(bk, 1)
        cutHaiExec = true
      }
    })

    // nakiHai情報にセットする
    addminkanCheckPaiInfo.naki.forEach((n) => {
      if (n.type === 'pon' && n.keyHai.haiInfo.hai === ah) {
        n.type = 'minkan'
        n.hai.push(kanhaiKaiseki)
      }
    })

    // シャンテン数の確認
    const kanShantenCheck = shantenBase(allPai, addminkanCheckPaiInfo, yama, bakaze, addminkanCheckPaiInfo.jikaze)
    // シャンテン数が変わらないならカンを実行する
    if (kanShantenCheck.shanten === allPai[turnUser].shantenInfo.shanten) {
      execAddMinkan(allPai, setAllPai, turnUser, ah, boardStatus, setBoardStatus, setExecUser)
      addMinkanExec = true
    }
  })

  // カン実行後
  if (addMinkanExec) {
    return
  }

  const minShantenList = minShantenPick(allPai, allPai[turnUser], yama, bakaze)
  // 捨て方にも気持ちレベルを設定したい
  let maxGroupWeight = 0
  const sutehaiListWeight: SutehaiListWeightProp[] = []
  minShantenList.forEach((s) => {
    let groupWeight = 0
    s.shantenInfo.mentsuGroup.forEach((m) => {
      let weight = 0
      // メンツはとても大事
      weight += m.mentsu.length * 200

      // 雀頭は一つはとても大事
      // それ以外の対子はまぁぼちぼち
      if (m.toitsu.length > 0) {
        weight += 200 + (m.toitsu.length - 1) * 50
      }

      // ターツは
      // 両面は結構大事
      // カンチャンよりペンチャンがいらない
      m.tatsu.forEach((t) => {
        if (t[0].num === t[0].num - 2) {
          weight += 60
        } else if (t[0].num === 1 || t[0].num === 8) {
          weight += 30
        } else {
          weight += 100
        }
      })

      // 孤立牌について
      // 優先度は3~7の数字牌＞2/8の数字牌＞1/9の数字牌＞役牌＞へかぜの牌とする
      // ドラは優先度を高く見る
      const doraText = getDora(yama[yama.length - 6])
      m.remainHaiCountInfo.forEach((r) => {
        if (r.count > 0) {
          if ((r.type === 1 || r.type === 2 || r.type === 3) && (r.num >= 3 && r.num <= 7)) {
            weight += 10
          }
          if ((r.type === 1 || r.type === 2 || r.type === 3) && (r.num === 2 || r.num === 8)) {
            weight += 8
          }
          if ((r.type === 1 || r.type === 2 || r.type === 3) && (r.num === 1 || r.num === 9)) {
            weight += 5
          }
          if (r.type === 4 && (r.num === 5 || r.num === 6 || r.num === 7 || r.num === bakaze || r.num === allPai[turnUser].jikaze)) {
            weight += 3
          }
        }

        if (r.hai === doraText) {
          weight += 13
        }
      })

      weight += (m.toitsu.length - 1) * 5

      if (groupWeight < weight) {
        groupWeight = weight
      }
    })
    sutehaiListWeight.push({
      key: s.key,
      weight: groupWeight
    })
    if (maxGroupWeight < groupWeight) {
      maxGroupWeight = groupWeight
    }
  })

  const filterSutehaiListWeight = sutehaiListWeight.filter((s) => {
    return s.weight === maxGroupWeight
  })

  // 牌のリストをコストで見るようにしてみる
  const shuffleShanteList = shuffle(filterSutehaiListWeight)

  // テンパイ即リーチする
  const suteType = tenpaiSokuReach(allPai[turnUser], boardStatus)

  execSuteru(allPai, setAllPai, turnUser, boardStatus, setBoardStatus, shuffleShanteList[0].key, yama, setYama, suteType, ownAuto, bakaze, setExecUser, gameMap, setGameMap)
  setExecUser(turnUser)
}
