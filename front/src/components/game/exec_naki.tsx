import { setRon } from '../board/common/set_ron'
import type { AllPaiProp, HaiInfoProp, UserProp } from '../board/type'
import { nextTurn } from './next_turn'
import { cpuThink } from './cpu_think'
import { shantenCheck } from './shanten_check'

export const execNaki = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, user: UserProp, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, suteruhai: string, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean): void => {
  // 判定順
  const sortUsers: UserProp[] = []
  let setUserFlag = false;
  (Object.keys(allPai) as UserProp[]).forEach((checkUser: UserProp) => {
    if (checkUser === user) {
      setUserFlag = true
    } else if (setUserFlag) {
      sortUsers.push(checkUser)
    }
  });

  (Object.keys(allPai) as UserProp[]).forEach((checkUser: UserProp) => {
    if (checkUser === user) {
      setUserFlag = false
    } else if (setUserFlag) {
      sortUsers.push(checkUser)
    }
  })

  // @todo: CPUにおいてロン・ポン・チー・カンを行うかの判定を追加

  // 優先順位で判定
  // ロン
  let ronExec = false
  sortUsers.forEach((sortUser) => {
    // eslint-disable-next-line
    if (allPai[sortUser].nakiCheck.ron) {
      allPai[sortUser].base.push(suteruhai)
      setAllPai(allPai)
      shantenCheck(allPai, setAllPai, yama, bakaze, sortUser)
      setRon(allPai, sortUser, setBoardStatus)
      ronExec = true
    }
  })

  if (ronExec) {
    allNakiCheckReset(allPai, setAllPai)
    return
  }

  // 捨て牌の解析をしておく
  const suteruhaiMatch = suteruhai.match(/^hai_([1-4])_([1-9])$/)
  // 解析ができないことはないけどとりあえず
  if (suteruhaiMatch === null) {
    nextTurn(allPai, user, setBoardStatus, yama)
    return
  }
  const suteruHaiKaiseki: HaiInfoProp = {
    hai: suteruhai,
    type: Number(suteruhaiMatch[1]),
    num: Number(suteruhaiMatch[2])
  }

  // ポン
  let ponExec = false
  sortUsers.forEach((sortUser) => {
    // eslint-disable-next-line
    if (ponExec === false && allPai[sortUser].nakiCheck.pon) {
      // keyがずれる関係で一気に実行せずに2回実行する
      let cutHaiExec = false
      allPai[sortUser].base.forEach((b, bk) => {
        // eslint-disable-next-line
        if (b === suteruhai && cutHaiExec === false) {
          allPai[sortUser].base.splice(bk, 1)
          cutHaiExec = true
        }
      })
      cutHaiExec = false
      allPai[sortUser].base.forEach((b, bk) => {
        // eslint-disable-next-line
        if (b === suteruhai && cutHaiExec === false) {
          allPai[sortUser].base.splice(bk, 1)
          cutHaiExec = true
        }
      })

      // nakiHai情報にセットする
      allPai[sortUser].naki.push({
        type: 'pon',
        keyHai: {
          haiInfo: suteruHaiKaiseki,
          position: 'left' // @todo: 取ってくる場所の調整
        },
        hai: [
          suteruHaiKaiseki,
          suteruHaiKaiseki
        ]
      })

      // 鳴き実行のチェック
      allPai[user].sutehai[allPai[user].sutehai.length - 1].naki = true

      ponExec = true
      // ポンを実行してる人の捨てるフェーズ
      if (sortUser === 'own' && !ownAuto) {
        setBoardStatus('think_' + sortUser)
      } else {
        cpuThink(allPai, setAllPai, sortUser, yama, setYama, boardStatus, setBoardStatus, setExecUser, ownAuto, bakaze)
      }
    }
  })

  if (ponExec) {
    allNakiCheckReset(allPai, setAllPai)
    return
  }

  nextTurn(allPai, user, setBoardStatus, yama)
}

const allNakiCheckReset = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>): void => {
  (Object.keys(allPai) as UserProp[]).forEach((user: UserProp) => {
    allPai[user].nakiCheck.pon = false
    allPai[user].nakiCheck.ron = false
    allPai[user].nakiCheck.ti = false
    allPai[user].nakiCheck.kan = false
  })

  setAllPai(allPai)
}
