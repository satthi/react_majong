import type { AllPaiProp, GameMapProp, UserProp } from './type'
import style from './agari_window.module.css'
import { DoraNormal } from './common/dora_normal'
import b_1_2 from './parts/b_1_2.gif'
import b_8_2 from './parts/b_8_2.gif'
import { getNextUser } from './common/next_user'

interface AgariWindowProp {
  allPai: AllPaiProp
  bakaze: number
  yama: string[]
  kyoku: number
  hon: number
  reach: number
  gameMap: GameMapProp
  setBoardStatus: React.Dispatch<React.SetStateAction<string>>
  setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>
  setIsInitialExec: React.Dispatch<React.SetStateAction<boolean>>
  setGameEndDisplay: React.Dispatch<React.SetStateAction<boolean>>
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

const execNextGame = (allPai: AllPaiProp, tensuMoveInfo: TensuMoveProp, gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setIsInitialExec: React.Dispatch<React.SetStateAction<boolean>>, setGameEndDisplay: React.Dispatch<React.SetStateAction<boolean>>): void => {
  // ???????????????
  gameMap.tensu.own = gameMap.tensu.own + tensuMoveInfo.own
  gameMap.tensu.player1 = gameMap.tensu.player1 + tensuMoveInfo.player1
  gameMap.tensu.player2 = gameMap.tensu.player2 + tensuMoveInfo.player2
  gameMap.tensu.player3 = gameMap.tensu.player3 + tensuMoveInfo.player3

  // ?????????????????????????????????????????????????????????
  if (allPai[gameMap.oya].shantenInfo.shanten !== 0) {
    // ?????????????????????????????????????????????????????????
    // ?????????????????????????????????????????????
    if (gameMap.kyoku !== 4) {
      gameMap.kyoku += 1
      gameMap.oya = getNextUser(gameMap.oya)
    } else {
      if (gameMap.bakaze === 2) {
        // ???????????????????????????
        // ???????????????????????????
        setGameMap(gameMap)
        setGameEndDisplay(true)
        setBoardStatus('end')
        return
      } else {
        gameMap.bakaze += 1
        gameMap.kyoku = 1
        gameMap.oya = getNextUser(gameMap.oya)
      }
    }
  }
  // ?????????1?????????
  gameMap.hon += 1

  setGameMap(gameMap)

  setIsInitialExec(false)
  setBoardStatus('initial')
}

export const RyukyokuWindow = ({ allPai, bakaze, yama, kyoku, hon, reach, gameMap, setGameMap, setBoardStatus, setIsInitialExec, setGameEndDisplay }: AgariWindowProp): JSX.Element => {
  const tensuMoveInfo = getTenpaiInfo(allPai)

  return <div className={style.agari_window}>
    <>
      <div className={style.ba}>
        {bakaze === 1 && '???'}
        {bakaze === 2 && '???'}
        {bakaze === 3 && '???'}
        {bakaze === 4 && '???'}
        {kyoku === 1 && '???'}
        {kyoku === 2 && '???'}
        {kyoku === 3 && '???'}
        {kyoku === 4 && '???'}
        ???
      </div>
      <div className={style.ie}>
        ??????
      </div>
      <div className={style.honInfo}>
        <img src={b_1_2} /> ?? {reach}<br />
        <img src={b_8_2} /> ?? {hon}
      </div>
      <div className={style.doraField}>
        <DoraNormal yama={yama} allPai={allPai} />
      </div>
      {/* eslint-disable-next-line */}
      <div className={style.next} onClick={() => execNextGame(allPai, tensuMoveInfo, gameMap, setGameMap, setBoardStatus, setIsInitialExec, setGameEndDisplay)}>?????????</div>
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
