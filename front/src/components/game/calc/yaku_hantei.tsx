import type { ColorFlagProp, ColorTypeProp, HaiInfoProp, IkkiTsukanFlagProp, IkkiTsukanTypeProp, PaiProp, SangenhaiFlagProp, SangenhaiTypeProp, ShantenBaseInfo } from '../../board/type'
import { isMemzen } from '../detection/is_menzen'

// ダブルリーチチェック
export const doubleReachCheck = (paiInfo: PaiProp): boolean => {
  // eslint-disable-next-line
  return paiInfo.isReach && paiInfo.sutehai[0].type === 'reach'
}

// リーチチェック
export const reachCheck = (paiInfo: PaiProp): boolean => {
  // eslint-disable-next-line
  return paiInfo.isReach
}

// 一発チェック
export const ippatsuCheck = (paiInfo: PaiProp): boolean => {
  return paiInfo.isReach && paiInfo.sutehai[paiInfo.sutehai.length - 1].type === 'reach'
}

// 面前ツモチェック
export const tsumoCheck = (paiInfo: PaiProp): boolean => {
  return isMemzen(paiInfo)
}

// 役牌チェック
export const yakuhaiCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp, bakaze: number, jikaze: number): number => {
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

  // 鳴きの中身も見る
  paiInfo.naki.forEach((n) => {
    if (n.keyHai.haiInfo.type === 4 && (n.keyHai.haiInfo.num === 5 || n.keyHai.haiInfo.num === 6 || n.keyHai.haiInfo.num === 7)) {
      yakuhaiCheck++
    }

    // 場風と自風をダブルでカウントできるように
    if (n.keyHai.haiInfo.type === 4 && (n.keyHai.haiInfo.num === bakaze)) {
      yakuhaiCheck++
    }

    if (n.keyHai.haiInfo.type === 4 && (n.keyHai.haiInfo.num === jikaze)) {
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
export const tanyaoCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp): boolean => {
  let tanyaoFlag = true
  shantenInfo.haiCountInfo.forEach((h) => {
    if (h.count > 0 && (h.type === 4 || h.num === 1 || h.num === 9)) {
      tanyaoFlag = false
    }
  })
  if (isYaochu(machiHai)) {
    tanyaoFlag = false
  }

  // 鳴きの中身も見る
  paiInfo.naki.forEach((n) => {
    if (isYaochu(n.keyHai.haiInfo)) {
      tanyaoFlag = false
    }

    n.hai.forEach((nh) => {
      if (isYaochu(nh)) {
        tanyaoFlag = false
      }
    })
  })

  return tanyaoFlag
}

export const pinfuCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, bakaze: number, jikaze: number): boolean => {
  // 面前/順子三つ/雀頭が役牌じゃない/ターツが両面
  if (
    !isMemzen(paiInfo) ||
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

export const ipekoCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp): boolean => {
  // 面前
  if (!isMemzen(paiInfo)) {
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
    const kariMentsu = makeKariMentsu(shantenInfo.tatsu[0], machiHai)

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

// ハイテイ／ホウテイチェック
export const haiteiCheck = (yama: string[]): boolean => {
  // ツモ山が残ってないとき
  return yama.length === 14
}

// 三色同順
export const sanshokuDoujunCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp): boolean => {
  let sanshokuFlag = false
  const mentsuSet = mentsuPlusNaki(shantenInfo.mentsu, paiInfo)

  mentsuSet.forEach((m1, m1Key) => {
    if (m1[0].num !== m1[1].num) {
      // 自身が順子前提
      const sanshokuColorCheck: ColorFlagProp = {
        type_1: false,
        type_2: false,
        type_3: false,
        type_4: false
      }
      sanshokuColorCheck['type_' + String(m1[0].type) as ColorTypeProp] = true
      shantenInfo.mentsu.forEach((m2, m2Key) => {
        // 順子で一番下の数字が同じとき
        if (m2[0].num !== m2[1].num && m1[0].num === m2[0].num) {
          sanshokuColorCheck['type_' + String(m2[0].type) as ColorTypeProp] = true
        }
      })

      // ターツがあるときは面とにして一緒に比較
      if (shantenInfo.tatsu.length > 0) {
        const kariMentsu = makeKariMentsu(shantenInfo.tatsu[0], machiHai)
        if (m1[0].num === kariMentsu[0].num) {
          sanshokuColorCheck['type_' + String(kariMentsu[0].type) as ColorTypeProp] = true
        }
      }
      // 3セットそろっていれば三色同順
      // eslint-disable-next-line
      if (sanshokuColorCheck.type_1 === true && sanshokuColorCheck.type_2 === true && sanshokuColorCheck.type_3 === true) {
        sanshokuFlag = true
      }
    }
  })

  return sanshokuFlag
}

// 三色同刻
export const sanshokuDoukokuCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp): boolean => {
  let sanshokuFlag = false
  const mentsuSet = mentsuPlusNaki(shantenInfo.mentsu, paiInfo)

  mentsuSet.forEach((m1, m1Key) => {
    if (m1[0].num === m1[1].num) {
      // 自身が暗刻前提
      const sanshokuColorCheck: ColorFlagProp = {
        type_1: false,
        type_2: false,
        type_3: false,
        type_4: false
      }
      sanshokuColorCheck['type_' + String(m1[0].type) as ColorTypeProp] = true
      shantenInfo.mentsu.forEach((m2, m2Key) => {
        // 暗刻で一番下の数字が同じとき
        if (m2[0].num === m2[1].num && m1[0].num === m2[0].num) {
          sanshokuColorCheck['type_' + String(m2[0].type) as ColorTypeProp] = true
        }
      })

      // 対子が2つあるときは面とにして一緒に比較
      if (shantenInfo.toitsu.length === 2) {
        let kariMentsu
        if (shantenInfo.toitsu[0][0].hai === machiHai.hai) {
          kariMentsu = makeKariMentsu(shantenInfo.toitsu[0], machiHai)
        } else {
          kariMentsu = makeKariMentsu(shantenInfo.toitsu[1], machiHai)
        }
        if (m1[0].num === kariMentsu[0].num) {
          sanshokuColorCheck['type_' + String(kariMentsu[0].type) as ColorTypeProp] = true
        }
      }
      // 3セットそろっていれば三色同刻
      // eslint-disable-next-line
      if (sanshokuColorCheck.type_1 === true && sanshokuColorCheck.type_2 === true && sanshokuColorCheck.type_3 === true) {
        sanshokuFlag = true
      }
    }
  })

  return sanshokuFlag
}

// 三暗刻(ツモ)
export const sanankoCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, isTsumo: boolean): boolean => {
  let ankoCount = 0
  shantenInfo.mentsu.forEach((m) => {
    if (m[0].num === m[1].num) {
      ankoCount++
    }
  })

  // アンカンはカウントする
  paiInfo.naki.forEach((n) => {
    if (n.type === 'ankan') {
      ankoCount++
    }
  })

  // 自模ったときは暗刻扱い
  if (isTsumo && shantenInfo.toitsu.length === 2) {
    ankoCount++
  }

  return ankoCount === 3
}

export const ikkitsukanCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp): boolean => {
  let ikkitsukanFlag = false
  const mentsuSet = mentsuPlusNaki(shantenInfo.mentsu, paiInfo)

  mentsuSet.forEach((m1, m1Key) => {
    if (m1[0].num !== m1[1].num && (m1[0].num === 1 || m1[0].num === 4 || m1[0].num === 7)) {
      // 自身が順子前提
      const ikkiTsukanCheck: IkkiTsukanFlagProp = {
        num_1: false,
        num_4: false,
        num_7: false
      }
      ikkiTsukanCheck['num_' + String(m1[0].num) as IkkiTsukanTypeProp] = true
      shantenInfo.mentsu.forEach((m2, m2Key) => {
        // 順子で一通に使えるパーツで同じ色
        if (m2[0].num !== m2[1].num && (m2[0].num === 1 || m2[0].num === 4 || m2[0].num === 7) && m1[0].type === m2[0].type) {
          ikkiTsukanCheck['num_' + String(m2[0].num) as IkkiTsukanTypeProp] = true
        }
      })

      // ターツがあるときは面とにして一緒に比較
      if (shantenInfo.tatsu.length > 0) {
        const kariMentsu = makeKariMentsu(shantenInfo.tatsu[0], machiHai)
        if ((kariMentsu[0].num === 1 || kariMentsu[0].num === 4 || kariMentsu[0].num === 7) && m1[0].type === kariMentsu[0].type) {
          ikkiTsukanCheck['num_' + String(kariMentsu[0].num) as IkkiTsukanTypeProp] = true
        }
      }
      // 3セットそろっていれば一気通貫
      // eslint-disable-next-line
      if (ikkiTsukanCheck.num_1 === true && ikkiTsukanCheck.num_4 === true && ikkiTsukanCheck.num_7 === true) {
        ikkitsukanFlag = true
      }
    }
  })

  return ikkitsukanFlag
}

export const toitoihoCheck = (shantenInfo: ShantenBaseInfo): boolean => {
  // 順子/ターツがないこと
  let shuntsuCount = 0
  shantenInfo.mentsu.forEach((m) => {
    if (m[0].num !== m[1].num) {
      shuntsuCount++
    }
  })

  // 対子の数までチェックに入れることで七対子と区別可能
  return shuntsuCount === 0 && shantenInfo.tatsu.length === 0 && shantenInfo.toitsu.length <= 2
}

export const chantaCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp): boolean => {
  let chantaFlag = true
  const mentsuSet = mentsuPlusNaki(shantenInfo.mentsu, paiInfo)

  mentsuSet.forEach((m) => {
    // 字牌でなく 数字で並べた一番小さいものが1でも大きいものが9でもない
    if (m[0].type !== 4 && m[0].num !== 1 && m[2].num !== 9) {
      chantaFlag = false
    }
  })
  shantenInfo.toitsu.forEach((m) => {
    // 字牌でなく 1/9でもない
    if (m[0].type !== 4 && m[0].num !== 1 && m[0].num !== 9) {
      chantaFlag = false
    }
  })

  // ターツがあるときは面とにして一緒に比較
  if (shantenInfo.tatsu.length > 0) {
    const kariMentsu = makeKariMentsu(shantenInfo.tatsu[0], machiHai)
    if (kariMentsu[0].type !== 4 && kariMentsu[0].num !== 1 && kariMentsu[2].num !== 9) {
      chantaFlag = false
    }
  }

  // 単騎のパターン
  shantenInfo.remainHaiCountInfo.forEach((r) => {
    if (r.count > 0 && (r.type !== 4 && r.num !== 1 && r.num !== 9)) {
      chantaFlag = false
    }
  })
  return chantaFlag
}

