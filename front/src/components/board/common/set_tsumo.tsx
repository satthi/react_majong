import type { AllPaiProp, UserProp } from '../type'

export const setTsumo = (allPai: AllPaiProp, user: UserProp, setBoardStatus: React.Dispatch<React.SetStateAction<string>>): void => {
  // 上がり状態以外はツモできない
  if (allPai[user].shantenInfo.shanten !== -1) {
    return
  }
  // 使わないけどロンに合わせてツモをセットする
  setBoardStatus('agari_tsumo_' + String(user) + '_' + String(user))
}
