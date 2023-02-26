import type { PaiProp } from '../../board/type'

export const isPonable = (hai: PaiProp, sutehai: string): boolean => {
  // ポンが可能な条件は捨て牌と同じものを2つ以上持っていること
  return hai.base.filter((b) => b === sutehai).length >= 2
}
