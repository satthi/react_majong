import { useState } from 'react'
import { Board } from '../board'
import { getInitialYama } from '../board/hai/hai_info'
import type { AllPaiProp } from '../board/type'
import { initialSet } from './initial_set'
import { turn } from './turn'

export const Game = ({ oya }: { oya: string }): JSX.Element => {
  const userList = ['own', 'player1', 'player2', 'player3']

  const initialSortPai = {} as any

  let setSortPaiFlag = false
  userList.forEach((user) => {
    if (user === oya) {
      setSortPaiFlag = true
    }

    if (setSortPaiFlag) {
      initialSortPai[user] = {
        base: [],
        naki: [],
        sutehai: []
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
        sutehai: []
      }
    }
  })

  const [allPai, setAllPai] = useState(initialSortPai as AllPaiProp)

  // 山の設置
  const [yama, setYama] = useState(getInitialYama() as string[])

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
      turn(allPai, setAllPai, yama, setYama, boardStatus, setBoardStatus, execUser, setExecUser)
    }
  }

  return <Board allPai={allPai} setAllPai={setAllPai} boardStatus={boardStatus} setBoardStatus={setBoardStatus} yama={yama} />
}
