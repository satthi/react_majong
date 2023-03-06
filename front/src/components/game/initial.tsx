import { useState } from 'react'
import type { GameMapProp, UserProp } from '../board/type'
import style from './initial.module.css'

interface InitialProp {
  setting: boolean
  setSetting: React.Dispatch<React.SetStateAction<boolean>>
  gameMap: GameMapProp
  setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>
}

const ownAuto = (gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>, ownAuto: boolean, changeCount: number, setChangeCount: React.Dispatch<React.SetStateAction<number>>): void => {
  gameMap.ownAuto = ownAuto
  setGameMap(gameMap)
  setChangeCount(changeCount + 1)
}

const setCpuType = (gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>, user: UserProp, type: number, changeCount: number, setChangeCount: React.Dispatch<React.SetStateAction<number>>): void => {
  gameMap.cpuType[user] = type
  setGameMap(gameMap)
  setChangeCount(changeCount + 1)
}

const execStart = (gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>, setSetting: React.Dispatch<React.SetStateAction<boolean>>): void => {
  // 起家をランダムで設定
  const userList: UserProp[] = [
    'own',
    'player1',
    'player2',
    'player3'
  ]
  gameMap.oya = shuffle(userList)[0]
  setGameMap(gameMap)

  setSetting(true)
}

export const Initial = ({ setting, setSetting, gameMap, setGameMap }: InitialProp): JSX.Element => {
  // @todo: どこかに外だし？
  const cpuTypeMap = [
    1,
    2,
    3
  ]
  // 画面を再描画させるための変数
  const [changeCount, setChangeCount] = useState(0)
  return <div className={style.initialBoard}>
    <div>
      <div className={style.ownPlayType}>
        <div className={`${style.buttonTitle}`}>自操作</div>
        {/* eslint-disable-next-line */}
        <div className={`${style.button} ${gameMap.ownAuto === false ? style.buttonOn : style.buttonOff}`} onClick={() => ownAuto(gameMap, setGameMap, false, changeCount, setChangeCount)}>する</div>
        {/* eslint-disable-next-line */}
        <div className={`${style.button} ${gameMap.ownAuto === true ? style.buttonOn : style.buttonOff}`} onClick={() => ownAuto(gameMap, setGameMap, true, changeCount, setChangeCount)}>しない</div>
      </div>
      <div className={style.ownCpuHead}>
        <div className={`${style.buttonTitle}`}>CPU type</div>
      </div>
      <div className={style.ownCpuType}>
        <div className={`${style.buttonTitle}`}>own</div>
        {cpuTypeMap.map((cpuType) => {
          // eslint-disable-next-line
          return <div className={ `${style.button} ${(gameMap.cpuType.own === cpuType && gameMap.ownAuto === true) ? style.buttonOn : style.buttonOff}` } onClick={() => setCpuType(gameMap, setGameMap, 'own', cpuType, changeCount, setChangeCount)}>{cpuType}</div>
        })}
      </div>
      <div className={style.player1CpuType}>
        <div className={`${style.buttonTitle}`}>player1</div>
        {cpuTypeMap.map((cpuType) => {
          // eslint-disable-next-line
          return <div className={ `${style.button} ${gameMap.cpuType.player1 === cpuType ? style.buttonOn : style.buttonOff}` } onClick={() => setCpuType(gameMap, setGameMap, 'player1', cpuType, changeCount, setChangeCount)}>{cpuType}</div>
        })}
      </div>
      <div className={style.player2CpuType}>
        <div className={`${style.buttonTitle}`}>player2</div>
        {cpuTypeMap.map((cpuType) => {
          // eslint-disable-next-line
          return <div className={ `${style.button} ${gameMap.cpuType.player2 === cpuType ? style.buttonOn : style.buttonOff}` } onClick={() => setCpuType(gameMap, setGameMap, 'player2', cpuType, changeCount, setChangeCount)}>{cpuType}</div>
        })}
      </div>
      <div className={style.player3CpuType}>
        <div className={`${style.buttonTitle}`}>player3</div>
        {cpuTypeMap.map((cpuType) => {
          // eslint-disable-next-line
          return <div className={ `${style.button} ${gameMap.cpuType.player3 === cpuType ? style.buttonOn : style.buttonOff}` } onClick={() => setCpuType(gameMap, setGameMap, 'player3', cpuType, changeCount, setChangeCount)}>{cpuType}</div>
        })}
      </div>
    </div>
    {/* eslint-disable-next-line */}
    <div className={style.startButton} onClick={() => execStart(gameMap, setGameMap, setSetting)}>対局開始</div>
  </div>
}

const shuffle = ([...array]): UserProp[] => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
