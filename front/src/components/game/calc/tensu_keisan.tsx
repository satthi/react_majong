import type { TensuInfoProp, TensuKeisanProp } from '../../board/type'

const kiriageShori = (tensu: number): number => {
  return Math.ceil(tensu / 100) * 100
}

export const tensuKeisan = (agariInfo: TensuInfoProp, hon: number): TensuKeisanProp => {
  let baseTensu: number = 0 // 何かしら割り当たるはず
  let yakuText = ''
  if (agariInfo.yakuman > 0) {
    baseTensu = agariInfo.yakuman * 32000

    // eslint-disable-next-line
    yakuText = (agariInfo.yakuman > 1 && agariInfo.yakuman + '倍') + '役満'
  } else {
    // 跳満/倍満/三倍満/数え役満は固定
    if (agariInfo.han >= 13) {
      baseTensu = 32000
      yakuText = '数え役満'
    } else if (agariInfo.han >= 11) {
      baseTensu = 24000
      yakuText = '三倍満'
    } else if (agariInfo.han >= 8) {
      baseTensu = 16000
      yakuText = '倍満'
    } else if (agariInfo.han >= 6) {
      baseTensu = 12000
      yakuText = '跳満'
    } else {
      baseTensu = agariInfo.fu * 4 * 2 ^ agariInfo.han
      // 8000を超えているときは満貫
      if (baseTensu >= 8000) {
        baseTensu = 8000
        yakuText = '満貫'
      }
    }
  }

  return {
    oya: {
      tsumo: kiriageShori(baseTensu / 3 * 1.5) + hon * 100,
      ron: kiriageShori(baseTensu * 1.5) + hon * 300
    },
    ko: {
      tsumo: {
        oya: kiriageShori(baseTensu / 2) + hon * 100,
        ko: kiriageShori(baseTensu / 4) + hon * 100
      },
      ron: kiriageShori(baseTensu) + hon * 300
    },
    yakuText
  }
}

export const tensuTotal = (agariInfo: TensuInfoProp, jikaze: number, agariStatus: string, hon: number): number => {
  const tensuBase = tensuKeisan(agariInfo, hon)
  let tensu = 0
  if (jikaze === 1) {
    if (agariStatus === 'tsumo') {
      tensu += tensuBase.oya.tsumo * 3
    } else {
      // eslint-disable-next-line
      tensu += tensuBase.oya.ron
    }
  } else {
    if (agariStatus === 'tsumo') {
      // eslint-disable-next-line
      tensu += tensuBase.ko.tsumo.oya + tensuBase.ko.tsumo.ko * 2
    } else {
      // eslint-disable-next-line
      tensu += tensuBase.ko.ron
    }
  }

  return tensu
}
