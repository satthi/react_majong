
import type { AllPaiProp, SuteType, UserProp } from '../board/type'
import { isPonable } from './detection/is_ponable'
import { isRonable } from './detection/is_ronable'
import { execNaki } from './exec_naki'
import { shantenCheck } from './shanten_check'

export const execSuteru = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, user: UserProp, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, suteruKey: number, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, suteType: SuteType, ownAuto: boolean, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>): void => {
  const suteruHai = allPai[user].base.splice(suteruKey, 1)

  allPai[user].base = allPai[user].base.sort() // 最後ソートして配置
  allPai[user].sutehai = allPai[user].sutehai.concat({ hai: suteruHai[0], type: suteType, naki: false }) // type は後で調整が必要

  // 停止がかかった際にはいったん以下の処理はスキップ
  // リーチ情報をセット
  if (suteType === 'reach') {
    allPai[user].isReach = true
  }

  // ロン/ポン/チー/カンが存在するかの確認(順番含めていったん無視が正解ぽ)
  (Object.keys(allPai) as UserProp[]).forEach((checkUser: UserProp) => {
    // @todo: ポン/チー/カンの制御
    if (checkUser !== user && isRonable(allPai[checkUser], suteruHai[0])) {
      allPai[checkUser].nakiCheck.ron = true
    }
    if (checkUser !== user && isPonable(allPai[checkUser], suteruHai[0])) {
      allPai[checkUser].nakiCheck.pon = true
    }
  })

  setAllPai(allPai)
  shantenCheck(allPai, setAllPai, yama, bakaze, user)

  // 操作者に鳴きがない場合は
  // eslint-disable-next-line
  if (ownAuto || (!allPai.own.nakiCheck.ron && !allPai.own.nakiCheck.pon && !allPai.own.nakiCheck.ti && !allPai.own.nakiCheck.kan)) {
    // 自動で判定を進めてよい
    execNaki(allPai, setAllPai, user, boardStatus, setBoardStatus, yama, setYama, suteruHai[0], bakaze, setExecUser, ownAuto)
  } else {
    // 鳴きの確認
    setBoardStatus('naki_' + user)
  }
}
