import type { AllPaiProp, HaiInfoProp, UserProp } from '../board/type'
// import { shantenCheck } from './shanten_check'

export const execAnkan = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, user: UserProp, kanPai: string, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>): void => {
  const kanhaiMatch = kanPai.match(/^hai_([1-4])_([1-9])$/)
  if (kanhaiMatch === null) {
    return
  }

  const kanhaiKaiseki: HaiInfoProp = {
    hai: kanPai,
    type: Number(kanhaiMatch[1]),
    num: Number(kanhaiMatch[2])
  }

  // keyがずれる関係で一気に実行せずに4回実行する
  let cutHaiExec = false
  allPai[user].base.forEach((b, bk) => {
    // eslint-disable-next-line
    if (b === kanPai && cutHaiExec === false) {
      allPai[user].base.splice(bk, 1)
      cutHaiExec = true
    }
  })
  cutHaiExec = false
  allPai[user].base.forEach((b, bk) => {
    // eslint-disable-next-line
    if (b === kanPai && cutHaiExec === false) {
      allPai[user].base.splice(bk, 1)
      cutHaiExec = true
    }
  })
  cutHaiExec = false
  allPai[user].base.forEach((b, bk) => {
    // eslint-disable-next-line
    if (b === kanPai && cutHaiExec === false) {
      allPai[user].base.splice(bk, 1)
      cutHaiExec = true
    }
  })
  cutHaiExec = false
  allPai[user].base.forEach((b, bk) => {
    // eslint-disable-next-line
    if (b === kanPai && cutHaiExec === false) {
      allPai[user].base.splice(bk, 1)
      cutHaiExec = true
    }
  })

  // nakiHai情報にセットする
  allPai[user].naki.push({
    type: 'ankan',
    keyHai: {
      haiInfo: kanhaiKaiseki,
      position: 'none'
    },
    hai: [
      kanhaiKaiseki,
      kanhaiKaiseki,
      kanhaiKaiseki
    ]
  })
  setAllPai(allPai)

  // もう一度ターンを回す
  setExecUser('dummy')
  const turnUserMatch = boardStatus.match(/^turn_(own|player1|player2|player3)_([0-9])+$/)
  if (turnUserMatch === null) {
    setBoardStatus('turn_' + user + '_1')
  } else {
    setBoardStatus('turn_' + user + '_' + String(Number(turnUserMatch[2]) + 1))
  }
}
