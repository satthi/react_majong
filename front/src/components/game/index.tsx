import { useEffect, useState } from 'react'
import { Board } from '../board'
import { getInitialYama } from '../board/hai/hai_info'
import type { AllPaiProp, UserProp } from '../board/type'
import { initialSet } from './initial_set'
import { turn } from './turn'

interface GameProp {
  oya: UserProp
  ownAuto: boolean
  bakaze: number
  kyoku: number
  hon: number
  reach: number
}

interface GetElementProp {
  allPai: AllPaiProp
  setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>
  boardStatus: string
  setBoardStatus: React.Dispatch<React.SetStateAction<string>>
  yama: string[]
  setYama: React.Dispatch<React.SetStateAction<string[]>>
  bakaze: number
  kyoku: number
  hon: number
  reach: number
  setExecUser: React.Dispatch<React.SetStateAction<string>>
  ownAuto: boolean
}

const GetElement = ({ allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, kyoku, hon, reach, setExecUser, ownAuto }: GetElementProp): JSX.Element => {
  return <Board allPai={allPai} setAllPai={setAllPai} boardStatus={boardStatus} setBoardStatus={setBoardStatus} yama={yama} bakaze={bakaze} kyoku={kyoku} hon={hon} reach={reach} setYama={setYama} setExecUser={setExecUser} ownAuto={ownAuto} />
}

export const Game = ({ oya, ownAuto, bakaze, kyoku, hon, reach }: GameProp): JSX.Element => {
  const userList: UserProp[] = ['own', 'player1', 'player2', 'player3']

  const initialSortPai: AllPaiProp = {
    own: {
      base: [],
      naki: [],
      sutehai: [],
      shantenInfo: {
        shanten: 99,
        machi: [],
        mentsuGroup: []
      },
      isReach: false,
      nakiCheck: {
        ron: false,
        pon: false,
        ti1: false,
        ti2: false,
        ti3: false,
        kan: false
      },
      jikaze: 0,
      kantsumo: false
    },
    player1: {
      base: [],
      naki: [],
      sutehai: [],
      shantenInfo: {
        shanten: 99,
        machi: [],
        mentsuGroup: []
      },
      isReach: false,
      nakiCheck: {
        ron: false,
        pon: false,
        ti1: false,
        ti2: false,
        ti3: false,
        kan: false
      },
      jikaze: 0,
      kantsumo: false
    },
    player2: {
      base: [],
      naki: [],
      sutehai: [],
      shantenInfo: {
        shanten: 99,
        machi: [],
        mentsuGroup: []
      },
      isReach: false,
      nakiCheck: {
        ron: false,
        pon: false,
        ti1: false,
        ti2: false,
        ti3: false,
        kan: false
      },
      jikaze: 0,
      kantsumo: false
    },
    player3: {
      base: [],
      naki: [],
      sutehai: [],
      shantenInfo: {
        shanten: 99,
        machi: [],
        mentsuGroup: []
      },
      isReach: false,
      nakiCheck: {
        ron: false,
        pon: false,
        ti1: false,
        ti2: false,
        ti3: false,
        kan: false
      },
      jikaze: 0,
      kantsumo: false
    }
  }

  let setSortPaiFlag = false
  let jikazeCount = 0
  userList.forEach((user) => {
    if (user === oya) {
      setSortPaiFlag = true
    }

    if (setSortPaiFlag) {
      jikazeCount++
      initialSortPai[user] = {
        base: [],
        naki: [],
        sutehai: [],
        shantenInfo: {
          shanten: 99,
          machi: [],
          mentsuGroup: []
        },
        isReach: false,
        nakiCheck: {
          ron: false,
          pon: false,
          ti1: false,
          ti2: false,
          ti3: false,
          kan: false
        },
        jikaze: jikazeCount,
        kantsumo: false
      }
    }
  })
  userList.forEach((user) => {
    if (user === oya) {
      setSortPaiFlag = false
    }

    if (setSortPaiFlag) {
      jikazeCount++
      initialSortPai[user] = {
        base: [],
        naki: [],
        sutehai: [],
        shantenInfo: {
          shanten: 99,
          machi: [],
          mentsuGroup: []
        },
        isReach: false,
        nakiCheck: {
          ron: false,
          pon: false,
          ti1: false,
          ti2: false,
          ti3: false,
          kan: false
        },
        jikaze: jikazeCount,
        kantsumo: false
      }
    }
  })

  const [allPai, setAllPai] = useState(initialSortPai)

  // 山の設置
  const [yama, setYama] = useState(getInitialYama())

  const [boardStatus, setBoardStatus] = useState('initial')

  const [checkBoardStatus, setCheckBoardStatus] = useState('')

  const [execUser, setExecUser] = useState('')

  const [boardElement, setBoardElement] = useState(<GetElement allPai={allPai} setAllPai={setAllPai} boardStatus={boardStatus} setBoardStatus={setBoardStatus} yama={yama} bakaze={bakaze} kyoku={kyoku} hon={hon} reach={reach} setYama={setYama} setExecUser={setExecUser} ownAuto={ownAuto} />)
  // initial時の処理
  // 下記の自動イベントはステータスが変更されたときだけ

  // objectの変更を取得
  const allPaiJson = JSON.stringify(allPai)
  const yamaJson = JSON.stringify(yama)
  useEffect(() => {
    setBoardElement(<GetElement allPai={allPai} setAllPai={setAllPai} boardStatus={boardStatus} setBoardStatus={setBoardStatus} yama={yama} bakaze={bakaze} kyoku={kyoku} hon={hon} reach={reach} setYama={setYama} setExecUser={setExecUser} ownAuto={ownAuto} />)
  }, [allPai, setAllPai, boardStatus, setBoardStatus, yama, bakaze, kyoku, hon, reach, setYama, setExecUser, ownAuto, setBoardElement, allPaiJson, yamaJson])

  if (checkBoardStatus !== boardStatus) {
    setCheckBoardStatus(boardStatus)
    if (boardStatus === 'initial') {
      initialSet(allPai, setAllPai, yama, setYama, setBoardStatus, bakaze)
    }

    // ターン
    if (boardStatus.match(/^turn_/) !== null) {
      turn(allPai, setAllPai, yama, setYama, boardStatus, setBoardStatus, execUser, setExecUser, ownAuto, bakaze)
    }
  }

  return boardElement
}
