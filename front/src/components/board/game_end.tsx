import type { GameMapProp, UserProp } from './type'
import style from './agari_window.module.css'

interface GameEndProp {
  gameMap: GameMapProp
}

const positionSort = (user: string, lastOyaUser: string): number => {
  const userList: UserProp[] = ['own', 'player1', 'player2', 'player3']
  const chichaUserList: UserProp[] = []
  let userSetFlag = false
  userList.forEach((u) => {
    if (u === lastOyaUser) {
      userSetFlag = true
    } else {
      if (userSetFlag) {
        chichaUserList.push(u)
      }
    }
  })
  userList.forEach((u) => {
    if (userSetFlag) {
      chichaUserList.push(u)
    }
    if (u === lastOyaUser) {
      userSetFlag = false
    }
  })

  return userList.findIndex((u) => u === user)
}

export const GameEnd = ({ gameMap }: GameEndProp): JSX.Element => {
  // 最後の親の次の人がトンパツ
  let pointData = [
    {
      name: 'own',
      point: gameMap.tensu.own,
      sort: positionSort('own', gameMap.oya)
    },
    {
      name: 'player1',
      point: gameMap.tensu.player1,
      sort: positionSort('own', gameMap.oya)
    },
    {
      name: 'player2',
      point: gameMap.tensu.player2,
      sort: positionSort('own', gameMap.oya)
    },
    {
      name: 'player3',
      point: gameMap.tensu.player3,
      sort: positionSort('own', gameMap.oya)
    }
  ]
  pointData = pointData.sort((a, b) => {
    if (a.point === b.point) {
      return (a.sort < b.sort) ? 1 : -1
    }
    return (a.point < b.point) ? 1 : -1
  })
  console.log(pointData)

  return <div className={style.agari_window}>
    <>
      <div className={style.ba}>
        終局
      </div>
      <div className={`${style.tensuBox} ${style.tensuBoxPosition0}`}>
        <div className={style.tensuName}>[1位]{pointData[0].name}</div>
        <div className={style.tensuHyoji}>{pointData[0].point}</div>
      </div>
      <div className={`${style.tensuBox} ${style.tensuBoxPosition1}`}>
        <div className={style.tensuName}>[2位]{pointData[1].name}</div>
        <div className={style.tensuHyoji}>{pointData[1].point}</div>
      </div>
      <div className={`${style.tensuBox} ${style.tensuBoxPosition2}`}>
        <div className={style.tensuName}>[3位]{pointData[2].name}</div>
        <div className={style.tensuHyoji}>{pointData[2].point}</div>
      </div>
      <div className={`${style.tensuBox} ${style.tensuBoxPosition3}`}>
        <div className={style.tensuName}>[4位]{pointData[3].name}</div>
        <div className={style.tensuHyoji}>{pointData[3].point}</div>
      </div>
    </>
  </div>
}
