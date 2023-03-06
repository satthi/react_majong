import type { AllPaiProp, UserProp } from '../../../board/type'

export const naki = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, checkUser: UserProp): void => {
  // ロンは無条件で実行する
  // 鳴きはしない
  if (allPai[checkUser].nakiCheck.ron) {
    allPai[checkUser].nakiCheck.pon = false
    allPai[checkUser].nakiCheck.ti1 = false
    allPai[checkUser].nakiCheck.ti2 = false
    allPai[checkUser].nakiCheck.ti3 = false
    allPai[checkUser].nakiCheck.kan = false
  } else {
    allPai[checkUser].nakiCheck.ron = false
    allPai[checkUser].nakiCheck.pon = false
    allPai[checkUser].nakiCheck.ti1 = false
    allPai[checkUser].nakiCheck.ti2 = false
    allPai[checkUser].nakiCheck.ti3 = false
    allPai[checkUser].nakiCheck.kan = false
  }
  setAllPai(allPai)
}
