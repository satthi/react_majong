import type { PaiProp } from '../../board/type'

export const isMinkanable = (hai: PaiProp, sutehai: string): boolean => {
  // ポンが可能な条件は捨て牌と同じものを3つ以上持っていること
  return hai.base.filter((b) => b === sutehai).length >= 3
}
