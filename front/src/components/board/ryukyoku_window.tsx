import type { AllPaiProp, GameMapProp, UserProp } from './type'
import style from './agari_window.module.css'
import { DoraNormal } from './common/dora_normal'
import b_1_2 from './parts/b_1_2.gif'
import b_8_2 from './parts/b_8_2.gif'

interface AgariWindowProp {
  boardStatus: string
  allPai: AllPaiProp
  bakaze: number
  yama: string[]
  kyoku: number
  hon: number
  reach: number
  gameMap: GameMapProp
}

interface TensuMoveProp {
  own: number
  player1: number
  player2: number
  player3: number
}

const getTenpaiInfo = (allPai: AllPaiProp): TensuMoveProp => {
  let tenpaiCount = 0
  const tensuMove: TensuMoveProp = {
    own: 0,
    player1: 0,
    player2: 0,
    player3: 0
  };
  (Object.keys(tensuMove) as UserProp[]).forEach((u) => {
    if (allPai[u].shantenInfo.shanten === 0) {
      tenpaiCount++
    }
  });

  (Object.keys(tensuMove) as UserProp[]).forEach((u) => {
    if (allPai[u].shantenInfo.shanten === 0) {
      if (tenpaiCount === 1) {
        tensuMove[u] = 3000
      } else if (tenpaiCount === 2) {
        tensuMove[u] = 1500
      } else if (tenpaiCount === 3) {
        tensuMove[u] = 1000
      }
    } else {
      if (tenpaiCount === 1) {
        tensuMove[u] = -1000
      } else if (tenpaiCount === 2) {
        tensuMove[u] = -1500
      } else if (tenpaiCount === 3) {
        tensuMove[u] = -3000
      }
    }
  })

  return tensuMove
}

export const RyukyokuWindow = ({ boardStatus, allPai, bakaze, yama, kyoku, hon, reach, gameMap }: AgariWindowProp): JSX.Element => {
  const tensuMoveInfo = getTenpaiInfo(allPai)

  return <div className={style.agari_window}>
    <>
      <div className={style.ba}>
        {bakaze === 1 && '東'}
        {bakaze === 2 && '南'}
        {bakaze === 3 && '西'}
        {bakaze === 4 && '北'}
        {kyoku === 1 && '一'}
        {kyoku === 2 && '二'}
        {kyoku === 3 && '三'}
        {kyoku === 4 && '四'}
        局
      </div>
      <div className={style.ie}>
        流局
      </div>
      <div className={style.honInfo}>
        <img src={b_1_2} /> × {reach}<br />
        <img src={b_8_2} /> × {hon}
      </div>
      <div className={style.doraField}>
        <DoraNormal yama={yama} allPai={allPai} />
      </div>
      <div className={style.next}>次の局</div>
      {(Object.keys(allPai) as UserProp[]).map((user, userKey) =>
        // eslint-disable-next-line
        <div className={`${style.tensuBox} ${style['tensuBoxPosition' + userKey]}`} key={userKey}>
          <div className={style.tensuName}>{user}</div>
          <div className={style.tensuHyoji}>
            {gameMap.tensu[user] + tensuMoveInfo[user]}
            {tensuMoveInfo[user] > 0 && <>(+{tensuMoveInfo[user]})</>}
            {tensuMoveInfo[user] < 0 && <>({tensuMoveInfo[user]})</>}
          </div>
        </div>
      )}
    </>
  </div>
}
