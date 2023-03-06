import type { AllPaiProp, HaiInfoProp, PaiProp, UserProp } from '../../../board/type'
import { isMemzen } from '../../detection/is_menzen'
import { shantenBase } from '../../shanten_base'

export const naki = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, checkUser: UserProp, yama: string[], suteruHaiKaiseki: HaiInfoProp, bakaze: number): void => {
  // ロンは無条件で実行する
  if (allPai[checkUser].nakiCheck.ron) {
    allPai[checkUser].nakiCheck.pon = false
    allPai[checkUser].nakiCheck.ti1 = false
    allPai[checkUser].nakiCheck.ti2 = false
    allPai[checkUser].nakiCheck.ti3 = false
    allPai[checkUser].nakiCheck.kan = false
  } else {
    // CPUにはミンカンはさせない/ミンカン可能な手ではポンも必要なし
    if (allPai[checkUser].nakiCheck.kan) {
      allPai[checkUser].nakiCheck.kan = false
      allPai[checkUser].nakiCheck.pon = false
    }
    // ポン
    let ponExec = false
    if (allPai[checkUser].nakiCheck.pon) {
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

      const nakiShantenCheck = shantenBase(allPai, paiInfoCopy, yama, bakaze, paiInfoCopy.jikaze)
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
    }

    // チー1
    let ti1Exec = false
    // eslint-disable-next-line
    if (allPai[checkUser].nakiCheck.ti1) {
      // 鳴いた仮定の形の作成
      const paiInfoCopy: PaiProp = JSON.parse(JSON.stringify(allPai[checkUser]))

      const constTi1Hai = {
        hai: 'hai_' + String(suteruHaiKaiseki.type) + '_' + String(suteruHaiKaiseki.num - 2),
        type: suteruHaiKaiseki.type,
        num: suteruHaiKaiseki.num - 2
      }
      const constTi2Hai = {
        hai: 'hai_' + String(suteruHaiKaiseki.type) + '_' + String(suteruHaiKaiseki.num - 1),
        type: suteruHaiKaiseki.type,
        num: suteruHaiKaiseki.num - 1
      }

      // keyがずれる関係で一気に実行せずに2回実行する
      let cutHaiExec = false
      paiInfoCopy.base.forEach((b, bk) => {
        // eslint-disable-next-line
        if (b === constTi1Hai.hai && cutHaiExec === false) {
          paiInfoCopy.base.splice(bk, 1)
          cutHaiExec = true
        }
      })
      cutHaiExec = false
      paiInfoCopy.base.forEach((b, bk) => {
        // eslint-disable-next-line
        if (b === constTi2Hai.hai && cutHaiExec === false) {
          paiInfoCopy.base.splice(bk, 1)
          cutHaiExec = true
        }
      })

      // nakiHai情報にセットする
      paiInfoCopy.naki.push({
        type: 'ti',
        keyHai: {
          haiInfo: suteruHaiKaiseki,
          position: 'left' // 向きは判定には関係ないので適当に
        },
        hai: [
          constTi1Hai,
          constTi2Hai
        ]
      })

      const nakiShantenCheck = shantenBase(allPai, paiInfoCopy, yama, bakaze, paiInfoCopy.jikaze)
      // まず前提としてシャンテン数が下がらないなら実行しない
      if (allPai[checkUser].shantenInfo.shanten > nakiShantenCheck.shanten) {
        // まだ面前の場合実行しない
        if (!isMemzen(allPai[checkUser])) {
          ti1Exec = true
        }
      }
    }

    // チー2
    let ti2Exec = false
    // eslint-disable-next-line
    if (allPai[checkUser].nakiCheck.ti2) {
      // 鳴いた仮定の形の作成
      const paiInfoCopy: PaiProp = JSON.parse(JSON.stringify(allPai[checkUser]))

      const constTi1Hai = {
        hai: 'hai_' + String(suteruHaiKaiseki.type) + '_' + String(suteruHaiKaiseki.num - 1),
        type: suteruHaiKaiseki.type,
        num: suteruHaiKaiseki.num - 2
      }
      const constTi2Hai = {
        hai: 'hai_' + String(suteruHaiKaiseki.type) + '_' + String(suteruHaiKaiseki.num + 1),
        type: suteruHaiKaiseki.type,
        num: suteruHaiKaiseki.num - 1
      }

      // keyがずれる関係で一気に実行せずに2回実行する
      let cutHaiExec = false
      paiInfoCopy.base.forEach((b, bk) => {
        // eslint-disable-next-line
        if (b === constTi1Hai.hai && cutHaiExec === false) {
          paiInfoCopy.base.splice(bk, 1)
          cutHaiExec = true
        }
      })
      cutHaiExec = false
      paiInfoCopy.base.forEach((b, bk) => {
        // eslint-disable-next-line
        if (b === constTi2Hai.hai && cutHaiExec === false) {
          paiInfoCopy.base.splice(bk, 1)
          cutHaiExec = true
        }
      })

      // nakiHai情報にセットする
      paiInfoCopy.naki.push({
        type: 'ti',
        keyHai: {
          haiInfo: suteruHaiKaiseki,
          position: 'left' // 向きは判定には関係ないので適当に
        },
        hai: [
          constTi1Hai,
          constTi2Hai
        ]
      })

      const nakiShantenCheck = shantenBase(allPai, paiInfoCopy, yama, bakaze, paiInfoCopy.jikaze)
      // まず前提としてシャンテン数が下がらないなら実行しない
      if (allPai[checkUser].shantenInfo.shanten > nakiShantenCheck.shanten) {
        // まだ面前の場合実行しない
        if (!isMemzen(allPai[checkUser])) {
          ti2Exec = true
        }
      }
    }

    // チー3
    let ti3Exec = false
    // eslint-disable-next-line
    if (allPai[checkUser].nakiCheck.ti3) {
      // 鳴いた仮定の形の作成
      const paiInfoCopy: PaiProp = JSON.parse(JSON.stringify(allPai[checkUser]))

      const constTi1Hai = {
        hai: 'hai_' + String(suteruHaiKaiseki.type) + '_' + String(suteruHaiKaiseki.num + 1),
        type: suteruHaiKaiseki.type,
        num: suteruHaiKaiseki.num - 2
      }
      const constTi2Hai = {
        hai: 'hai_' + String(suteruHaiKaiseki.type) + '_' + String(suteruHaiKaiseki.num + 2),
        type: suteruHaiKaiseki.type,
        num: suteruHaiKaiseki.num - 1
      }

      // keyがずれる関係で一気に実行せずに2回実行する
      let cutHaiExec = false
      paiInfoCopy.base.forEach((b, bk) => {
        // eslint-disable-next-line
        if (b === constTi1Hai.hai && cutHaiExec === false) {
          paiInfoCopy.base.splice(bk, 1)
          cutHaiExec = true
        }
      })
      cutHaiExec = false
      paiInfoCopy.base.forEach((b, bk) => {
        // eslint-disable-next-line
        if (b === constTi2Hai.hai && cutHaiExec === false) {
          paiInfoCopy.base.splice(bk, 1)
          cutHaiExec = true
        }
      })

      // nakiHai情報にセットする
      paiInfoCopy.naki.push({
        type: 'ti',
        keyHai: {
          haiInfo: suteruHaiKaiseki,
          position: 'left' // 向きは判定には関係ないので適当に
        },
        hai: [
          constTi1Hai,
          constTi2Hai
        ]
      })

      const nakiShantenCheck = shantenBase(allPai, paiInfoCopy, yama, bakaze, paiInfoCopy.jikaze)
      // まず前提としてシャンテン数が下がらないなら実行しない
      if (allPai[checkUser].shantenInfo.shanten > nakiShantenCheck.shanten) {
        // まだ面前の場合実行しない
        if (!isMemzen(allPai[checkUser])) {
          ti3Exec = true
        }
      }
    }

    // 優先度はチー2/チー1/チー3/ポン とする
    if (ti2Exec) {
      allPai[checkUser].nakiCheck.ron = false
      allPai[checkUser].nakiCheck.pon = false
      allPai[checkUser].nakiCheck.ti1 = false
      allPai[checkUser].nakiCheck.ti2 = true
      allPai[checkUser].nakiCheck.ti3 = false
      allPai[checkUser].nakiCheck.kan = false
    } else if (ti1Exec) {
      allPai[checkUser].nakiCheck.ron = false
      allPai[checkUser].nakiCheck.pon = false
      allPai[checkUser].nakiCheck.ti1 = true
      allPai[checkUser].nakiCheck.ti2 = false
      allPai[checkUser].nakiCheck.ti3 = false
      allPai[checkUser].nakiCheck.kan = false
    } else if (ti3Exec) {
      allPai[checkUser].nakiCheck.ron = false
      allPai[checkUser].nakiCheck.pon = false
      allPai[checkUser].nakiCheck.ti1 = false
      allPai[checkUser].nakiCheck.ti2 = false
      allPai[checkUser].nakiCheck.ti3 = true
      allPai[checkUser].nakiCheck.kan = false
    } else if (ponExec) {
      allPai[checkUser].nakiCheck.ron = false
      allPai[checkUser].nakiCheck.pon = true
      allPai[checkUser].nakiCheck.ti1 = false
      allPai[checkUser].nakiCheck.ti2 = false
      allPai[checkUser].nakiCheck.ti3 = false
      allPai[checkUser].nakiCheck.kan = false
    } else {
      allPai[checkUser].nakiCheck.ron = false
      allPai[checkUser].nakiCheck.pon = false
      allPai[checkUser].nakiCheck.ti1 = false
      allPai[checkUser].nakiCheck.ti2 = false
      allPai[checkUser].nakiCheck.ti3 = false
      allPai[checkUser].nakiCheck.kan = false
    }

    setAllPai(allPai)
  }
}
