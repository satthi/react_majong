import { useState } from 'react'
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
        ti: false,
        kan: false
      },
      jikaze: 0
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
        ti: false,
        kan: false
      },
      jikaze: 0
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
        ti: false,
        kan: false
      },
      jikaze: 0
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
        ti: false,
        kan: false
      },
      jikaze: 0
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
          ti: false,
          kan: false
        },
        jikaze: jikazeCount
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
          ti: false,
          kan: false
        },
        jikaze: jikazeCount
      }
    }
  })

  const [allPai, setAllPai] = useState(initialSortPai)

  // 山の設置
  const [yama, setYama] = useState(getInitialYama())

  const [boardStatus, setBoardStatus] = useState('initial')

  const [checkBoardStatus, setCheckBoardStatus] = useState('')

  const [execUser, setExecUser] = useState('')

  // initial時の処理
  // 下記の自動イベントはステータスが変更されたときだけ

  if (checkBoardStatus !== boardStatus) {
    setCheckBoardStatus(boardStatus)
    if (boardStatus === 'initial') {
      initialSet(allPai, setAllPai, yama, setYama, setBoardStatus, setExecUser)
    }

    // ターン
    if (boardStatus.match(/^turn_/) !== null) {
      turn(allPai, setAllPai, yama, setYama, boardStatus, setBoardStatus, execUser, setExecUser, ownAuto, bakaze)
    }

    // シャンテン判定(ひとまず全員分)
    // shantenCheck(allPai, setAllPai, bakaze)
  }

  return <Board allPai={allPai} setAllPai={setAllPai} boardStatus={boardStatus} setBoardStatus={setBoardStatus} yama={yama} bakaze={bakaze} kyoku={kyoku} hon={hon} reach={reach} />
}
