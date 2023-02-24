import type { HaiCountInfoProp, HaiInfoProp, MachiInfoProp, PaiProp, ShantenBaseInfo, ShantenInfoProp } from '../board/type'
import { fuyakuCalc } from './fuyaku_calc'

export const shantenBase = (paiInfo: PaiProp): ShantenInfoProp => {
  const mentsuGroup = shantenMentsu(paiInfo)

  // 待ちの抽出
  let machiSeiri: MachiInfoProp[] = []
  mentsuGroup.forEach((m) => {
    machiSeiri = machiSeiri.concat(m.machi)
  })

  // ソート
  machiSeiri = machiSeiri.sort((a, b) => {
    return (a.haiInfo.hai > b.haiInfo.hai) ? 1 : -1
  })

  // 重複の排除
  const machiSeiri2: MachiInfoProp[] = []
  machiSeiri.forEach((c) => {
    let doubleCheck = false
    machiSeiri2.forEach((d) => {
      if (c.haiInfo.hai === d.haiInfo.hai) {
        doubleCheck = true
      }
    })

    if (!doubleCheck) {
      machiSeiri2.push(c)
    }
  })

  return {
    shanten: mentsuGroup[0].shanten,
    machi: machiSeiri2,
    mentsuGroup
  }
}

export const shantenMentsu = (paiInfo: PaiProp): ShantenBaseInfo[] => {
  // 鳴いてる数はメンツとしてカウント

  const haiCountInfo: HaiCountInfoProp[] = [
    {
      hai: 'hai_1_1',
      type: 1,
      num: 1,
      count: 0
    },
    {
      hai: 'hai_1_2',
      type: 1,
      num: 2,
      count: 0
    },
    {
      hai: 'hai_1_3',
      type: 1,
      num: 3,
      count: 0
    },
    {
      hai: 'hai_1_4',
      type: 1,
      num: 4,
      count: 0
    },
    {
      hai: 'hai_1_5',
      type: 1,
      num: 5,
      count: 0
    },
    {
      hai: 'hai_1_6',
      type: 1,
      num: 6,
      count: 0
    },
    {
      hai: 'hai_1_7',
      type: 1,
      num: 7,
      count: 0
    },
    {
      hai: 'hai_1_8',
      type: 1,
      num: 8,
      count: 0
    },
    {
      hai: 'hai_1_9',
      type: 1,
      num: 9,
      count: 0
    },
    {
      hai: 'hai_2_1',
      type: 2,
      num: 1,
      count: 0
    },
    {
      hai: 'hai_2_2',
      type: 2,
      num: 2,
      count: 0
    },
    {
      hai: 'hai_2_3',
      type: 2,
      num: 3,
      count: 0
    },
    {
      hai: 'hai_2_4',
      type: 2,
      num: 4,
      count: 0
    },
    {
      hai: 'hai_2_5',
      type: 2,
      num: 5,
      count: 0
    },
    {
      hai: 'hai_2_6',
      type: 2,
      num: 6,
      count: 0
    },
    {
      hai: 'hai_2_7',
      type: 2,
      num: 7,
      count: 0
    },
    {
      hai: 'hai_2_8',
      type: 2,
      num: 8,
      count: 0
    },
    {
      hai: 'hai_2_9',
      type: 2,
      num: 9,
      count: 0
    },
    {
      hai: 'hai_3_1',
      type: 3,
      num: 1,
      count: 0
    },
    {
      hai: 'hai_3_2',
      type: 3,
      num: 2,
      count: 0
    },
    {
      hai: 'hai_3_3',
      type: 3,
      num: 3,
      count: 0
    },
    {
      hai: 'hai_3_4',
      type: 3,
      num: 4,
      count: 0
    },
    {
      hai: 'hai_3_5',
      type: 3,
      num: 5,
      count: 0
    },
    {
      hai: 'hai_3_6',
      type: 3,
      num: 6,
      count: 0
    },
    {
      hai: 'hai_3_7',
      type: 3,
      num: 7,
      count: 0
    },
    {
      hai: 'hai_3_8',
      type: 3,
      num: 8,
      count: 0
    },
    {
      hai: 'hai_3_9',
      type: 3,
      num: 9,
      count: 0
    },
    {
      hai: 'hai_4_1',
      type: 4,
      num: 1,
      count: 0
    },
    {
      hai: 'hai_4_2',
      type: 4,
      num: 2,
      count: 0
    },
    {
      hai: 'hai_4_3',
      type: 4,
      num: 3,
      count: 0
    },
    {
      hai: 'hai_4_4',
      type: 4,
      num: 4,
      count: 0
    },
    {
      hai: 'hai_4_5',
      type: 4,
      num: 5,
      count: 0
    },
    {
      hai: 'hai_4_6',
      type: 4,
      num: 6,
      count: 0
    },
    {
      hai: 'hai_4_7',
      type: 4,
      num: 7,
      count: 0
    }
  ]

  // 集計用に値をセット
  paiInfo.base.forEach((pai) => {
    const kokushuIndex = haiCountInfo.findIndex((listHai) => pai === listHai.hai)
    if (kokushuIndex !== -1) {
      haiCountInfo[kokushuIndex].count++
    }
  })

  const shantenBaseInfo: ShantenBaseInfo = {
    remainHaiCountInfo: haiCountInfo,
    kokushi: [],
    mentsu: [],
    toitsu: [],
    tatsu: [],
    remain: [],
    shanten: 99,
    machi: []
  }

  // 対子の可能性を取得(対子なしも含めて)
  const shantenCheck1: ShantenBaseInfo[] = []
  haiCountInfo.forEach((h, k) => {
    if (h.count >= 2) {
      // 対子を除いたデータ
      const copyhaiCountInfo: HaiCountInfoProp[] = JSON.parse(JSON.stringify(haiCountInfo))
      copyhaiCountInfo[k].count = copyhaiCountInfo[k].count - 2

      // 対子データの作成
      const toitsuInfo: HaiInfoProp[] = [
        {
          hai: h.hai,
          type: h.type,
          num: h.num
        },
        {
          hai: h.hai,
          type: h.type,
          num: h.num
        }
      ]

      const shantenStartToitsu: ShantenBaseInfo = JSON.parse(JSON.stringify(shantenBaseInfo))
      shantenStartToitsu.remainHaiCountInfo = copyhaiCountInfo
      shantenStartToitsu.toitsu.push(toitsuInfo)

      // セット
      shantenCheck1.push(shantenStartToitsu)
    }
  })
  // 対子がないパターンのセット
  const shantenNotoitsu: ShantenBaseInfo = JSON.parse(JSON.stringify(shantenBaseInfo))
  shantenCheck1.push(shantenNotoitsu)

  // ここからメンツがなくなるまでチェックするよー(max4回)
  const shantenCheck2 = mentsuBunseki(shantenCheck1)
  const shantenCheck3 = mentsuBunseki(shantenCheck2)
  const shantenCheck4 = mentsuBunseki(shantenCheck3)
  const shantenCheck5 = mentsuBunseki(shantenCheck4)

  // 対子/ターツのチェック(max 7回)
  const shantenCheck21 = toitsuTatsuBunseki(shantenCheck5)
  const shantenCheck22 = toitsuTatsuBunseki(shantenCheck21)
  const shantenCheck23 = toitsuTatsuBunseki(shantenCheck22)
  const shantenCheck24 = toitsuTatsuBunseki(shantenCheck23)
  const shantenCheck25 = toitsuTatsuBunseki(shantenCheck24)
  const shantenCheck26 = toitsuTatsuBunseki(shantenCheck25)
  const shantenCheck27 = toitsuTatsuBunseki(shantenCheck26)

  // 国士セットを別に追加する
  // @todo: 鳴きがあるときはセット不要
  let kokushiToitsuSet = false
  let toitsuInfo: HaiInfoProp[] = []
  const copyhaiCountInfo = JSON.parse(JSON.stringify(haiCountInfo))
  haiCountInfo.forEach((h, k) => {
    if (h.count > 0 && (h.num === 1 || h.num === 9 || h.type === 4)) {
      if (!kokushiToitsuSet && h.count >= 2) {
        toitsuInfo = toitsuInfo.concat([
          {
            hai: h.hai,
            type: h.type,
            num: h.num
          },
          {
            hai: h.hai,
            type: h.type,
            num: h.num
          }
        ])
        copyhaiCountInfo[k].count = copyhaiCountInfo[k].count - 2
        kokushiToitsuSet = true
      } else {
        toitsuInfo = toitsuInfo.concat([
          {
            hai: h.hai,
            type: h.type,
            num: h.num
          }
        ])
        copyhaiCountInfo[k].count = copyhaiCountInfo[k].count - 1
      }
    }
  })

  const shantenKokushi = JSON.parse(JSON.stringify(shantenBaseInfo))
  shantenKokushi.remainHaiCountInfo = copyhaiCountInfo
  shantenKokushi.kokushi = toitsuInfo

  // セット
  shantenCheck27.push(shantenKokushi)

  // メンツなどの並び替え(重複除去に使用したい)
  shantenCheck27.forEach((a) => {
    a.mentsu = a.mentsu.sort((a, b) => {
      return (a[0].hai.concat(a[1].hai).concat(a[2].hai) > b[0].hai.concat(b[1].hai).concat(b[2].hai)) ? 1 : -1
    })
    a.toitsu = a.toitsu.sort((a, b) => {
      return (a[0].hai.concat(a[1].hai) > b[0].hai.concat(b[1].hai)) ? 1 : -1
    })
    a.tatsu = a.tatsu.sort((a, b) => {
      return (a[0].hai.concat(a[1].hai) > b[0].hai.concat(b[1].hai)) ? 1 : -1
    })
  })

  // 重複を排除(同じものはいらない)
  const shantenSeiri: ShantenBaseInfo[] = []
  shantenCheck27.forEach((c) => {
    let doubleCheck = false
    shantenSeiri.forEach((d) => {
      if (
        JSON.stringify(c.mentsu) === JSON.stringify(d.mentsu) &&
        JSON.stringify(c.toitsu) === JSON.stringify(d.toitsu) &&
        JSON.stringify(c.tatsu) === JSON.stringify(d.tatsu) &&
        JSON.stringify(c.remainHaiCountInfo) === JSON.stringify(d.remainHaiCountInfo)
      ) {
        doubleCheck = true
      }
    })

    if (!doubleCheck) {
      shantenSeiri.push(c)
    }
  })

  // 各組み合わせのシャンテン数セット
  let minShanten = 99
  shantenSeiri.forEach((c) => {
    if (c.kokushi.length > 0) {
      return 13 - c.kokushi.length
    }
    const mentsu: number = c.mentsu.length
    const toitsu: number = c.toitsu.length
    let tatsu: number = c.tatsu.length

    // メンツとターツ・対子のセットが6セット以上あるときはターツを削る(数値上マイナスになってもよい)
    if (mentsu + toitsu + tatsu >= 6) {
      tatsu -= (mentsu + toitsu + tatsu - 5)
    }

    let shantenCount = 8 - mentsu * 2 - toitsu - tatsu
    // メンツとターツの組み合わせが5セットあって対子がない時は1シャンテンプラス
    if ((mentsu + tatsu) === 5 && toitsu === 0) {
      shantenCount += 1
    }

    // 七対子の判定を
    // @todo: 鳴きがあるときは入れない
    const titoitsuShanten = 6 - toitsu

    c.shanten = Math.min(shantenCount, titoitsuShanten)

    if (c.shanten < minShanten) {
      minShanten = c.shanten
    }
  })

  const shantenComplete = shantenSeiri.filter((c) => {
    return c.shanten === minShanten
  })

  // シャンテンが0 = テンパイ時にそれぞれの待ちをセットする

  shantenComplete.forEach((c, k) => {
    if (c.shanten === 0) {
      if (c.mentsu.length === 3 && c.toitsu.length === 1 && c.tatsu.length === 1) {
        // ターツの待ち
        // カンチャン
        if (c.tatsu[0][0].num === c.tatsu[0][1].num - 2) {
          shantenComplete[k].machi = [{
            haiInfo: {
              // eslint-disable-next-line
              hai: 'hai_' + String(c.tatsu[0][0].type) + '_' + String(c.tatsu[0][0].num + 1),
              type: c.tatsu[0][0].type,
              // eslint-disable-next-line
              num: c.tatsu[0][0].num + 1
            },
            // @todo: 点数計算
            tensu: fuyakuCalc()
          }]
        }
        // 両面（ペンチャン込み)
        if (c.tatsu[0][0].num === c.tatsu[0][1].num - 1) {
          const ryomen: MachiInfoProp[] = []
          if (c.tatsu[0][0].num !== 1) {
            ryomen.push({
              haiInfo: {
                // eslint-disable-next-line
                hai: 'hai_' + String(c.tatsu[0][0].type) + '_' + String(c.tatsu[0][0].num - 1),
                type: c.tatsu[0][0].type,
                // eslint-disable-next-line
                num: c.tatsu[0][0].num - 1
              },
              // @todo: 点数計算
              tensu: fuyakuCalc()
            })
          }
          if (c.tatsu[0][0].num !== 8) {
            ryomen.push({
              haiInfo: {
                // eslint-disable-next-line
                hai: 'hai_' + String(c.tatsu[0][0].type) + '_' + String(c.tatsu[0][0].num + 2),
                type: c.tatsu[0][0].type,
                // eslint-disable-next-line
                num: c.tatsu[0][0].num + 2
              },
              // @todo: 点数計算
              tensu: fuyakuCalc()
            })
          }
          shantenComplete[k].machi = ryomen
        }
      }

      // シャンポン
      if (c.mentsu.length === 3 && c.toitsu.length === 2) {
        shantenComplete[k].machi = [{
          haiInfo: {
            hai: 'hai_' + String(c.toitsu[0][0].type) + '_' + String(c.toitsu[0][0].num),
            type: c.toitsu[0][0].type,
            num: c.toitsu[0][0].num
          },
          // @todo: 点数計算
          tensu: fuyakuCalc()
        },
        {
          haiInfo: {
            hai: 'hai_' + String(c.toitsu[1][0].type) + '_' + String(c.toitsu[1][0].num),
            type: c.toitsu[1][0].type,
            num: c.toitsu[1][0].num
          },
          // @todo: 点数計算
          tensu: fuyakuCalc()
        }]
      }

      // 単騎/七対子
      if (c.mentsu.length === 4 || c.toitsu.length === 6) {
        const tanki: MachiInfoProp[] = []
        c.remainHaiCountInfo.forEach((r) => {
          if (r.count === 1) {
            tanki.push({
              haiInfo: {
                hai: 'hai_' + String(r.type) + '_' + String(r.num),
                type: r.type,
                num: r.num
              },
              // @todo: 点数計算
              tensu: fuyakuCalc()
            })
          }
        })
        shantenComplete[k].machi = tanki
      }

      // @todo: 国士
    }
  })

  return shantenComplete
}

