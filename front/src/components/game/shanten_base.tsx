import type { PaiProp } from '../board/type'

export const shantenBase = (paiInfo: PaiProp): number => {
  // 国士無双
  const kokushi = shantenKokushi(paiInfo)
  // 七対子
  const titoitsu = shantenKokushi(paiInfo)
  // メンツ
  const mentsu = shantenKokushi(paiInfo)
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
