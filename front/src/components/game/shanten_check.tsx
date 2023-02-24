import type { AllPaiProp, UserProp } from '../board/type'
import { shantenBase } from './shanten_base'

export const shantenCheck = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, bakaze: number, user: UserProp): void => {
  // eslint-disable-next-line
  if ((allPai[user].base.length as number) + (allPai[user].naki.length as number) * 3 >= 13) {
    // 13枚/14枚時の判定
    allPai[user].shantenInfo = shantenBase(allPai[user], bakaze, allPai[user].jikaze)
  }
  setAllPai(allPai)
}
