import type { AllPaiProp, UserProp } from '../board/type'

export const nextTurn = (allPai: AllPaiProp, user: UserProp, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[]): void => {
  const userKey = (Object.keys(allPai) as UserProp[]).findIndex((e) => e === user)
  let nextKey = userKey + 1
  if (typeof Object.keys(allPai)[nextKey] === 'undefined') {
    nextKey = 0
  }

  // 次のターンに進む前にロンフラグなどはすべてリセットする
  allPai.own.nakiCheck.ron = false
  allPai.own.nakiCheck.pon = false
  allPai.own.nakiCheck.ti = false
  allPai.own.nakiCheck.kan = false
  allPai.player1.nakiCheck.ron = false
  allPai.player1.nakiCheck.pon = false
  allPai.player1.nakiCheck.ti = false
  allPai.player1.nakiCheck.kan = false
  allPai.player2.nakiCheck.ron = false
  allPai.player2.nakiCheck.pon = false
  allPai.player2.nakiCheck.ti = false
  allPai.player2.nakiCheck.kan = false
  allPai.player3.nakiCheck.ron = false
  allPai.player3.nakiCheck.pon = false
  allPai.player3.nakiCheck.ti = false
  allPai.player3.nakiCheck.kan = false

  // 次の人にターンを回す
  setTimeout(() => {
    if (yama.length > 14) {
      setBoardStatus('turn_' + Object.keys(allPai)[nextKey])
    } else {
      // 14マイに到達したら流局
      setBoardStatus('ryukyoku')
    }
  }, 500)
}