const mentsuBunseki = (shantenCheck1: ShantenBaseInfo[]): ShantenBaseInfo[] => {
  const shantenCheck2: ShantenBaseInfo[] = []
  shantenCheck1.forEach((c, k) => {
    let mentsuNone = true
    c.remainHaiCountInfo.forEach((c2, k2) => {
      // 暗刻のパターン
      if (c2.count >= 3) {
        mentsuNone = false

        const copyhaiCountInfoAnko: HaiCountInfoProp[] = JSON.parse(JSON.stringify(c.remainHaiCountInfo))
        copyhaiCountInfoAnko[k2].count = copyhaiCountInfoAnko[k2].count - 3

        // 暗刻データの作成
        const ankoInfo: HaiInfoProp[] = [
          {
            hai: c2.hai,
            type: c2.type,
            num: c2.num
          },
          {
            hai: c2.hai,
            type: c2.type,
            num: c2.num
          },
          {
            hai: c2.hai,
            type: c2.type,
            num: c2.num
          }
        ]

        const shantenAnko: ShantenBaseInfo = JSON.parse(JSON.stringify(c))
        shantenAnko.remainHaiCountInfo = copyhaiCountInfoAnko
        shantenAnko.mentsu.push(ankoInfo)

        // セット
        shantenCheck2.push(shantenAnko)
      }

      // 順子のパターン
      // eslint-disable-next-line
      if (c2.count >= 1 && c2.type !== 4 && c2.num <= 7 && c.remainHaiCountInfo[k2 + 1].count >= 1 && c.remainHaiCountInfo[k2 + 2].count >= 1) {
        mentsuNone = false

        const copyhaiCountInfoShuntsu: HaiCountInfoProp[] = JSON.parse(JSON.stringify(c.remainHaiCountInfo))
        copyhaiCountInfoShuntsu[k2].count = copyhaiCountInfoShuntsu[k2].count - 1
        // eslint-disable-next-line
        copyhaiCountInfoShuntsu[k2 + 1].count = copyhaiCountInfoShuntsu[k2 + 1].count - 1
        // eslint-disable-next-line
        copyhaiCountInfoShuntsu[k2 + 2].count = copyhaiCountInfoShuntsu[k2 + 2].count - 1

        // 順子データの作成
        const shuntsuInfo: HaiInfoProp[] = [
          {
            hai: c2.hai,
            type: c2.type,
            num: c2.num
          },
          {
            // eslint-disable-next-line
            hai: c.remainHaiCountInfo[k2 + 1].hai,
            // eslint-disable-next-line
            type: c.remainHaiCountInfo[k2 + 1].type,
            // eslint-disable-next-line
            num: c.remainHaiCountInfo[k2 + 1].num
          },
          {
            // eslint-disable-next-line
            hai: c.remainHaiCountInfo[k2 + 2].hai,
            // eslint-disable-next-line
            type: c.remainHaiCountInfo[k2 + 2].type,
            // eslint-disable-next-line
            num: c.remainHaiCountInfo[k2 + 2].num
          }
        ]

        const shantenShuntsu: ShantenBaseInfo = JSON.parse(JSON.stringify(c))
        shantenShuntsu.remainHaiCountInfo = copyhaiCountInfoShuntsu
        shantenShuntsu.mentsu.push(shuntsuInfo)

        // セット
        shantenCheck2.push(shantenShuntsu)
      }
    })
    // メンツがない時はそのままセットする
    if (mentsuNone) {
      const shantenSonomama: ShantenBaseInfo = JSON.parse(JSON.stringify(c))
      shantenCheck2.push(shantenSonomama)
    }
  })

  return shantenCheck2
}

