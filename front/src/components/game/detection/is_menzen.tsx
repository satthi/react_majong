import type { PaiProp } from '../../board/type'

export const isMemzen = (pai: PaiProp): boolean => {
  pai.naki.forEach((n) => {
    if (n.type !== 'ankan') {
      return false
    }
  })

  return true
}
