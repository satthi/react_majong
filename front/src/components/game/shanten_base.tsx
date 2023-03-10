import type { AllPaiProp, HaiCountInfoProp, HaiInfoProp, MachiInfoProp, PaiProp, ShantenBaseInfo, ShantenGroupInfoProp, ShantenInfoProp } from '../board/type'
import { fuyakuCalc } from './calc/fuyaku_calc'
import { isMemzen } from './detection/is_menzen'

export const shantenBase = (allPaiInfo: AllPaiProp, paiInfo: PaiProp, yama: string[], jikaze: number, bakaze: number): ShantenInfoProp => {
  const mentsuGroup = shantenMentsu(allPaiInfo, paiInfo, yama, jikaze, bakaze)

  // 待ちの抽出
  let machiSeiri: MachiInfoProp[] = []
  mentsuGroup.forEach((m) => {
    machiSeiri = machiSeiri.concat(m.machi)
  })

  // ソート
  machiSeiri = machiSeiri.sort((a, b) => {
    return (a.haiInfo.hai > b.haiInfo.hai) ? 1 : -1
  })

  // // 重複の排除
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

export const shantenMentsu = (allPaiInfo: AllPaiProp, paiInfo: PaiProp, yama: string[], jikaze: number, bakaze: number): ShantenBaseInfo[] => {
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
    haiCountInfo: JSON.parse(JSON.stringify(haiCountInfo)),
    kokushi: [],
    mentsu: [],
    toitsu: [],
    tatsu: [],
    remain: [],
    shanten: 99,
    machi: []
  }

  // メンツパターンの調整
  // 牌の種類ごとにグルーピング/字牌は暗刻・対子で固定する
  const manzuGroup: ShantenGroupInfoProp = {
    remainHaiCountInfo: [
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
      }
    ],
    mentsu: [],
    toitsu: [],
    tatsu: []
  }

  const pinzuGroup: ShantenGroupInfoProp = {
    remainHaiCountInfo: [
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
      }
    ],
    mentsu: [],
    toitsu: [],
    tatsu: []
  }

  const sozuGroup: ShantenGroupInfoProp = {
    remainHaiCountInfo: [
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
      }
    ],
    mentsu: [],
    toitsu: [],
    tatsu: []
  }
  shantenBaseInfo.remainHaiCountInfo.forEach((r) => {
    if (r.type === 1) {
      const remainInfo = manzuGroup.remainHaiCountInfo.find((m) => m.num === r.num)
      if (typeof remainInfo !== 'undefined') {
        remainInfo.count = r.count
      }
    }
    if (r.type === 2) {
      const remainInfo = pinzuGroup.remainHaiCountInfo.find((m) => m.num === r.num)
      if (typeof remainInfo !== 'undefined') {
        remainInfo.count = r.count
      }
    }
    if (r.type === 3) {
      const remainInfo = sozuGroup.remainHaiCountInfo.find((m) => m.num === r.num)
      if (typeof remainInfo !== 'undefined') {
        remainInfo.count = r.count
      }
    }
    if (r.type === 4) {
      if (r.count >= 3) {
        // 暗刻データの作成
        shantenBaseInfo.mentsu.push([
          {
            hai: r.hai,
            type: r.type,
            num: r.num
          },
          {
            hai: r.hai,
            type: r.type,
            num: r.num
          },
          {
            hai: r.hai,
            type: r.type,
            num: r.num
          }
        ])
        r.count -= 3
      } else if (r.count === 2) {
        // 暗刻データの作成
        shantenBaseInfo.toitsu.push([
          {
            hai: r.hai,
            type: r.type,
            num: r.num
          },
          {
            hai: r.hai,
            type: r.type,
            num: r.num
          }
        ])
        r.count -= 2
      }
    }
  })

  const manzuGroupBunseki = groupBunseki(manzuGroup, shantenBaseInfo.toitsu.length > 0)
  const pinzuGroupBunseki = groupBunseki(pinzuGroup, shantenBaseInfo.toitsu.length > 0)
  const sozuGroupBunseki = groupBunseki(sozuGroup, shantenBaseInfo.toitsu.length > 0)

  const shantenCheck27: ShantenBaseInfo[] = []
  manzuGroupBunseki.forEach((m) => {
    pinzuGroupBunseki.forEach((p) => {
      sozuGroupBunseki.forEach((s) => {
        // マンズ・ピンズ・ソウズの取得グループの設置
        const copyShantenBaseInfo: ShantenBaseInfo = JSON.parse(JSON.stringify(shantenBaseInfo))
        copyShantenBaseInfo.mentsu = copyShantenBaseInfo.mentsu.concat(m.mentsu).concat(p.mentsu).concat(s.mentsu)
        copyShantenBaseInfo.toitsu = copyShantenBaseInfo.toitsu.concat(m.toitsu).concat(p.toitsu).concat(s.toitsu)
        copyShantenBaseInfo.tatsu = copyShantenBaseInfo.tatsu.concat(m.tatsu).concat(p.tatsu).concat(s.tatsu)
        m.remainHaiCountInfo.forEach((mr) => {
          const mrinfo = copyShantenBaseInfo.remainHaiCountInfo.find((r) => r.type === mr.type && r.num === mr.num)
          if (typeof mrinfo !== 'undefined') {
            mrinfo.count = mr.count
          }
        })
        p.remainHaiCountInfo.forEach((pr) => {
          const prinfo = copyShantenBaseInfo.remainHaiCountInfo.find((r) => r.type === pr.type && r.num === pr.num)
          if (typeof prinfo !== 'undefined') {
            prinfo.count = pr.count
          }
        })
        s.remainHaiCountInfo.forEach((sr) => {
          const srinfo = copyShantenBaseInfo.remainHaiCountInfo.find((r) => r.type === sr.type && r.num === sr.num)
          if (typeof srinfo !== 'undefined') {
            srinfo.count = sr.count
          }
        })
        shantenCheck27.push(copyShantenBaseInfo)
      })
    })
  })

  // 国士セットを別に追加する
  const isMenzenHantei = isMemzen(paiInfo)
  if (isMenzenHantei) {
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
  }

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

  // 七対子の判定用
  const uniqueBase = Array.from(new Set(paiInfo.base))
  // 各組み合わせのシャンテン数セット
  let minShanten = 99
  shantenSeiri.forEach((c) => {
    if (c.kokushi.length > 0) {
      c.shanten = 13 - c.kokushi.length
      if (c.shanten < minShanten) {
        minShanten = c.shanten
      }
      return
    }
    const mentsu: number = c.mentsu.length
    const toitsu: number = c.toitsu.length
    let tatsu: number = c.tatsu.length

    // メンツとターツ・対子のセットが6セット以上あるときはターツを削る(数値上マイナスになってもよい)
    if (mentsu + toitsu + tatsu >= 6) {
      tatsu -= (mentsu + toitsu + tatsu - 5)
    }

    let shantenCount = 8 - (mentsu + paiInfo.naki.length) * 2 - toitsu - tatsu
    // メンツとターツの組み合わせが5セットあって対子がない時は1シャンテンプラス

    const amariToitsu = toitsu === 0 ? 0 : (toitsu - 1)
    if ((mentsu + paiInfo.naki.length + tatsu + amariToitsu) >= 5) {
      shantenCount += (mentsu + paiInfo.naki.length + tatsu + amariToitsu - 4)
    }

    // 七対子の判定を
    let titoitsuShanten = 99
    if (isMenzenHantei) {
      titoitsuShanten = 6 - toitsu
      // 種類が7つ未満のときはその分だけシャンテン数を足す
      if (uniqueBase.length < 7) {
        titoitsuShanten += (7 - uniqueBase.length)
      }
    }
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
      if ((c.mentsu.length + paiInfo.naki.length) === 3 && c.toitsu.length === 1 && c.tatsu.length === 1) {
        // ターツの待ち
        // カンチャン
        if (c.tatsu[0][0].num === c.tatsu[0][1].num - 2) {
          const machiHai1: HaiInfoProp = {
            // eslint-disable-next-line
            hai: 'hai_' + String(c.tatsu[0][0].type) + '_' + String(c.tatsu[0][0].num + 1),
            type: c.tatsu[0][0].type,
            // eslint-disable-next-line
            num: c.tatsu[0][0].num + 1
          }

          shantenComplete[k].machi = [{
            haiInfo: machiHai1,
            // @todo: 点数計算
            tensu: fuyakuCalc(c, allPaiInfo, paiInfo, machiHai1, yama, jikaze, bakaze)
          }]
        }
        // 両面（ペンチャン込み)
        if (c.tatsu[0][0].num === c.tatsu[0][1].num - 1) {
          const ryomen: MachiInfoProp[] = []
          if (c.tatsu[0][0].num !== 1) {
            const machiHai2: HaiInfoProp = {
              // eslint-disable-next-line
              hai: 'hai_' + String(c.tatsu[0][0].type) + '_' + String(c.tatsu[0][0].num - 1),
              type: c.tatsu[0][0].type,
              // eslint-disable-next-line
              num: c.tatsu[0][0].num - 1
            }

            ryomen.push({
              haiInfo: machiHai2,
              // @todo: 点数計算
              tensu: fuyakuCalc(c, allPaiInfo, paiInfo, machiHai2, yama, jikaze, bakaze)
            })
          }
          if (c.tatsu[0][0].num !== 8) {
            const machiHai3: HaiInfoProp = {
              // eslint-disable-next-line
              hai: 'hai_' + String(c.tatsu[0][0].type) + '_' + String(c.tatsu[0][0].num + 2),
              type: c.tatsu[0][0].type,
              // eslint-disable-next-line
              num: c.tatsu[0][0].num + 2
            }

            ryomen.push({
              haiInfo: machiHai3,
              // @todo: 点数計算
              tensu: fuyakuCalc(c, allPaiInfo, paiInfo, machiHai3, yama, jikaze, bakaze)
            })
          }
          shantenComplete[k].machi = ryomen
        }
      }

      // シャンポン
      if ((c.mentsu.length + paiInfo.naki.length) === 3 && c.toitsu.length === 2) {
        const machiHai4: HaiInfoProp = {
          hai: 'hai_' + String(c.toitsu[0][0].type) + '_' + String(c.toitsu[0][0].num),
          type: c.toitsu[0][0].type,
          num: c.toitsu[0][0].num
        }

        const machiHai5: HaiInfoProp = {
          hai: 'hai_' + String(c.toitsu[1][0].type) + '_' + String(c.toitsu[1][0].num),
          type: c.toitsu[1][0].type,
          num: c.toitsu[1][0].num
        }

        shantenComplete[k].machi = [{
          haiInfo: machiHai4,
          // @todo: 点数計算
          tensu: fuyakuCalc(c, allPaiInfo, paiInfo, machiHai4, yama, jikaze, bakaze)
        },
        {
          haiInfo: machiHai5,
          // @todo: 点数計算
          tensu: fuyakuCalc(c, allPaiInfo, paiInfo, machiHai5, yama, jikaze, bakaze)
        }]
      }

      // 単騎/七対子
      if ((c.mentsu.length + paiInfo.naki.length) === 4 || c.toitsu.length === 6) {
        const tanki: MachiInfoProp[] = []
        c.remainHaiCountInfo.forEach((r) => {
          if (r.count === 1) {
            const machiHai6: HaiInfoProp = {
              hai: 'hai_' + String(r.type) + '_' + String(r.num),
              type: r.type,
              num: r.num
            }

            tanki.push({
              haiInfo: machiHai6,
              // @todo: 点数計算
              tensu: fuyakuCalc(c, allPaiInfo, paiInfo, machiHai6, yama, jikaze, bakaze)
            })
          }
        })
        shantenComplete[k].machi = tanki
      }

      // 国士
      if (c.kokushi.length === 13) {
        // ない牌を探す
        c.haiCountInfo.forEach((h) => {
          if ((h.type === 4 || h.num === 1 || h.type === 9) && h.count === 0) {
            const matchiHai7: HaiInfoProp = {
              hai: h.hai,
              type: h.type,
              num: h.num
            }
            c.machi.push({
              haiInfo: matchiHai7,
              // @todo: 点数計算
              tensu: fuyakuCalc(c, allPaiInfo, paiInfo, matchiHai7, yama, jikaze, bakaze)
            })
          }
        })

        // 全部あったときは13面
        if (c.machi.length === 0) {
          c.haiCountInfo.forEach((h) => {
            if ((h.type === 4 || h.num === 1 || h.type === 9)) {
              const matchiHai8: HaiInfoProp = {
                hai: h.hai,
                type: h.type,
                num: h.num
              }
              c.machi.push({
                haiInfo: matchiHai8,
                // @todo: 点数計算
                tensu: fuyakuCalc(c, allPaiInfo, paiInfo, matchiHai8, yama, jikaze, bakaze)
              })
            }
          })
        }
      }
    }
  })

  return shantenComplete
}