const toitsuTatsuBunseki = (shantenCheck1: ShantenBaseInfo[]): ShantenBaseInfo[] => {
  const shantenCheck2: ShantenBaseInfo[] = []
  shantenCheck1.forEach((c, k) => {
    let mentsuNone = true
    c.remainHaiCountInfo.forEach((c2, k2) => {
      // 対子のパターン
      if (c2.count >= 2) {
        mentsuNone = false

        const copyhaiCountInfoToitsu: HaiCountInfoProp[] = JSON.parse(JSON.stringify(c.remainHaiCountInfo))
        copyhaiCountInfoToitsu[k2].count = copyhaiCountInfoToitsu[k2].count - 2

        // 暗刻データの作成
        const toitsuInfo: HaiInfoProp[] = [
          {
            hai: c2.hai,
            type: c2.type,
            num: c2.num
          },
          {
            hai: c2.hai,
            type: c2.type,
            num: c2.num
          }
        ]

        const shantenToitsu: ShantenBaseInfo = JSON.parse(JSON.stringify(c))
        shantenToitsu.remainHaiCountInfo = copyhaiCountInfoToitsu
        shantenToitsu.toitsu.push(toitsuInfo)

        // セット
        shantenCheck2.push(shantenToitsu)
      }

      // ターツのパターン1(横並び)
      // eslint-disable-next-line
      if (c2.count >= 1 && c2.type !== 4 && c2.num <= 8 && c.remainHaiCountInfo[k2 + 1].count >= 1) {
        mentsuNone = false

        const copyhaiCountInfoTatsu1: HaiCountInfoProp[] = JSON.parse(JSON.stringify(c.remainHaiCountInfo))
        // eslint-disable-next-line
        copyhaiCountInfoTatsu1[k2].count = copyhaiCountInfoTatsu1[k2].count - 1
        // eslint-disable-next-line
        copyhaiCountInfoTatsu1[k2 + 1].count = copyhaiCountInfoTatsu1[k2 + 1].count - 1

        // 順子データの作成
        const tatsu1Info: HaiInfoProp[] = [
          {
            hai: c2.hai,
            type: c2.type,
            num: c2.num
          },
          {
            // eslint-disable-next-line
            hai: c.remainHaiCountInfo[k2 + 1].hai,
            // eslint-disable-next-line
            type: c.remainHaiCountInfo[k2 + 1].type,
            // eslint-disable-next-line
            num: c.remainHaiCountInfo[k2 + 1].num
          }
        ]

        const shantenTatsu1: ShantenBaseInfo = JSON.parse(JSON.stringify(c))
        shantenTatsu1.remainHaiCountInfo = copyhaiCountInfoTatsu1
        shantenTatsu1.tatsu.push(tatsu1Info)

        // セット
        shantenCheck2.push(shantenTatsu1)
      }

      // ターツのパターン2(カンチャン)
      // eslint-disable-next-line
      if (c2.count >= 1 && c2.type !== 4 && c2.num <= 7 && c.remainHaiCountInfo[k2 + 2].count >= 1) {
        mentsuNone = false

        const copyhaiCountInfoTatsu2: HaiCountInfoProp[] = JSON.parse(JSON.stringify(c.remainHaiCountInfo))
        copyhaiCountInfoTatsu2[k2].count = copyhaiCountInfoTatsu2[k2].count - 1
        // eslint-disable-next-line
        copyhaiCountInfoTatsu2[k2 + 2].count = copyhaiCountInfoTatsu2[k2 + 2].count - 1

        // 順子データの作成
        const tatsu2Info: HaiInfoProp[] = [
          {
            hai: c2.hai,
            type: c2.type,
            num: c2.num
          },
          {
            // eslint-disable-next-line
            hai: c.remainHaiCountInfo[k2 + 2].hai,
            // eslint-disable-next-line
            type: c.remainHaiCountInfo[k2 + 2].type,
            // eslint-disable-next-line
            num: c.remainHaiCountInfo[k2 + 2].num
          }
        ]

        const shantenTatsu2: ShantenBaseInfo = JSON.parse(JSON.stringify(c))
        shantenTatsu2.remainHaiCountInfo = copyhaiCountInfoTatsu2
        shantenTatsu2.tatsu.push(tatsu2Info)

        // セット
        shantenCheck2.push(shantenTatsu2)
      }
    })

    // メンツがない時はそのままセットする
    if (mentsuNone) {
      const shantenSonomama: ShantenBaseInfo = JSON.parse(JSON.stringify(c))
      shantenCheck2.push(shantenSonomama)
    }
  })

  return shantenCheck2
}
