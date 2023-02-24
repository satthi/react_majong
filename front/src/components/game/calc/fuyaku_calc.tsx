import type { HaiInfoProp, MachiTensuInfo, ShantenBaseInfo } from '../../board/type'
import { isMemzen } from '../detection/is_menzen'

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

  // ここから役計算
  const [tsumoHan, ronHan, tsumoYakuList, ronYakuList] = tensuCalc(shantenInfo, machiHai, bakaze, jikaze)

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
  if (isMemzen(shantenInfo.haiInfo)) {
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

const tensuCalc = (shantenInfo: ShantenBaseInfo, machiHai: HaiInfoProp, bakaze: number, jikaze: number): Array<number | string[]> => {
  let tsumoYaku = 0
  let ronYaku = 0
  const tsumoYakuList: string[] = []
  const ronYakuList: string[] = []

  // ダブルリーチ/リーチ
  if (doubleReachCheck(shantenInfo)) {
    tsumoYaku += 2
    ronYaku += 2
    tsumoYakuList.push('ダブル立直')
    ronYakuList.push('ダブル立直')
  } else if (reachCheck(shantenInfo)) {
    tsumoYaku += 1
    ronYaku += 1
    tsumoYakuList.push('立直')
    ronYakuList.push('立直')
  }

  // 一発
  if (ippatsuCheck(shantenInfo)) {
    tsumoYaku += 1
    ronYaku += 1
    tsumoYakuList.push('一発')
    ronYakuList.push('一発')
  }

  // ツモ
  if (tsumoCheck(shantenInfo)) {
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
  if (pinfuCheck(shantenInfo, machiHai, bakaze, jikaze)) {
    tsumoYaku += 1
    ronYaku += 1
    tsumoYakuList.push('平和')
    ronYakuList.push('平和')
  }

  // 一盃口
  if (ipekoCheck(shantenInfo, machiHai)) {
    tsumoYaku += 1
    ronYaku += 1
    tsumoYakuList.push('一盃口')
    ronYakuList.push('一盃口')
  }

  return [tsumoYaku, ronYaku, tsumoYakuList, ronYakuList]
}

// ダブルリーチチェック
const doubleReachCheck = (shantenInfo: ShantenBaseInfo): boolean => {
  return shantenInfo.haiInfo.isReach && shantenInfo.haiInfo.sutehai[0].type === 'reach'
}

// リーチチェック
const reachCheck = (shantenInfo: ShantenBaseInfo): boolean => {
  return shantenInfo.haiInfo.isReach
}

// 一発チェック
const ippatsuCheck = (shantenInfo: ShantenBaseInfo): boolean => {
  return shantenInfo.haiInfo.isReach && shantenInfo.haiInfo.sutehai[shantenInfo.haiInfo.sutehai.length - 1].type === 'reach'
}

// 面前ツモチェック
const tsumoCheck = (shantenInfo: ShantenBaseInfo): boolean => {
  return isMemzen(shantenInfo.haiInfo)
}

// 役牌チェック
const yakuhaiCheck = (shantenInfo: ShantenBaseInfo, machiHai: HaiInfoProp, bakaze: number, jikaze: number): number => {
  let yakuhaiCheck = 0
  shantenInfo.mentsu.forEach((m) => {
    if (m[0].type === 4 && (m[0].num === 5 || m[0].num === 6 || m[0].num === 7)) {
      yakuhaiCheck++
    }

    // 場風と自風をダブルでカウントできるように
    if (m[0].type === 4 && (m[0].num === bakaze)) {
      yakuhaiCheck++
    }

    if (m[0].type === 4 && (m[0].num === jikaze)) {
      yakuhaiCheck++
    }
  })

  if (shantenInfo.toitsu.length === 2) {
    shantenInfo.toitsu.forEach((t) => {
      if (t[0].hai === machiHai.hai) {
        if (t[0].type === 4 && (t[0].num === 5 || t[0].num === 6 || t[0].num === 7)) {
          yakuhaiCheck++
        }

        // 場風と自風をダブルでカウントできるように
        if (t[0].type === 4 && (t[0].num === bakaze)) {
          yakuhaiCheck++
        }

        if (t[0].type === 4 && (t[0].num === jikaze)) {
          yakuhaiCheck++
        }
      }
    })
  }

  return yakuhaiCheck
}

// タンヤオ
const tanyaoCheck = (shantenInfo: ShantenBaseInfo, machiHai: HaiInfoProp): boolean => {
  let tanyaoFlag = true
  shantenInfo.haiCountInfo.forEach((h) => {
    if (h.count > 0 && (h.type === 4 || h.num === 1 || h.num === 9)) {
      tanyaoFlag = false
    }
  })
  if (isYaochu(machiHai)) {
    tanyaoFlag = false
  }

  return tanyaoFlag
}

const pinfuCheck = (shantenInfo: ShantenBaseInfo, machiHai: HaiInfoProp, bakaze: number, jikaze: number): boolean => {
  // 面前/順子三つ/雀頭が役牌じゃない/ターツが両面
  if (
    !isMemzen(shantenInfo.haiInfo) ||
    shantenInfo.mentsu.length !== 3 ||
    shantenInfo.toitsu.length !== 1 ||
    shantenInfo.tatsu.length !== 1
  ) {
    return false
  }

  // メンツ
  let isPinfu = true
  shantenInfo.mentsu.forEach((m) => {
    // 暗刻はだめよ
    if (m[0].num === m[1].num) {
      isPinfu = false
    }
  })

  // 雀頭チェック
  if (isYakuhai(shantenInfo.toitsu[0][0], bakaze, jikaze)) {
    isPinfu = false
  }

  // ターツ
  // 横並びじゃない
  if (shantenInfo.tatsu[0][0].num !== shantenInfo.tatsu[0][1].num - 1) {
    isPinfu = false
  }

  // ペンチャンじゃない
  if (shantenInfo.tatsu[0][0].num === 1 || shantenInfo.tatsu[0][0].num === 8) {
    isPinfu = false
  }

  return isPinfu
}

const ipekoCheck = (shantenInfo: ShantenBaseInfo, machiHai: HaiInfoProp): boolean => {
  // 面前
  if (!isMemzen(shantenInfo.haiInfo)) {
    return false
  }

  // 同じ順子がいること
  let ipekoCheck = false
  shantenInfo.mentsu.forEach((m1, m1Key) => {
    shantenInfo.mentsu.forEach((m2, m2Key) => {
      if (
        m1Key !== m2Key &&
        m1[0].hai !== m1[1].hai && // 暗刻じゃない
        m1[0].hai === m2[0].hai && // 一盃口チェック
        m1[1].hai === m2[1].hai &&
        m1[2].hai === m2[2].hai
      ) {
        ipekoCheck = true
      }
    })
  })

  // ターツがいる場合、ターツの組み合わせと合うものであれば一盃口
  if (shantenInfo.tatsu.length > 0) {
    const tatsuCopy: HaiInfoProp[] = JSON.parse(JSON.stringify(shantenInfo.tatsu[0]))
    let kariMentsu = tatsuCopy.concat(machiHai)
    kariMentsu = kariMentsu.sort((a, b) => {
      return (a.hai > b.hai) ? 1 : -1
    })

    shantenInfo.mentsu.forEach((m3) => {
      if (
        kariMentsu[0].hai === m3[0].hai && // 一盃口チェック
        kariMentsu[1].hai === m3[1].hai &&
        kariMentsu[2].hai === m3[2].hai
      ) {
        ipekoCheck = true
      }
    })
  }

  return ipekoCheck
}