export const shosangenCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp): boolean => {
  // 七対子については判定をしないようにする
  if (shantenInfo.toitsu.length >= 6) {
    return false
  }
  const SangenhaiCheck: SangenhaiFlagProp = {
    num_5: false,
    num_6: false,
    num_7: false
  }
  const mentsuSet = mentsuPlusNaki(shantenInfo.mentsu, paiInfo)
  mentsuSet.forEach((m) => {
    if (m[0].hai === 'hai_4_5' || m[0].hai === 'hai_4_6' || m[0].hai === 'hai_4_7') {
      SangenhaiCheck['num_' + String(m[0].num) as SangenhaiTypeProp] = true
    }
  })
  shantenInfo.toitsu.forEach((m) => {
    if (m[0].hai === 'hai_4_5' || m[0].hai === 'hai_4_6' || m[0].hai === 'hai_4_7') {
      SangenhaiCheck['num_' + String(m[0].num) as SangenhaiTypeProp] = true
    }
  })

  shantenInfo.remainHaiCountInfo.forEach((r) => {
    if (r.count > 0 && (r.hai === 'hai_4_5' || r.hai === 'hai_4_6' || r.hai === 'hai_4_7')) {
      SangenhaiCheck['num_' + String(r.num) as SangenhaiTypeProp] = true
    }
  })

  // eslint-disable-next-line
  return SangenhaiCheck.num_5 === true && SangenhaiCheck.num_6 === true && SangenhaiCheck.num_7 === true
}