const groupBunseki = (group: ShantenGroupInfoProp, toitsuFlag: boolean): ShantenGroupInfoProp[] => {
  // 対子の可能性を取得(対子なしも含めて)
  const shantenCheck1: ShantenGroupInfoProp[] = []
  if (!toitsuFlag) {
    group.remainHaiCountInfo.forEach((h, k) => {
      if (h.count >= 2) {
        // 対子を除いたデータ
        const copyGroup: ShantenGroupInfoProp = JSON.parse(JSON.stringify(group))
        copyGroup.remainHaiCountInfo[k].count = copyGroup.remainHaiCountInfo[k].count - 2

        // 対子データの作成
        copyGroup.toitsu.push([
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

        // セット
        shantenCheck1.push(copyGroup)
      }
    })
  }

  const copyGroup: ShantenGroupInfoProp = JSON.parse(JSON.stringify(group))
  shantenCheck1.push(copyGroup)

  // ここからメンツがなくなるまでチェックするよー(max4回)
  const shantenCheck2 = mentsuBunseki(shantenCheck1)
  const shantenCheck3 = mentsuBunseki(shantenCheck2)
  const shantenCheck4 = mentsuBunseki(shantenCheck3)
  const shantenCheck5 = mentsuBunseki(shantenCheck4)

  // // 対子/ターツのチェック(max 7回)
  const shantenCheck21 = toitsuTatsuBunseki(shantenCheck5)
  const shantenCheck22 = toitsuTatsuBunseki(shantenCheck21)
  const shantenCheck23 = toitsuTatsuBunseki(shantenCheck22)
  const shantenCheck24 = toitsuTatsuBunseki(shantenCheck23)
  const shantenCheck25 = toitsuTatsuBunseki(shantenCheck24)
  const shantenCheck26 = toitsuTatsuBunseki(shantenCheck25)
  const shantenCheck27 = toitsuTatsuBunseki(shantenCheck26)

  return shantenCheck27
}

const mentsuBunseki = (shantenCheck1: ShantenGroupInfoProp[]): ShantenGroupInfoProp[] => {
  const shantenCheck2: ShantenGroupInfoProp[] = []
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

        const shantenAnko: ShantenGroupInfoProp = JSON.parse(JSON.stringify(c))
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

        const shantenShuntsu: ShantenGroupInfoProp = JSON.parse(JSON.stringify(c))
        shantenShuntsu.remainHaiCountInfo = copyhaiCountInfoShuntsu
        shantenShuntsu.mentsu.push(shuntsuInfo)

        // セット
        shantenCheck2.push(shantenShuntsu)
      }
    })
    // メンツがない時はそのままセットする
    if (mentsuNone) {
      const shantenSonomama: ShantenGroupInfoProp = JSON.parse(JSON.stringify(c))
      shantenCheck2.push(shantenSonomama)
    }
  })

  return shantenCheck2
}

const toitsuTatsuBunseki = (shantenCheck1: ShantenGroupInfoProp[]): ShantenGroupInfoProp[] => {
  const shantenCheck2: ShantenGroupInfoProp[] = []
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

        const shantenToitsu: ShantenGroupInfoProp = JSON.parse(JSON.stringify(c))
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

        const shantenTatsu1: ShantenGroupInfoProp = JSON.parse(JSON.stringify(c))
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

        const shantenTatsu2: ShantenGroupInfoProp = JSON.parse(JSON.stringify(c))
        shantenTatsu2.remainHaiCountInfo = copyhaiCountInfoTatsu2
        shantenTatsu2.tatsu.push(tatsu2Info)

        // セット
        shantenCheck2.push(shantenTatsu2)
      }
    })

    // メンツがない時はそのままセットする
    if (mentsuNone) {
      const shantenSonomama: ShantenGroupInfoProp = JSON.parse(JSON.stringify(c))
      shantenCheck2.push(shantenSonomama)
    }
  })

  return shantenCheck2
}
