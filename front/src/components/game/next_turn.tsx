import type { AllPaiProp, UserProp } from '../board/type'

export const nextTurn = (allPai: AllPaiProp, user: UserProp, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[]): void => {
  const userKey = (Object.keys(allPai) as UserProp[]).findIndex((e) => e === user)
  let nextKey = userKey + 1
  if (typeof Object.keys(allPai)[nextKey] === 'undefined') {
    nextKey = 0
  }

  // 次のターンに進む前にロンフラグなどはすべてリセットする
  allPai.own.nakiCheck.ron = false
  allPai.own.nakiCheck.pon = false
  allPai.own.nakiCheck.ti1 = false
  allPai.own.nakiCheck.ti2 = false
  allPai.own.nakiCheck.ti3 = false
  allPai.own.nakiCheck.kan = false
  allPai.player1.nakiCheck.ron = false
  allPai.player1.nakiCheck.pon = false
  allPai.player1.nakiCheck.ti1 = false
  allPai.player1.nakiCheck.ti2 = false
  allPai.player1.nakiCheck.ti3 = false
  allPai.player1.nakiCheck.kan = false
  allPai.player2.nakiCheck.ron = false
  allPai.player2.nakiCheck.pon = false
  allPai.player2.nakiCheck.ti1 = false
  allPai.player2.nakiCheck.ti2 = false
  allPai.player2.nakiCheck.ti3 = false
  allPai.player2.nakiCheck.kan = false
  allPai.player3.nakiCheck.ron = false
  allPai.player3.nakiCheck.pon = false
  allPai.player3.nakiCheck.ti1 = false
  allPai.player3.nakiCheck.ti2 = false
  allPai.player3.nakiCheck.ti3 = false
  allPai.player3.nakiCheck.kan = false

  // 次の人にターンを回す
  setTimeout(() => {
    if (yama.length > 14) {
      const turnUserMatch = boardStatus.match(/^turn_(own|player1|player2|player3)_([0-9])+$/)
      if (turnUserMatch === null) {
        setBoardStatus('turn_' + Object.keys(allPai)[nextKey] + '_1')
      } else {
        // 鳴いたときは別ターン扱いしてみる。うまくいくかな？
        setBoardStatus('turn_' + Object.keys(allPai)[nextKey] + '_' + String(Number(turnUserMatch[2]) + 1))
      }
    } else {
      // 14マイに到達したら流局
      setBoardStatus('ryukyoku')
    }
  }, 500)
}
