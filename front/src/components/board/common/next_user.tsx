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

export const getUserTurn = (oya: UserProp): UserProp[] => {
  if (oya === 'own') {
    return [
      'own',
      'player1',
      'player2',
      'player3'
    ]
  } else if (oya === 'player1') {
    return [
      'player1',
      'player2',
      'player3',
      'own'
    ]
  } else if (oya === 'player2') {
    return [
      'player2',
      'player3',
      'own',
      'player1'
    ]
  } else {
    return [
      'player3',
      'own',
      'player1',
      'player2'
    ]
  }
}
