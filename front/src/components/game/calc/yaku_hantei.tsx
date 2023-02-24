import type { HaiInfoProp, ShantenBaseInfo } from '../../board/type'
import { isMemzen } from '../detection/is_menzen'

// ダブルリーチチェック
export const doubleReachCheck = (shantenInfo: ShantenBaseInfo): boolean => {
  // eslint-disable-next-line
  return shantenInfo.haiInfo.isReach && shantenInfo.haiInfo.sutehai[0].type === 'reach'
}

// リーチチェック
export const reachCheck = (shantenInfo: ShantenBaseInfo): boolean => {
  // eslint-disable-next-line
  return shantenInfo.haiInfo.isReach
}

// 一発チェック
export const ippatsuCheck = (shantenInfo: ShantenBaseInfo): boolean => {
  return shantenInfo.haiInfo.isReach && shantenInfo.haiInfo.sutehai[shantenInfo.haiInfo.sutehai.length - 1].type === 'reach'
}

// 面前ツモチェック
export const tsumoCheck = (shantenInfo: ShantenBaseInfo): boolean => {
  return isMemzen(shantenInfo.haiInfo)
}

// 役牌チェック
export const yakuhaiCheck = (shantenInfo: ShantenBaseInfo, machiHai: HaiInfoProp, bakaze: number, jikaze: number): number => {
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
export const tanyaoCheck = (shantenInfo: ShantenBaseInfo, machiHai: HaiInfoProp): boolean => {
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

export const pinfuCheck = (shantenInfo: ShantenBaseInfo, machiHai: HaiInfoProp, bakaze: number, jikaze: number): boolean => {
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

export const ipekoCheck = (shantenInfo: ShantenBaseInfo, machiHai: HaiInfoProp): boolean => {
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

// 一九字牌の判定
const isYaochu = (hai: HaiInfoProp): boolean => {
  return hai.type === 4 || hai.num === 1 || hai.num === 9
}

const isYakuhai = (hai: HaiInfoProp, bakaze: number, jikaze: number): boolean => {
  // 役牌は場風/自風/白發中
  return hai.type === 4 && (hai.num === bakaze || hai.num === jikaze || hai.num === 5 || hai.num === 6 || hai.num === 7)
}
