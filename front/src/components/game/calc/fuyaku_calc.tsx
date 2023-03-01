import type { HaiInfoProp, MachiTensuInfo, PaiProp, ShantenBaseInfo } from '../../board/type'
import { isMemzen } from '../detection/is_menzen'
import { chantaCheck, chinitsuCheck, chitoitsuCheck, daisangenCheck, doubleReachCheck, haiteiCheck, honitsuCheck, honrotoCheck, ikkitsukanCheck, ipekoCheck, ippatsuCheck, junchantaCheck, kokushimusou13Check, kokushimusouCheck, pinfuCheck, reachCheck, rinshanKaihoCheck, ryanpekoCheck, ryuisoCheck, sanankoCheck, sanshokuDoujunCheck, sanshokuDoukokuCheck, shosangenCheck, suankoCheck, suankoTankiCheck, tanyaoCheck, toitoihoCheck, tsumoCheck, yakuhaiCheck } from './yaku_hantei'

export const fuyakuCalc = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp, yama: string[], bakaze: number, jikaze: number): MachiTensuInfo => {
  // テンパイ以外は計算しない
  if (shantenInfo.shanten !== 0) {
    return {
      ron: {
        fu: 0,
        han: 0,
        yakuman: 0,
        yakuList: [],
        yakumanYakuList: []
      },
      tsumo: {
        fu: 0,
        han: 0,
        yakuman: 0,
        yakuList: [],
        yakumanYakuList: []
      }
    }
  }

  // それ以外 府計算
  const [ronFu, tsumoFu] = fuCalc(shantenInfo, paiInfo, machiHai, bakaze, jikaze)

  // ここから役計算
  const [tsumoHan, ronHan, tsumoYakuman, ronYakuman, tsumoYakuList, ronYakuList, tsumoYakumanYakuList, ronYakumanYakuList] = tensuCalc(shantenInfo, paiInfo, machiHai, yama, bakaze, jikaze)

  return {
    ron: {
      fu: ronFu,
      han: ronHan as number,
      yakuman: ronYakuman as number,
      yakuList: ronYakuList as string[],
      yakumanYakuList: ronYakumanYakuList as string[]
    },
    tsumo: {
      fu: tsumoFu,
      han: tsumoHan as number,
      yakuman: tsumoYakuman as number,
      yakuList: tsumoYakuList as string[],
      yakumanYakuList: tsumoYakumanYakuList as string[]
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

  // 七対子固有の判定
  if (shantenInfo.toitsu.length === 6) {
    ronFu = 25
    tsumoFu = 25
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

const tensuCalc = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp, yama: string[], bakaze: number, jikaze: number): Array<number | string[]> => {
  let tsumoYaku = 0
  let ronYaku = 0
  let tsumoYakuman = 0
  let ronYakuman = 0
  const tsumoYakuList: string[] = []
  const ronYakuList: string[] = []
  const tsumoYakumanYakuList: string[] = []
  const ronYakumanYakuList: string[] = []

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
  const yakuhaiCount = yakuhaiCheck(shantenInfo, paiInfo, machiHai, bakaze, jikaze)
  if (yakuhaiCount > 0) {
    tsumoYaku += yakuhaiCount
    ronYaku += yakuhaiCount
    tsumoYakuList.push('役牌 '.concat(String(yakuhaiCount)))
    ronYakuList.push('役牌 '.concat(String(yakuhaiCount)))
  }

  // タンヤオ
  if (tanyaoCheck(shantenInfo, paiInfo, machiHai)) {
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

  // 二盃口
  if (ryanpekoCheck(shantenInfo, paiInfo, machiHai)) {
    tsumoYaku += 3
    ronYaku += 3
    tsumoYakuList.push('二盃口')
    ronYakuList.push('二盃口')
  } else if (ipekoCheck(shantenInfo, paiInfo, machiHai)) {
    // 一盃口
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

  // 嶺上開花
  if (rinshanKaihoCheck(paiInfo)) {
    tsumoYaku += 1
    tsumoYakuList.push('嶺上開花')
  }
  // @todo: 嶺上開花/槍槓 は後

  // 三色同順
  if (sanshokuDoujunCheck(shantenInfo, paiInfo, machiHai)) {
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
  if (sanshokuDoukokuCheck(shantenInfo, paiInfo, machiHai)) {
    tsumoYaku += 2
    ronYaku += 2
    tsumoYakuList.push('三色同刻')
    ronYakuList.push('三色同刻')
  }

  // 三暗刻(ツモとロンを別ロジックにする)
  if (sanankoCheck(shantenInfo, paiInfo, true)) {
    tsumoYaku += 2
    tsumoYakuList.push('三暗刻')
  }

  if (sanankoCheck(shantenInfo, paiInfo, false)) {
    ronYaku += 2
    ronYakuList.push('三暗刻')
  }

  // 一気通貫
  if (ikkitsukanCheck(shantenInfo, paiInfo, machiHai)) {
    // 食い下がりあり
    if (isMemzen(paiInfo)) {
      tsumoYaku += 2
      ronYaku += 2
    } else {
      tsumoYaku += 1
      ronYaku += 1
    }
    tsumoYakuList.push('一気通貫')
    ronYakuList.push('一気通貫')
  }

  // 七対子
  if (chitoitsuCheck(shantenInfo)) {
    tsumoYaku += 2
    ronYaku += 2
    tsumoYakuList.push('七対子')
    ronYakuList.push('七対子')
  }

  // 対々和
  if (toitoihoCheck(shantenInfo)) {
    tsumoYaku += 2
    ronYaku += 2
    tsumoYakuList.push('対々和')
    ronYakuList.push('対々和')
  }

  // 純全帯公九
  // eslint-disable-next-line
  if (junchantaCheck(shantenInfo, paiInfo, machiHai)) {
    // 食い下がりあり
    if (isMemzen(paiInfo)) {
      tsumoYaku += 3
      ronYaku += 3
    } else {
      tsumoYaku += 2
      ronYaku += 2
    }
    tsumoYakuList.push('純全帯公九')
    ronYakuList.push('純全帯公九')
  } else if (honrotoCheck(shantenInfo, paiInfo, machiHai)) {
    // 混老頭
    tsumoYaku += 2
    ronYaku += 2
    tsumoYakuList.push('混老頭')
    ronYakuList.push('混老頭')
  } else if (chantaCheck(shantenInfo, paiInfo, machiHai)) {
    // 混全帯幺九
    // 食い下がりあり
    if (isMemzen(paiInfo)) {
      tsumoYaku += 2
      ronYaku += 2
    } else {
      tsumoYaku += 1
      ronYaku += 1
    }
    tsumoYakuList.push('混全帯幺九')
    ronYakuList.push('混全帯幺九')
  }

  // 清一色
  if (chinitsuCheck(shantenInfo, paiInfo)) {
    if (isMemzen(paiInfo)) {
      tsumoYaku += 6
      ronYaku += 6
    } else {
      tsumoYaku += 5
      ronYaku += 5
    }
    tsumoYakuList.push('清一色')
    ronYakuList.push('清一色')
  } else if (honitsuCheck(shantenInfo, paiInfo)) {
    // 混一色
    if (isMemzen(paiInfo)) {
      tsumoYaku += 3
      ronYaku += 3
    } else {
      tsumoYaku += 2
      ronYaku += 2
    }
    tsumoYakuList.push('混一色')
    ronYakuList.push('混一色')
  }

  // @todo: 三槓子

  // 小三元
  if (shosangenCheck(shantenInfo, paiInfo)) {
    tsumoYaku += 2
    ronYaku += 2
    tsumoYakuList.push('小三元')
    ronYakuList.push('小三元')
  }

  // ここから役満
  // 四暗刻
  // eslint-disable-next-line
  if (suankoCheck(shantenInfo, paiInfo)) {
    tsumoYakuman += 1
    tsumoYakumanYakuList.push('四暗刻')
  }

  // eslint-disable-next-line
  if (suankoTankiCheck(shantenInfo, paiInfo)) {
    tsumoYakuman += 2
    ronYakuman += 2
    tsumoYakumanYakuList.push('四暗刻単騎')
    ronYakumanYakuList.push('四暗刻単騎')
  }

  // 国士無双
  // eslint-disable-next-line
  if (kokushimusouCheck(shantenInfo)) {
    tsumoYakuman += 1
    ronYakuman += 1
    tsumoYakumanYakuList.push('国士無双')
    ronYakumanYakuList.push('国士無双')
  }

  // 国士無双13面待ち
  // eslint-disable-next-line
  if (kokushimusou13Check(shantenInfo)) {
    tsumoYakuman += 2
    ronYakuman += 2
    tsumoYakumanYakuList.push('国士無双13面待ち')
    ronYakumanYakuList.push('国士無双13面待ち')
  }

  // 大三元
  // eslint-disable-next-line
  if (daisangenCheck(shantenInfo, paiInfo, machiHai)) {
    tsumoYakuman += 1
    ronYakuman += 1
    tsumoYakumanYakuList.push('大三元')
    ronYakumanYakuList.push('大三元')
  }

  // 緑一色
  // eslint-disable-next-line
  if (ryuisoCheck(shantenInfo, paiInfo, machiHai)) {
    tsumoYakuman += 1
    ronYakuman += 1
    tsumoYakumanYakuList.push('緑一色')
    ronYakumanYakuList.push('緑一色')
  }

  return [tsumoYaku, ronYaku, tsumoYakuman, ronYakuman, tsumoYakuList, ronYakuList, tsumoYakumanYakuList, ronYakumanYakuList]
}
