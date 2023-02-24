import type { MachiTensuInfo } from '../board/type'

export const fuyakuCalc = (): MachiTensuInfo => {
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
