import type { PaiProp } from '../../board/type'

export const isRonable = (hai: PaiProp, sutehai: string): boolean => {
  // ロンが可能な条件は
  // テンパイしていること
  if (hai.shantenInfo.shanten !== 0) {
    return false
  }

  // 待ち牌が存在すること
  // フリテンでないこと
  let machiExists = false
  let furitenCheck = false
  hai.shantenInfo.machi.forEach((m) => {
    if (m.haiInfo.hai === sutehai && (m.tensu.ron.han !== 0 || m.tensu.ron.yakuman !== 0)) {
      // 役があることも大事
      machiExists = true
      hai.sutehai.forEach((s) => {
        if (s.hai === m.haiInfo.hai) {
          furitenCheck = true
        }
      })
    }
  })
  if (!machiExists || furitenCheck) {
    return false
  }

  return true
}