export const sankantsuCheck = (paiInfo: PaiProp): boolean => {
  let kanCount = 0
  paiInfo.naki.forEach((n) => {
    if (n.type === 'ankan' || n.type === 'minkan') {
      kanCount++
    }
  })

  return kanCount === 3
}

export const honrotoCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp): boolean => {
  // すべての牌が19字牌
  let honrotoFlag = true
  shantenInfo.haiCountInfo.forEach((h) => {
    if (h.count > 0 && (h.type !== 4 && h.num !== 1 && h.num !== 9)) {
      honrotoFlag = false
    }
  })
  if (!isYaochu(machiHai)) {
    honrotoFlag = false
  }

  // 鳴きの中身も見る
  paiInfo.naki.forEach((n) => {
    if (!isYaochu(n.keyHai.haiInfo)) {
      honrotoFlag = false
    }

    n.hai.forEach((nh) => {
      if (!isYaochu(nh)) {
        honrotoFlag = false
      }
    })
  })

  return honrotoFlag
}

export const ryanpekoCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp): boolean => {
  // 面前/アンカンも含めて鳴きなし
  if (paiInfo.naki.length > 0) {
    return false
  }

  // 全部順子前提
  let shuntsuCheck = true
  shantenInfo.mentsu.forEach((m) => {
    if (m[0].hai === m[1].hai) {
      shuntsuCheck = false
    }
  })

  if (shantenInfo.toitsu.length >= 2) {
    shuntsuCheck = false
  }

  if (!shuntsuCheck) {
    return false
  }

  const shuntsuList: HaiInfoProp[][] = JSON.parse(JSON.stringify(shantenInfo.mentsu))
  if (shantenInfo.tatsu.length === 1) {
    const kariMentsu = makeKariMentsu(shantenInfo.tatsu[0], machiHai)
    shuntsuList.push(kariMentsu)
  }

  // 力技で・・・ｗ
  return shuntsuList.length === 4 &&
    ((shuntsuList[0][0].hai === shuntsuList[1][0].hai && shuntsuList[2][0].hai === shuntsuList[3][0].hai) ||
    (shuntsuList[0][0].hai === shuntsuList[2][0].hai && shuntsuList[1][0].hai === shuntsuList[3][0].hai) ||
    (shuntsuList[0][0].hai === shuntsuList[3][0].hai && shuntsuList[1][0].hai === shuntsuList[2][0].hai))
}

