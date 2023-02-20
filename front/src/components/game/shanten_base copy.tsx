import type { PaiProp } from '../board/type'

export const shantenBase = (paiInfo: PaiProp): number => {
  // 国士無双
  const kokushi = shantenKokushi(paiInfo)
  // 七対子
  const titoitsu = shantenTitoitsu(paiInfo)
  // メンツ
  const mentsu = shantenMentsu(paiInfo)
  return Math.min(kokushi, titoitsu, mentsu)
}

const shantenKokushi = (paiInfo: PaiProp): number => {
  // 鳴きが存在するときは判定なし
  if (paiInfo.naki.length > 0) {
    return 99
  }

  // 国士は下記牌を一つずつ＋何か一つは二つ
  const kokushiList = [
    {
      hai: 'hai_1_1',
      count: 0
    },
    {
      hai: 'hai_1_9',
      count: 0
    },
    {
      hai: 'hai_2_1',
      count: 0
    },
    {
      hai: 'hai_2_9',
      count: 0
    },
    {
      hai: 'hai_3_1',
      count: 0
    },
    {
      hai: 'hai_3_9',
      count: 0
    },
    {
      hai: 'hai_4_1',
      count: 0
    },
    {
      hai: 'hai_4_2',
      count: 0
    },
    {
      hai: 'hai_4_3',
      count: 0
    },
    {
      hai: 'hai_4_4',
      count: 0
    },
    {
      hai: 'hai_4_5',
      count: 0
    },
    {
      hai: 'hai_4_6',
      count: 0
    },
    {
      hai: 'hai_4_7',
      count: 0
    }
  ]

  paiInfo.base.forEach((pai) => {
    const kokushuIndex = kokushiList.findIndex((listHai) => pai === listHai.hai)
    if (kokushuIndex !== -1) {
      kokushiList[kokushuIndex].count++
    }
  })

  let count1 = 0
  let count2 = 0
  kokushiList.forEach((kokushiListParts) => {
    if (kokushiListParts.count >= 1) {
      count1++
    }
    if (kokushiListParts.count >= 2) {
      count2++
    }
  })

  // 2セット以上は必要ないので補正
  if (count2 > 0) {
    count2 = 1
  }

  console.log(count1)
  console.log(count2)

  return 13 - count1 - count2
}

const shantenTitoitsu = (paiInfo: PaiProp): number => {
  // 鳴きが存在するときは判定なし
  if (paiInfo.naki.length > 0) {
    return 99
  }

  const haiCountInfo = [
    {
      hai: 'hai_1_1',
      count: 0
    },
    {
      hai: 'hai_1_2',
      count: 0
    },
    {
      hai: 'hai_1_3',
      count: 0
    },
    {
      hai: 'hai_1_4',
      count: 0
    },
    {
      hai: 'hai_1_5',
      count: 0
    },
    {
      hai: 'hai_1_6',
      count: 0
    },
    {
      hai: 'hai_1_7',
      count: 0
    },
    {
      hai: 'hai_1_8',
      count: 0
    },
    {
      hai: 'hai_1_9',
      count: 0
    },
    {
      hai: 'hai_2_1',
      count: 0
    },
    {
      hai: 'hai_2_2',
      count: 0
    },
    {
      hai: 'hai_2_3',
      count: 0
    },
    {
      hai: 'hai_2_4',
      count: 0
    },
    {
      hai: 'hai_2_5',
      count: 0
    },
    {
      hai: 'hai_2_6',
      count: 0
    },
    {
      hai: 'hai_2_7',
      count: 0
    },
    {
      hai: 'hai_2_8',
      count: 0
    },
    {
      hai: 'hai_2_9',
      count: 0
    },
    {
      hai: 'hai_3_1',
      count: 0
    },
    {
      hai: 'hai_3_2',
      count: 0
    },
    {
      hai: 'hai_3_3',
      count: 0
    },
    {
      hai: 'hai_3_4',
      count: 0
    },
    {
      hai: 'hai_3_5',
      count: 0
    },
    {
      hai: 'hai_3_6',
      count: 0
    },
    {
      hai: 'hai_3_7',
      count: 0
    },
    {
      hai: 'hai_3_8',
      count: 0
    },
    {
      hai: 'hai_3_9',
      count: 0
    },
    {
      hai: 'hai_4_1',
      count: 0
    },
    {
      hai: 'hai_4_2',
      count: 0
    },
    {
      hai: 'hai_4_3',
      count: 0
    },
    {
      hai: 'hai_4_4',
      count: 0
    },
    {
      hai: 'hai_4_5',
      count: 0
    },
    {
      hai: 'hai_4_6',
      count: 0
    },
    {
      hai: 'hai_4_7',
      count: 0
    }
  ]

  paiInfo.base.forEach((pai) => {
    const kokushuIndex = haiCountInfo.findIndex((listHai) => pai === listHai.hai)
    if (kokushuIndex !== -1) {
      haiCountInfo[kokushuIndex].count++
    }
  })

  let count2 = 0
  haiCountInfo.forEach((haiCountInfoParts) => {
    if (haiCountInfoParts.count >= 2) {
      count2++
    }
  })

  return 6 - count2
}

