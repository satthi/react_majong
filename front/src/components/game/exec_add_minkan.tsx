import type { AllPaiProp, HaiInfoProp, UserProp } from '../board/type'

export const execAddMinkan = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, user: UserProp, kanPai: string, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>): void => {
  const kanhaiMatch = kanPai.match(/^hai_([1-4])_([1-9])$/)
  if (kanhaiMatch === null) {
    return
  }

  const kanhaiKaiseki: HaiInfoProp = {
    hai: kanPai,
    type: Number(kanhaiMatch[1]),
    num: Number(kanhaiMatch[2])
  }

  let cutHaiExec = false
  allPai[user].base.forEach((b, bk) => {
    // eslint-disable-next-line
    if (b === kanPai && cutHaiExec === false) {
      allPai[user].base.splice(bk, 1)
      cutHaiExec = true
    }
  })

  // nakiHai情報にセットする
  allPai[user].naki.forEach((n) => {
    if (n.type === 'pon' && n.keyHai.haiInfo.hai === kanPai) {
      n.type = 'minkan'
      n.hai.push(kanhaiKaiseki)
    }
  })
  allPai[user].kantsumo = true
  allPai[user].base = allPai[user].base.sort() // 最後ソートして配置

  // 全員の一発フラグを消す
  allPai.own.ippatsu = false
  allPai.player1.ippatsu = false
  allPai.player2.ippatsu = false
  allPai.player3.ippatsu = false

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