export const junchantaCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp): boolean => {
  let chantaFlag = true
  const mentsuSet = mentsuPlusNaki(shantenInfo.mentsu, paiInfo)

  mentsuSet.forEach((m) => {
    // 数字で並べた一番小さいものが1でも大きいものが9でもない
    if (m[0].type === 4 || (m[0].num !== 1 && m[2].num !== 9)) {
      chantaFlag = false
    }
  })
  shantenInfo.toitsu.forEach((m) => {
    // 1/9でもない
    if (m[0].type === 4 || (m[0].num !== 1 && m[0].num !== 9)) {
      chantaFlag = false
    }
  })

  // ターツがあるときは面とにして一緒に比較
  if (shantenInfo.tatsu.length > 0) {
    const kariMentsu = makeKariMentsu(shantenInfo.tatsu[0], machiHai)
    if (kariMentsu[0].type === 4 || (kariMentsu[0].num !== 1 && kariMentsu[2].num !== 9)) {
      chantaFlag = false
    }
  }

  // 単騎のパターン
  shantenInfo.remainHaiCountInfo.forEach((r) => {
    if (r.count > 0 && (r.type === 4 || (r.num !== 1 && r.num !== 9))) {
      chantaFlag = false
    }
  })
  return chantaFlag
}

export const chinitsuCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp): boolean => {
  // すべての牌が一色
  let isshokuColor = 0
  let chinitsuFlag = true
  shantenInfo.haiCountInfo.forEach((h) => {
    if (h.count > 0) {
      if (isshokuColor === 0) {
        isshokuColor = h.type
      } else if (isshokuColor !== h.type) {
        chinitsuFlag = false
      }
    }
  })

  // 鳴きの中身も見る
  paiInfo.naki.forEach((n) => {
    if (isshokuColor === 0) {
      isshokuColor = n.keyHai.haiInfo.type
    } else if (isshokuColor !== n.keyHai.haiInfo.type) {
      chinitsuFlag = false
    }
  })

  return chinitsuFlag
}

