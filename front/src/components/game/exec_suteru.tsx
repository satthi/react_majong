
import type { AllPaiProp, SuteType, UserProp } from '../board/type'
import { isMinkanable } from './detection/is_minkanable'
import { isPonable } from './detection/is_ponable'
import { isRonable } from './detection/is_ronable'
import { isTi1able, isTi2able, isTi3able } from './detection/is_tiable'
import { execNaki } from './exec_naki'
import { shantenCheck } from './shanten_check'

export const execSuteru = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, user: UserProp, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, suteruKey: number, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, suteType: SuteType, ownAuto: boolean, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>): void => {
  const suteruHai = allPai[user].base.splice(suteruKey, 1)

  allPai[user].kantsumo = false // 捨てた時点でfalseにする
  allPai[user].base = allPai[user].base.sort() // 最後ソートして配置
  allPai[user].sutehai = allPai[user].sutehai.concat({ hai: suteruHai[0], type: suteType, naki: false }) // type は後で調整が必要

  // 停止がかかった際にはいったん以下の処理はスキップ
  // リーチ情報をセット
  if (suteType === 'reach') {
    allPai[user].isReach = true
  }

  const userList = (Object.keys(allPai) as UserProp[])
  // ロン/ポン/チー/カンが存在するかの確認(順番含めていったん無視が正解ぽ)
  userList.forEach((checkUser: UserProp, checkUserKey) => {
    // @todo: カンの制御
    if (checkUser !== user && isRonable(allPai[checkUser], suteruHai[0])) {
      allPai[checkUser].nakiCheck.ron = true
    }
    if (checkUser !== user && isPonable(allPai[checkUser], suteruHai[0])) {
      allPai[checkUser].nakiCheck.pon = true
    }
    if (checkUser !== user && isMinkanable(allPai[checkUser], suteruHai[0])) {
      allPai[checkUser].nakiCheck.kan = true
    }
    // チーについては下家のみ
    if (checkUser === user) {
      const tiUser = userList[checkUserKey + 1] ?? userList[0]
      if (isTi1able(allPai[tiUser], suteruHai[0])) {
        allPai[tiUser].nakiCheck.ti1 = true
      }
      if (isTi2able(allPai[tiUser], suteruHai[0])) {
        allPai[tiUser].nakiCheck.ti2 = true
      }
      if (isTi3able(allPai[tiUser], suteruHai[0])) {
        allPai[tiUser].nakiCheck.ti3 = true
      }
    }
  })

  setAllPai(allPai)
  shantenCheck(allPai, setAllPai, yama, bakaze, user)

  // 操作者に鳴きがない場合は
  // eslint-disable-next-line
  if (ownAuto || (!allPai.own.nakiCheck.ron && !allPai.own.nakiCheck.pon && !allPai.own.nakiCheck.ti1 && !allPai.own.nakiCheck.ti2 && !allPai.own.nakiCheck.ti3 && !allPai.own.nakiCheck.kan)) {
    // 自動で判定を進めてよい
    execNaki(allPai, setAllPai, user, boardStatus, setBoardStatus, yama, setYama, suteruHai[0], bakaze, setExecUser, ownAuto)
  } else {
    // 鳴きの確認
    setBoardStatus('naki_' + user)
  }
}
