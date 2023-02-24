import type { HaiInfoProp, MachiTensuInfo, ShantenBaseInfo } from '../board/type'
import { isMemzen } from './detection/is_menzen'

export const fuyakuCalc = (shantenInfo: ShantenBaseInfo, machiHai: HaiInfoProp, bakaze: number, jikaze: number): MachiTensuInfo => {
  console.log(shantenInfo)
  console.log(machiHai)
  // テンパイ以外は計算しない
  if (shantenInfo.shanten !== 0) {
    return {
      ron: {
        fu: 0,
        han: 0,
        yakuman: 0,
        yakuList: []
      },
      tsumo: {
        fu: 0,
        han: 0,
        yakuman: 0,
        yakuList: []
      }
    }
  }

  // @todo: 役満判定
  // @todo: 七対子判定

  // それ以外 府計算
  const [ronFu, tsumoFu] = fuCalc(shantenInfo, machiHai, bakaze, jikaze)

  return {
    ron: {
      fu: ronFu,
      han: 0,
      yakuman: 0,
      yakuList: []
    },
    tsumo: {
      fu: tsumoFu,
      han: 0,
      yakuman: 0,
      yakuList: []
    }
  }
}

const fuCalc = (shantenInfo: ShantenBaseInfo, machiHai: HaiInfoProp, bakaze: number, jikaze: number): number[] => {
  let ronFu = 20
  let tsumoFu = 20

  // メンツの判定
  shantenInfo.mentsu.forEach((m) => {
    // 暗刻のときのみ判定 順子はカウントなし
    if (m[0].hai === m[1].hai && m[0].hai === m[2].hai) {
      if (isYaochu(m[0])) {
        ronFu += 8
        tsumoFu += 8
      } else {
        ronFu += 4
        tsumoFu += 4
      }
    }
  })

  // @todo: 鳴き判定

  // 待ちの判定/雀頭の判定
  if (shantenInfo.toitsu.length === 2) {
    // シャボ待ち
    shantenInfo.toitsu.forEach((t) => {
      // ツモ＝暗刻扱い
      // ロン＝ポン扱い
      if (t[0].hai === machiHai.hai) {
        if (isYaochu(t[0])) {
          ronFu += 4
          tsumoFu += 8
        } else {
          ronFu += 2
          tsumoFu += 4
        }
      } else {
        // 雀頭
        if (isYakuhai(t[0], bakaze, jikaze)) {
          ronFu += 2
          tsumoFu += 2
        }
      }
    })
  }

  // 符を最後切り上げ(七対子以外)
  // ronFu = Math.ceil(ronFu / 10) * 10
  // tsumoFu = Math.ceil(tsumoFu / 10) * 10
  // この判定最後のほうにしよう
  if (isMemzen(shantenInfo.haiInfo)) {
    ronFu += 10
    tsumoFu += 2 // ピンフを除く件については後で調整
  }

  return [ronFu, tsumoFu]
}

// 一九字牌の判定
const isYaochu = (hai: HaiInfoProp): boolean => {
  return hai.type === 4 || hai.num === 1 || hai.num === 9
}

const isYakuhai = (hai: HaiInfoProp, bakaze: number, jikaze: number): boolean => {
  // 役牌は場風/自風/白發中
  return hai.type === 4 && (hai.num === bakaze || hai.num === jikaze || hai.num === 5 || hai.num === 6 || hai.num === 7)
}