export const honitsuCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp): boolean => {
  // すべての牌が一色＋字牌
  let isshokuColor = 0
  let honitsuFlag = true
  shantenInfo.haiCountInfo.forEach((h) => {
    // 字牌はチェックからスキップ
    if (h.count > 0 && h.type !== 4) {
      if (isshokuColor === 0) {
        isshokuColor = h.type
      } else if (isshokuColor !== h.type) {
        honitsuFlag = false
      }
    }
  })

  // 鳴きの中身も見る
  paiInfo.naki.forEach((n) => {
    // 字牌はチェックからスキップ
    if (n.keyHai.haiInfo.type !== 4) {
      if (isshokuColor === 0) {
        isshokuColor = n.keyHai.haiInfo.type
      } else if (isshokuColor !== n.keyHai.haiInfo.type) {
        honitsuFlag = false
      }
    }
  })

  return honitsuFlag
}

export const chitoitsuCheck = (shantenInfo: ShantenBaseInfo): boolean => {
  return shantenInfo.toitsu.length === 6
}

export const rinshanKaihoCheck = (paiInfo: PaiProp): boolean => {
  // eslint-disable-next-line
  return paiInfo.kantsumo === true
}

// 四暗刻/ツモのみ
export const suankoCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp): boolean => {
  let ankoCount = 0
  shantenInfo.mentsu.forEach((m) => {
    if (m[0].num === m[1].num) {
      ankoCount++
    }
  })

  // アンカンはカウントする
  paiInfo.naki.forEach((n) => {
    if (n.type === 'ankan') {
      ankoCount++
    }
  })

  return ankoCount === 3 && shantenInfo.toitsu.length === 2
}

// 四暗刻単騎
export const suankoTankiCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp): boolean => {
  let ankoCount = 0
  shantenInfo.mentsu.forEach((m) => {
    if (m[0].num === m[1].num) {
      ankoCount++
    }
  })

  // アンカンはカウントする
  paiInfo.naki.forEach((n) => {
    if (n.type === 'ankan') {
      ankoCount++
    }
  })

  return ankoCount === 4
}

// 国士無双
export const kokushimusouCheck = (shantenInfo: ShantenBaseInfo): boolean => {
  if (shantenInfo.kokushi.length !== 13) {
    return false
  }

  // 重複牌がある
  let doubleCheck = false
  shantenInfo.haiCountInfo.forEach((h) => {
    if (h.count > 1) {
      doubleCheck = true
    }
  })

  return doubleCheck
}

// 国士無双13面
export const kokushimusou13Check = (shantenInfo: ShantenBaseInfo): boolean => {
  if (shantenInfo.kokushi.length !== 13) {
    return false
  }

  // 重複牌がある
  let doubleCheck = false
  shantenInfo.haiCountInfo.forEach((h) => {
    if (h.count > 1) {
      doubleCheck = true
    }
  })

  return !doubleCheck
}

// 大三元
export const daisangenCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp): boolean => {
  let hakuFlag = false
  let hatsuFlag = false
  let tyunFlag = false
  const mentsuSet = mentsuPlusNaki(shantenInfo.mentsu, paiInfo)

  mentsuSet.forEach((m) => {
    if (m[0].type === 4 && m[0].num === 5) {
      hakuFlag = true
    }
    if (m[0].type === 4 && m[0].num === 6) {
      hatsuFlag = true
    }
    if (m[0].type === 4 && m[0].num === 7) {
      tyunFlag = true
    }
  })

  // ツモ予定もチェック
  if (shantenInfo.toitsu.length === 2) {
    if (machiHai.type === 4 && machiHai.num === 5) {
      hakuFlag = true
    }
    if (machiHai.type === 4 && machiHai.num === 6) {
      hatsuFlag = true
    }
    if (machiHai.type === 4 && machiHai.num === 7) {
      tyunFlag = true
    }
  }

  return hakuFlag && hatsuFlag && tyunFlag
}