const shantenMentsu = (paiInfo: PaiProp): number => {
  // 鳴いてる数はメンツとしてカウント

  const haiCountInfo = [
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
  
  console.log(paiInfo);

  // 属性ごとに切り分け
  const manzuList: any[] = []
  const pinzuList: any[] = []
  const souzuList: any[] = []
  const jihaiList: any[] = []
  haiCountInfo.forEach((c) => {
    if (c.type === 1) {
      manzuList.push(c)
    }
    if (c.type === 2) {
      pinzuList.push(c)
    }
    if (c.type === 3) {
      souzuList.push(c)
    }
    if (c.type === 4) {
      jihaiList.push(c)
    }
  })

  const manzuBunseki = mentsuBunseki(manzuList, 1)
  const pinzuBunseki = mentsuBunseki(pinzuList, 2)
  const souzuBunseki = mentsuBunseki(souzuList, 3)
  const jihaiBunseki = mentsuBunseki(jihaiList, 4)

  const mentsuCount = {
    anko: manzuBunseki.anko + pinzuBunseki.anko + souzuBunseki.anko + jihaiBunseki.anko,
    shuntsu: manzuBunseki.shuntsu + pinzuBunseki.shuntsu + souzuBunseki.shuntsu + jihaiBunseki.shuntsu,
    toitsu: manzuBunseki.toitsu + pinzuBunseki.toitsu + souzuBunseki.toitsu + jihaiBunseki.toitsu,
    tatsu: manzuBunseki.tatsu + pinzuBunseki.tatsu + souzuBunseki.tatsu + jihaiBunseki.tatsu
  }

  // メンツとターツ・対子のセットが6セット以上あるときはターツ・対子の順に数を削る
  if (mentsuCount.anko + mentsuCount.shuntsu + mentsuCount.toitsu + mentsuCount.tatsu >= 6) {
    mentsuCount.tatsu -= (mentsuCount.anko + mentsuCount.shuntsu + mentsuCount.toitsu + mentsuCount.tatsu - 5)
  }

  let shantenCount = 8 - mentsuCount.anko * 2 - mentsuCount.shuntsu * 2 - mentsuCount.toitsu - mentsuCount.tatsu
  // メンツとターツの組み合わせが5セットあって対子がない時は1シャンテンプラス
  if ((mentsuCount.anko + mentsuCount.shuntsu + mentsuCount.tatsu) === 5 && mentsuCount.toitsu === 0) {
    shantenCount += 1
  }

  if (mentsuCount.anko + mentsuCount.shuntsu + mentsuCount.toitsu + mentsuCount.tatsu > 5) {
    shantenCount += (mentsuCount.anko + mentsuCount.shuntsu + mentsuCount.toitsu + mentsuCount.tatsu - 5)
  }

  return shantenCount
}

const mentsuBunseki = (list: any[], type: number): { anko: number, shuntsu: number, toitsu: number, tatsu: number } => {
  const mentsuCount = {
    anko: 0,
    shuntsu: 0,
    toitsu: 0,
    tatsu: 0
  }

  // 字牌はワンパターンでOK
  if (type === 4) {
    list.forEach((l) => {
      if (l.count >= 3) {
        mentsuCount.anko++
      } else if (l.count === 2) {
        mentsuCount.toitsu++
      }
    })

    return mentsuCount
  } else {
    // それ以外は順子の場所を探り探りやる
    // 順子を取りえる場所をまずは探す
    const shuntsuMentsuCalc: any[] = []
    list.forEach((l, k) => {
      if (l.num <= 7 && l.count > 0 && list[k + 1].count > 0 && list[k + 2].count > 0) {
        // const copyList = [...list]
        const copyList = JSON.parse(JSON.stringify(list)) //  値渡し
        copyList[k].count -= 1
        copyList[k + 1].count -= 1
        copyList[k + 2].count -= 1

        // 順子が+1
        const checkMentsuCount = mentsuBunseki(copyList, type)
        checkMentsuCount.shuntsu = checkMentsuCount.shuntsu + 1

        shuntsuMentsuCalc.push(checkMentsuCount)
      }
    })

    const shantenPointList: any[] = []
    if (shuntsuMentsuCalc.length > 0) {
      // シャンテンが小さくなるものを設定する
      shuntsuMentsuCalc.forEach((shuntsuMentsuCalcParts, k) => {
        shantenPointList.push({
          key: k,
          // 基本暗刻と順子中心に対子と順子の数 で、対子がいるかどうかが＋要素としてあり
          shantenPoint: (shuntsuMentsuCalcParts.anko as number) * 100 + (shuntsuMentsuCalcParts.shuntsu as number) * 100 + (shuntsuMentsuCalcParts.toitsu as number) * 10 + (shuntsuMentsuCalcParts.tatsu as number) * 10 + Number(shuntsuMentsuCalcParts.toitsu > 0)
        })
      })

      const shantenPointListMaxCheck = shantenPointList.map(function (p) {
        return p.shantenPoint
      })
      const maxValue = Math.max.apply(null, shantenPointListMaxCheck)
      const maxKey = shantenPointList.findIndex((c) => c.shantenPoint === maxValue)

      return shuntsuMentsuCalc[maxKey]
    }

    const copyList2: any[] = JSON.parse(JSON.stringify(list)) //  値渡し

    // 暗刻・対子・ターツの順に探す
    copyList2.forEach((l, k) => {
      if (l.count >= 3) {
        mentsuCount.anko++
        copyList2[k].count -= 3
      } else if (l.count === 2) {
        mentsuCount.toitsu++
        copyList2[k].count -= 2
      }
    })

    // ターツ
    copyList2.forEach((l, k) => {
      if (l.num <= 8 && l.count > 0 && copyList2[k + 1].count > 0) {
        mentsuCount.tatsu++
        copyList2[k].count -= 1
        copyList2[k + 1].count -= 1
      } else if (l.num <= 7 && l.count > 0 && copyList2[k + 2].count > 0) {
        mentsuCount.tatsu++
        copyList2[k].count -= 1
        copyList2[k + 2].count -= 1
      }
    })
  }

  return mentsuCount
}
