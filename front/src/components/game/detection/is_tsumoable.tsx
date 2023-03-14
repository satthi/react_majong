import type { AllPaiProp, PaiProp, TensuInfoProp } from '../../board/type'
import { shantenBase } from '../shanten_base'

export const isTsumoable = (allPai: AllPaiProp, hai: PaiProp, boardStatus: string, yama: string[], bakaze: number): boolean => {
  if (boardStatus.match(/^agari_/) !== null || hai.shantenInfo.shanten !== -1) {
    return false
  }

  const checkHaiInfo: PaiProp = JSON.parse(JSON.stringify(hai))
  const agariHai = checkHaiInfo.base.splice(checkHaiInfo.base.length - 1, 1)
  const shantenInfoMentsu = shantenBase(allPai, checkHaiInfo, yama, bakaze, checkHaiInfo.jikaze)

  let agariInfo: TensuInfoProp = {
    fu: 0,
    han: 0,
    yakuman: 0,
    yakuList: [],
    yakumanYakuList: []
  }

  shantenInfoMentsu.mentsuGroup.forEach((g) => {
    g.machi.forEach((m) => {
      if (m.haiInfo.hai === agariHai[0]) {
        if (agariInfo.han < m.tensu.tsumo.han || (agariInfo.han === m.tensu.tsumo.han && agariInfo.fu < m.tensu.tsumo.fu)) {
          agariInfo = m.tensu.tsumo
        }
      }
    })
  })

  return agariInfo.han > 0 || agariInfo.yakuman > 0
}
