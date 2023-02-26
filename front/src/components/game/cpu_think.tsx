import { getDora } from '../board'
import { setTsumo } from '../board/common/set_tsumo'
import type { AllPaiProp, HaiInfoProp, PaiProp, ShantenListProp, SutehaiListWeightProp, SuteType, UserProp } from '../board/type'
import { isMemzen } from './detection/is_menzen'
import { isReachable } from './detection/is_reachable'
import { execSuteru } from './exec_suteru'
import { shantenBase } from './shanten_base'

export const cpuThink = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, turnUser: UserProp, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean, bakaze: number): void => {
  // 上がり
  if (allPai[turnUser].shantenInfo.shanten === -1) {
    setTsumo(allPai, turnUser, setBoardStatus)
    return
  }

  // @todo: ここのロジックを色々頑張りたいところ
  // リーチ状態では考えることはなくツモ切り
  // eslint-disable-next-line
  if (allPai[turnUser].isReach) {
    execSuteru(allPai, setAllPai, turnUser, boardStatus, setBoardStatus, allPai[turnUser].base.length - 1, yama, setYama, 'normal', ownAuto, bakaze, setExecUser)
  } else {
    // cpuThink1(allPai, setAllPai, yama, setYama, boardStatus, setBoardStatus, setExecUser, turnUser, ownAuto, bakaze)
    cpuThink2(allPai, setAllPai, yama, setYama, boardStatus, setBoardStatus, setExecUser, turnUser, ownAuto, bakaze)
  }

  setExecUser(turnUser)
}

// eslint-disable-next-line
const cpuThink1 = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>, turnUser: UserProp, ownAuto: boolean, bakaze: number): void => {
  const minShantenList = minShantenPick(allPai[turnUser], yama, bakaze)
  // 牌のリストをコストで見るようにしてみる
  const shuffleShanteList = shuffle(minShantenList)

  // テンパイ即リーチする
  const suteType = tenpaiSokuReach(allPai[turnUser], boardStatus)

  execSuteru(allPai, setAllPai, turnUser, boardStatus, setBoardStatus, shuffleShanteList[0].key, yama, setYama, suteType, ownAuto, bakaze, setExecUser)
}

const cpuThink2 = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>, turnUser: UserProp, ownAuto: boolean, bakaze: number): void => {
  const minShantenList = minShantenPick(allPai[turnUser], yama, bakaze)
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

  execSuteru(allPai, setAllPai, turnUser, boardStatus, setBoardStatus, shuffleShanteList[0].key, yama, setYama, suteType, ownAuto, bakaze, setExecUser)
}

export const cpuNakiThink = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, checkUser: UserProp, yama: string[], suteruHaiKaiseki: HaiInfoProp, ownAuto: boolean, bakaze: number): void => {
  // 自身で操作中の場合は何もしない
  if (checkUser === 'own' && ownAuto) {
    return
  }

  // ロンは無条件で実行する
  // @todo: ロンを行わない条件を入れる？？？本格的には？
  if (allPai[checkUser].nakiCheck.ron) {
    allPai[checkUser].nakiCheck.pon = false
    allPai[checkUser].nakiCheck.ti = false
    allPai[checkUser].nakiCheck.kan = false
  } else {
    // @todo: ポンとチーは同時の判定が必要か
    if (allPai[checkUser].nakiCheck.pon) {
      let ponExec = false
      // 鳴いた仮定の形の作成
      const paiInfoCopy: PaiProp = JSON.parse(JSON.stringify(allPai[checkUser]))

      // keyがずれる関係で一気に実行せずに2回実行する
      let cutHaiExec = false
      paiInfoCopy.base.forEach((b, bk) => {
        // eslint-disable-next-line
        if (b === suteruHaiKaiseki.hai && cutHaiExec === false) {
          paiInfoCopy.base.splice(bk, 1)
          cutHaiExec = true
        }
      })
      cutHaiExec = false
      paiInfoCopy.base.forEach((b, bk) => {
        // eslint-disable-next-line
        if (b === suteruHaiKaiseki.hai && cutHaiExec === false) {
          paiInfoCopy.base.splice(bk, 1)
          cutHaiExec = true
        }
      })

      // nakiHai情報にセットする
      paiInfoCopy.naki.push({
        type: 'pon',
        keyHai: {
          haiInfo: suteruHaiKaiseki,
          position: 'left' // 向きは判定には関係ないので適当に
        },
        hai: [
          suteruHaiKaiseki,
          suteruHaiKaiseki
        ]
      })

      const nakiShantenCheck = shantenBase(paiInfoCopy, yama, bakaze, paiInfoCopy.jikaze)
      // まず前提としてシャンテン数が下がらないなら実行しない
      if (allPai[checkUser].shantenInfo.shanten > nakiShantenCheck.shanten) {
        // まだ面前の場合
        // ポンは役牌であれば、シャンテン数が下がるなら実行する
        // 役牌でない場合は実行しない
        if (isMemzen(allPai[checkUser])) {
          if (suteruHaiKaiseki.type === 4 && (
            suteruHaiKaiseki.num === 5 ||
            suteruHaiKaiseki.num === 6 ||
            suteruHaiKaiseki.num === 7 ||
            suteruHaiKaiseki.num === bakaze ||
            suteruHaiKaiseki.num === allPai[checkUser].jikaze
          )) {
            ponExec = true
          }
        } else {
          ponExec = true
        }
      }

      allPai[checkUser].nakiCheck.pon = ponExec
    }

    setAllPai(allPai)
  }
}

// これ処理が重いので見直し
const minShantenPick = (hai: PaiProp, yama: string[], bakaze: number): ShantenListProp[] => {
  // とりあえずシャンテン数が減る方向に切ってみる
  const shantenList: ShantenListProp[] = []
  let minShanten = 99
  hai.base.forEach((_c: string, k: number) => {
    const paiInfoCopy: PaiProp = JSON.parse(JSON.stringify(hai))
    // 1個ずつずらしてみる
    paiInfoCopy.base.splice(k, 1)

    const shantenInfo = shantenBase(paiInfoCopy, yama, bakaze, hai.jikaze)
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
