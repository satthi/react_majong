import type { UserProp } from '../type'

export const getNextUser = (user: UserProp): UserProp => {
  if (user === 'own') {
    return 'player1'
  } else if (user === 'player1') {
    return 'player2'
  } else if (user === 'player2') {
    return 'player3'
  } else {
    return 'own'
  }
}
