import type { PaiProp } from '../../board/type'

export const isAddMinkanabkeList = (hai: PaiProp): string[] => {
  // 鳴きのリストからbaseに牌を持っているものを抽出
  const kanList: string[] = []
  hai.naki.forEach((n) => {
    if (n.type === 'pon') {
      hai.base.forEach((b) => {
        if (b === n.keyHai.haiInfo.hai) {
          kanList.push(b)
        }
      })
    }
  })

  return kanList
}
