import type { PaiProp } from '../../board/type'
import { isMemzen } from './is_menzen'

export const isReachable = (pai: PaiProp): boolean => {
  // リーチ可能な条件は
  // リーチしていないこと
  // 面前であること
  // テンパイしていること
  // ツモ順であること

  return pai.isReach === false &&
    isMemzen(pai) &&
    pai.shantenInfo.shanten <= 0 &&
    pai.base.length % 3 === 2
}
