import { useState } from 'react'
import { Board } from '../board'
import { getInitialYama } from '../board/hai/hai_info'
import type { AllPaiProp } from '../board/type'

export const initialSet = (allPai: any, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>): void => {
  // とりあえず4枚ずつ配布

  for (let i = 1; i <= 3; i += 1) {
    Object.keys(allPai).forEach((user: string) => {
      // 4マイずつ配布
      const catYama = yama.splice(0, 4)
      setYama(yama)

      allPai[user].base = allPai[user].base.concat(catYama)
      setAllPai(allPai)
    })
  }

  // 1枚ずつ配布
  Object.keys(allPai).forEach((user: string) => {
    const catYama = yama.splice(0, 1)
    setYama(yama)

    // 1枚もらってから配列をソート
    allPai[user].base = allPai[user].base.concat(catYama).sort()
    setAllPai(allPai)
  })

  setTimeout(() => {
    // setExecUser(Object.keys(allPai)[0])
    setBoardStatus('turn_' + Object.keys(allPai)[0])
  }, 500)
}

export const turn = (allPai: any, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, execUser: string, setExecUser: React.Dispatch<React.SetStateAction<string>>): void => {
  const turnUserMatch = boardStatus.match(/^turn_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (turnUserMatch === null) {
    return
  }
  const turnUser = turnUserMatch[1]

  // 既に処理済み
  if (execUser === turnUser) {
    return
  }

  // 2回実行されることがあるので牌の数が足りてるときは何もしないようにする
  if ((allPai[turnUser].base.length as number) + (allPai[turnUser].naki.length as number) * 3 >= 14) {
    return
  }
  // 牌をツモる
  const catYama = yama.splice(0, 1)
  setYama(yama)

  // 1枚もらう
  allPai[turnUser].base = allPai[turnUser].base.concat(catYama)
  setAllPai(allPai)

  setTimeout(() => {
    if (turnUser === 'own') {
      setExecUser(turnUser)
      setBoardStatus('think_' + turnUser)
    } else {
      cpuThink(allPai, setAllPai, yama, setYama, boardStatus, setBoardStatus, setExecUser)
    }
  }, 500)
}

export const cpuThink = (allPai: any, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>): void => {
  const turnUserMatch = boardStatus.match(/^turn_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (turnUserMatch === null) {
    return
  }

  const turnUser = turnUserMatch[1]
  // 自分自身の場合はオートで実行しない
  if (turnUser === 'own') {
    return
  }

  // @todo: ここのロジックを色々頑張りたいところ

  // ひとまず自摸切りしておく
  execSuteru(allPai, setAllPai, turnUser, setBoardStatus, allPai[turnUser].base.length - 1)
  setExecUser(turnUser)
}

export const execSuteru = (allPai: any, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, user: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, suteruKey: number): void => {
  const suteruHai = allPai[user].base.splice(suteruKey, 1)

  allPai[user].base = allPai[user].base.sort() // 最後ソートして配置
  // @todo: リーチを考慮
  allPai[user].sutehai = allPai[user].sutehai.concat({ hai: suteruHai, type: 'normal' }) // type は後で調整が必要
  setAllPai(allPai)

  const userKey = Object.keys(allPai).findIndex((e) => e === user)
  let nextKey = userKey + 1
  if (typeof Object.keys(allPai)[nextKey] === 'undefined') {
    nextKey = 0
  }

  // @todo: ポンやチーなど

  // 次の人にターンを回す
  setTimeout(() => {
    setBoardStatus('turn_' + Object.keys(allPai)[nextKey])
  }, 500)
}

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

  return <Board allPai={allPai} setAllPai={setAllPai} boardStatus={boardStatus} setBoardStatus={setBoardStatus} />
}
