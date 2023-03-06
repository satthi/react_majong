import type { PaiProp, SuteType } from '../../../board/type'
import { isReachable } from '../../detection/is_reachable'

export const tenpaiSokuReach = (hai: PaiProp, boardStatus: string): SuteType => {
  return isReachable(hai, boardStatus) ? 'reach' : 'normal'
}
