import { setRon } from '../board/common/set_ron'
import type { AllPaiProp, UserProp } from '../board/type'
import { nextTurn } from './next_turn'
import { shantenCheck } from './shanten_check'

export const execNaki = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, user: UserProp, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], suteruhai: string, bakaze: number): void => {
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

  // 優先順位で判定
  // ロン
  let nakiExec = false
  let ronExec = false
  sortUsers.forEach((sortUser) => {
    // eslint-disable-next-line
    if (allPai[sortUser].nakiCheck.ron && !nakiExec) {
      nakiExec = true

      allPai[sortUser].base.push(suteruhai)
      setAllPai(allPai)
      shantenCheck(allPai, setAllPai, bakaze)
      setRon(allPai, sortUser, setBoardStatus)
      ronExec = true
    }
  })

  // ポンなど実行されたときの次の人の調整も必要
  if (ronExec) {
    return
  }

  nextTurn(allPai, user, setBoardStatus, yama)
}
