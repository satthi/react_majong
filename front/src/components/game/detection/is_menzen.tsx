import type { PaiProp } from '../../board/type'

export const isMemzen = (pai: PaiProp): boolean => {
  let nakiCheck = false
  pai.naki.forEach((n) => {
    if (n.type !== 'ankan') {
      nakiCheck = true
    }
  })

  return !nakiCheck
}
