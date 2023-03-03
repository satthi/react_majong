import type { UserProp } from '../../board/type'

export const isAgari = (boardStatus: string, user: UserProp): boolean => {
  const agariMatch = boardStatus.match(/^agari_(tsumo|ron)_(own|player1|player2|player3)_(own|player1|player2|player3)$/)

  return agariMatch !== null && agariMatch[2] === user
}

export const isTsumoAgari = (boardStatus: string, user: UserProp): boolean => {
  const agariMatch = boardStatus.match(/^agari_tsumo_(own|player1|player2|player3)_(own|player1|player2|player3)$/)

  return agariMatch !== null && agariMatch[1] === user
}

export const isRonAgari = (boardStatus: string, user: UserProp): boolean => {
  const agariMatch = boardStatus.match(/^agari_ron_(own|player1|player2|player3)_(own|player1|player2|player3)$/)

  return agariMatch !== null && agariMatch[1] === user
}
