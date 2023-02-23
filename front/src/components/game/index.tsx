import { useState } from 'react'
import { Board } from '../board'
import { getInitialYama } from '../board/hai/hai_info'
import type { AllPaiProp, UserProp } from '../board/type'
import { initialSet } from './initial_set'
import { turn } from './turn'
import { shantenCheck } from './shanten_check'

export const Game = ({ oya, ownAuto }: { oya: UserProp, ownAuto: boolean }): JSX.Element => {
  const userList: UserProp[] = ['own', 'player1', 'player2', 'player3']

  const initialSortPai: AllPaiProp = {
    own: {
      base: [],
      naki: [],
      sutehai: [],
      shanten: {
        shanten: 99,
        machi: [],
        mentsuGroup: []
      }
    },
    player1: {
      base: [],
      naki: [],
      sutehai: [],
      shanten: {
        shanten: 99,
        machi: [],
        mentsuGroup: []
      }
    },
    player2: {
      base: [],
      naki: [],
      sutehai: [],
      shanten: {
        shanten: 99,
        machi: [],
        mentsuGroup: []
      }
    },
    player3: {
      base: [],
      naki: [],
      sutehai: [],
      shanten: {
        shanten: 99,
        machi: [],
        mentsuGroup: []
      }
    }
  }

  let setSortPaiFlag = false
  userList.forEach((user) => {
    if (user === oya) {
      setSortPaiFlag = true
    }

    if (setSortPaiFlag) {
      initialSortPai[user] = {
        base: [],
        naki: [],
        sutehai: [],
        shanten: {
          shanten: 99,
          machi: [],
          mentsuGroup: []
        }
      }
    }
  })
  userList.forEach((user) => {
    if (user === oya) {
      setSortPaiFlag = false
    }

    if (setSortPaiFlag) {
      initialSortPai[user] = {
        base: [],
        naki: [],
        sutehai: [],
        shanten: {
          shanten: 99,
          machi: [],
          mentsuGroup: []
        }
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
      turn(allPai, setAllPai, yama, setYama, boardStatus, setBoardStatus, execUser, setExecUser, ownAuto)
    }

    // シャンテン判定(ひとまず全員分)
    shantenCheck(allPai, setAllPai)
  }

  return <Board allPai={allPai} setAllPai={setAllPai} boardStatus={boardStatus} setBoardStatus={setBoardStatus} yama={yama} />
}
