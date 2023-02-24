import type { HaiInfoProp, MachiTensuInfo, PaiProp, ShantenBaseInfo } from '../../board/type'
import { isMemzen } from '../detection/is_menzen'
import { doubleReachCheck, haiteiCheck, ipekoCheck, ippatsuCheck, pinfuCheck, reachCheck, sanshokuDoujunCheck, sanshokuDoukokuCheck, tanyaoCheck, tsumoCheck, yakuhaiCheck } from './yaku_hantei'

export const fuyakuCalc = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp, yama: string[], bakaze: number, jikaze: number): MachiTensuInfo => {
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
  const [ronFu, tsumoFu] = fuCalc(shantenInfo, paiInfo, machiHai, bakaze, jikaze)

  // ここから役計算
  const [tsumoHan, ronHan, tsumoYakuList, ronYakuList] = tensuCalc(shantenInfo, paiInfo, machiHai, yama, bakaze, jikaze)

  return {
    ron: {
      fu: ronFu,
      han: ronHan as number,
      yakuman: 0,
      yakuList: ronYakuList as string[]
    },
    tsumo: {
      fu: tsumoFu,
      han: tsumoHan as number,
      yakuman: 0,
      yakuList: tsumoYakuList as string[]
    }
  }
}

const fuCalc = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp, bakaze: number, jikaze: number): number[] => {
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

  if (shantenInfo.toitsu.length === 1) {
    // カンチャン/ペンチャン
    if (
      shantenInfo.tatsu[0][0].num === shantenInfo.tatsu[0][1].num - 2 ||
      shantenInfo.tatsu[0][0].num === 1 ||
      shantenInfo.tatsu[0][0].num === 8
    ) {
      ronFu += 2
      tsumoFu += 2
    }

    // 雀頭
    if (isYakuhai(shantenInfo.toitsu[0][0], bakaze, jikaze)) {
      ronFu += 2
      tsumoFu += 2
    }
  }

  // この判定最後のほうにしよう
  if (isMemzen(paiInfo)) {
    ronFu += 10
    // 20符=ピンフ系
    if (tsumoFu !== 20) {
      tsumoFu += 2 // ピンフを除く件については後で調整
    }
  }

  // 符を最後切り上げ
  ronFu = Math.ceil(ronFu / 10) * 10
  tsumoFu = Math.ceil(tsumoFu / 10) * 10

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

const tensuCalc = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp, yama: string[], bakaze: number, jikaze: number): Array<number | string[]> => {
  let tsumoYaku = 0
  let ronYaku = 0
  const tsumoYakuList: string[] = []
  const ronYakuList: string[] = []

  // ダブルリーチ/リーチ
  if (doubleReachCheck(paiInfo)) {
    tsumoYaku += 2
    ronYaku += 2
    tsumoYakuList.push('ダブル立直')
    ronYakuList.push('ダブル立直')
  } else if (reachCheck(paiInfo)) {
    tsumoYaku += 1
    ronYaku += 1
    tsumoYakuList.push('立直')
    ronYakuList.push('立直')
  }

  // 一発
  if (ippatsuCheck(paiInfo)) {
    tsumoYaku += 1
    ronYaku += 1
    tsumoYakuList.push('一発')
    ronYakuList.push('一発')
  }

  // ツモ
  if (tsumoCheck(paiInfo)) {
    tsumoYaku += 1
    tsumoYakuList.push('門前自摸')
  }

  // 役牌
  const yakuhaiCount = yakuhaiCheck(shantenInfo, machiHai, bakaze, jikaze)
  if (yakuhaiCount > 0) {
    tsumoYaku += yakuhaiCount
    ronYaku += yakuhaiCount
    tsumoYakuList.push('役牌 '.concat(String(yakuhaiCount)))
    ronYakuList.push('役牌 '.concat(String(yakuhaiCount)))
  }

  // タンヤオ
  if (tanyaoCheck(shantenInfo, machiHai)) {
    tsumoYaku += 1
    ronYaku += 1
    tsumoYakuList.push('断么九')
    ronYakuList.push('断么九')
  }

  // ピンフ
  if (pinfuCheck(shantenInfo, paiInfo, bakaze, jikaze)) {
    tsumoYaku += 1
    ronYaku += 1
    tsumoYakuList.push('平和')
    ronYakuList.push('平和')
  }

  // 一盃口
  if (ipekoCheck(shantenInfo, paiInfo, machiHai)) {
    tsumoYaku += 1
    ronYaku += 1
    tsumoYakuList.push('一盃口')
    ronYakuList.push('一盃口')
  }

  // 海底撈月/河底撈魚
  if (haiteiCheck(yama)) {
    tsumoYaku += 1
    ronYaku += 1
    tsumoYakuList.push('海底撈月')
    ronYakuList.push('河底撈魚')
  }

  // @todo: 嶺上開花/槍槓 は後

  // 三色同順
  if (sanshokuDoujunCheck(shantenInfo, machiHai)) {
    // 食い下がりあり
    if (isMemzen(paiInfo)) {
      tsumoYaku += 2
      ronYaku += 2
    } else {
      tsumoYaku += 1
      ronYaku += 1
    }
    tsumoYakuList.push('三色同順')
    ronYakuList.push('三色同順')
  }

  // 三色同刻
  if (sanshokuDoukokuCheck(shantenInfo, machiHai)) {
    tsumoYaku += 2
    ronYaku += 2
    tsumoYakuList.push('三色同刻')
    ronYakuList.push('三色同刻')
  }

  return [tsumoYaku, ronYaku, tsumoYakuList, ronYakuList]
}
