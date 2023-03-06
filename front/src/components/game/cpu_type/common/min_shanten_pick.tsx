import type { AllPaiProp, PaiProp, ShantenListProp } from '../../../board/type'
import { shantenBase } from '../../shanten_base'

export const minShantenPick = (allPai: AllPaiProp, hai: PaiProp, yama: string[], bakaze: number): ShantenListProp[] => {
  // とりあえずシャンテン数が減る方向に切ってみる
  const shantenList: ShantenListProp[] = []
  let minShanten = 99
  hai.base.forEach((_c: string, k: number) => {
    const paiInfoCopy: PaiProp = JSON.parse(JSON.stringify(hai))
    // 1個ずつずらしてみる
    paiInfoCopy.base.splice(k, 1)

    const shantenInfo = shantenBase(allPai, paiInfoCopy, yama, bakaze, hai.jikaze)
    shantenList.push({
      key: k,
      shantenInfo
    })
    if (minShanten > shantenInfo.shanten) {
      minShanten = shantenInfo.shanten
    }
  })

  return shantenList.filter((s) => {
    return s.shantenInfo.shanten === minShanten
  })
}
