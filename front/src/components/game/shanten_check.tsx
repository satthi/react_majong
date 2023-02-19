import type { AllPaiProp } from '../board/type'
import { shantenBase } from './shanten_base'

export const shantenCheck = (allPai: any, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>): void => {
  Object.keys(allPai).forEach((user) => {
    if ((allPai[user].base.length as number) + (allPai[user].naki.length as number) * 3 >= 13) {
      // 13枚/14枚時の判定
      allPai[user].shanten = shantenBase(allPai[user])
    }
  })
  setAllPai(allPai)
}
