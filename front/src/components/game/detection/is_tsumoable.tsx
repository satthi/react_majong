import type { PaiProp } from '../../board/type'

export const isTsumoable = (hai: PaiProp, boardStatus: string): boolean => {
  // @todo: 点数のチェック
  return boardStatus.match(/^agari_/) === null && hai.shantenInfo.shanten === -1
}
