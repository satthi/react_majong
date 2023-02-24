import type { HaiInfoProp, MachiTensuInfo, ShantenBaseInfo } from '../board/type'

export const fuyakuCalc = (shantenInfo: ShantenBaseInfo, machiHai: HaiInfoProp): MachiTensuInfo => {
  return {
    ron: {
      fu: 0,
      han: 0,
      yakuman: 0
    },
    tsumo: {
      fu: 0,
      han: 0,
      yakuman: 0
    }
  }
}
