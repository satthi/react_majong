import type { PaiProp } from '../../board/type'
import { isMemzen } from './is_menzen'

export const isReachable = (pai: PaiProp, boardStatus: string): boolean => {
  // リーチ可能な条件は
  // リーチしていないこと
  // 面前であること
  // テンパイしていること
  // ツモ順であること
  // すでに誰かが上がっていないこと

  // eslint-disable-next-line
  return !pai.isReach &&
    isMemzen(pai) &&
    pai.shantenInfo.shanten <= 0 &&
    pai.base.length % 3 === 2 &&
    boardStatus.match(/^agari_/) === null
}