// 緑一色
export const ryuisoCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp): boolean => {
  let ryuisoFlag = true
  // base
  shantenInfo.haiCountInfo.forEach((h) => {
    if (h.count > 0 && (
      h.type === 1 ||
      h.type === 2 ||
      (h.type === 3 && (h.num === 1 || h.num === 5 || h.num === 7 || h.num === 9)) ||
      (h.type === 4 && h.num !== 6)
    )) {
      ryuisoFlag = false
    }
  })

  // naki牌
  paiInfo.naki.forEach((n) => {
    if (
      n.keyHai.haiInfo.type === 1 ||
      n.keyHai.haiInfo.type === 2 ||
      (n.keyHai.haiInfo.type === 3 && (n.keyHai.haiInfo.num === 1 || n.keyHai.haiInfo.num === 5 || n.keyHai.haiInfo.num === 7 || n.keyHai.haiInfo.num === 9)) ||
      (n.keyHai.haiInfo.type === 4 && n.keyHai.haiInfo.num !== 6)
    ) {
      ryuisoFlag = false
    }

    n.hai.forEach((h) => {
      if (
        h.type === 1 ||
        h.type === 2 ||
        (h.type === 3 && (h.num === 1 || h.num === 5 || h.num === 7 || h.num === 9)) ||
        (h.type === 4 && h.num !== 6)
      ) {
        ryuisoFlag = false
      }
    })

    // 待ち牌
    if (
      machiHai.type === 1 ||
      machiHai.type === 2 ||
      (machiHai.type === 3 && (machiHai.num === 1 || machiHai.num === 5 || machiHai.num === 7 || machiHai.num === 9)) ||
      (machiHai.type === 4 && machiHai.num !== 6)
    ) {
      ryuisoFlag = false
    }
  })

  return ryuisoFlag
}

// 緑一色
export const tsuisoCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp): boolean => {
  let tsuisoFlag = true
  // base
  shantenInfo.haiCountInfo.forEach((h) => {
    if (h.count > 0 && h.type !== 4) {
      tsuisoFlag = false
    }
  })

  // naki牌
  paiInfo.naki.forEach((n) => {
    if (n.keyHai.haiInfo.type !== 4) {
      tsuisoFlag = false
    }

    n.hai.forEach((h) => {
      if (h.type !== 4) {
        tsuisoFlag = false
      }
    })
  })

  return tsuisoFlag
}

// 清老頭
export const chinrotoCheck = (shantenInfo: ShantenBaseInfo, paiInfo: PaiProp, machiHai: HaiInfoProp): boolean => {
  // すべての牌が19
  let chinrotoFlag = true
  shantenInfo.haiCountInfo.forEach((h) => {
    if (h.count > 0 && (h.type === 4 || (h.num !== 1 && h.num !== 9))) {
      chinrotoFlag = false
    }
  })
  if (!isYaochu(machiHai) || machiHai.type === 4) {
    chinrotoFlag = false
  }

  // 鳴きの中身も見る
  paiInfo.naki.forEach((n) => {
    if (!isYaochu(n.keyHai.haiInfo) || n.keyHai.haiInfo.type === 4) {
      chinrotoFlag = false
    }

    n.hai.forEach((nh) => {
      if (!isYaochu(nh) || nh.type === 4) {
        chinrotoFlag = false
      }
    })
  })

  return chinrotoFlag
}

export const sukantsuCheck = (paiInfo: PaiProp): boolean => {
  let kanCount = 0
  paiInfo.naki.forEach((n) => {
    if (n.type === 'ankan' || n.type === 'minkan') {
      kanCount++
    }
  })

  return kanCount === 4
}

// 一九字牌の判定
const isYaochu = (hai: HaiInfoProp): boolean => {
  return hai.type === 4 || hai.num === 1 || hai.num === 9
}

const isYakuhai = (hai: HaiInfoProp, bakaze: number, jikaze: number): boolean => {
  // 役牌は場風/自風/白發中
  return hai.type === 4 && (hai.num === bakaze || hai.num === jikaze || hai.num === 5 || hai.num === 6 || hai.num === 7)
}

const makeKariMentsu = (tatsuToitsu: HaiInfoProp[], machiHai: HaiInfoProp): HaiInfoProp[] => {
  const tatsuToitsuCopy: HaiInfoProp[] = JSON.parse(JSON.stringify(tatsuToitsu))
  const kariMentsu = tatsuToitsuCopy.concat(machiHai)
  return kariMentsu.sort((a, b) => {
    return (a.hai > b.hai) ? 1 : -1
  })
}

const mentsuPlusNaki = (mentsu: HaiInfoProp[][], paiInfo: PaiProp): HaiInfoProp[][] => {
  const mentsuPlusNaki: HaiInfoProp[][] = JSON.parse(JSON.stringify(mentsu))
  paiInfo.naki.forEach((n) => {
    mentsuPlusNaki.push(makeKariMentsu(n.hai, n.keyHai.haiInfo))
  })

  return mentsuPlusNaki
}
