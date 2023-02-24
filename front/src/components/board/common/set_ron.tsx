import type { AllPaiProp, UserProp } from '../type'

export const setRon = (allPai: AllPaiProp, user: UserProp, setBoardStatus: React.Dispatch<React.SetStateAction<string>>): void => {
  // 上がり状態以外はツモできない
  if (allPai[user].shantenInfo.shanten !== -1) {
    return
  }
  setBoardStatus('agari_ron_' + String(user))
}