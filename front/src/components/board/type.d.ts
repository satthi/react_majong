export type AllPaiProp = {
  own: PaiProp
  player1: PaiProp
  player2: PaiProp
  player3: PaiProp
}

export type PaiProp = {
  base: string[]
  naki: nakiPositionProp[]
  sutehai: SutehaiProp[]
  shantenInfo: ShantenInfoProp
  isReach: boolean
  nakiCheck: NakiCheckProp
  jikaze: number
  kantsumo: boolean // カンを自模ってきた判定(嶺上開花に使用)
}

export type ShantenInfoProp = {
  shanten: number
  machi: MachiInfoProp[]
  mentsuGroup: ShantenBaseInfo[]
}

export type ShantenListProp = {
  key: number
  shantenInfo: ShantenInfoProp
}

type nakiPositionProp = {
  type: NakiTypeProp
  keyHai: {
    haiInfo: HaiInfoProp,
    position: NakiPositionProp
  }
  hai: HaiInfoProp[]
}

export type NakiTypeProp = 'pon' | 'ti' | 'minkan' | 'ankan'
export type NakiPositionProp = 'left' | 'center' | 'right' | 'none'

export type SutehaiProp = {
  hai: string
  type: 'normal' | 'reach'
  naki: boolean
}

export type SuteType = 'normal' | 'reach'

export type HaiInfoProp = {
  hai: string
  type: number
  num: number
}

export type MachiInfoProp = {
  haiInfo: HaiInfoProp
  tensu: MachiTensuInfo
}

export type MachiTensuInfo = {
  ron: TensuInfoProp
  tsumo: TensuInfoProp  
}

export type TensuInfoProp = {
  fu: number
  han: number
  yakuman: number
  yakuList: string[]
}

export type HaiCountInfoProp = {
  hai: string
  type: number
  num: number
  count: number
}

export type UserProp = 'own' | 'player1' | 'player2' | 'player3'

export type HaiSrcProp = {
  [key: string]: {
    direction_0: string
    direction_1: string
    direction_2: string
    direction_3: string
    direction_4: string
    direction_5: string
    direction_6: string
    direction_7: string
  }
}

export type HaiDirectionProp = 'direction_0' | 'direction_1' | 'direction_2' | 'direction_3' | 'direction_4' | 'direction_5' | 'direction_6' | 'direction_7'

export type ShantenBaseInfo = {
  remainHaiCountInfo: HaiCountInfoProp[]
  haiCountInfo: HaiCountInfoProp[]
  kokushi: HaiInfoProp[]
  mentsu: HaiInfoProp[][]
  toitsu: HaiInfoProp[][]
  tatsu: HaiInfoProp[][]
  remain: HaiInfoProp[]
  shanten: number
  machi:  MachiInfoProp[]
}

export type AllNakiCheckProp = {
  own: NakiCheckProp
  player1: NakiCheckProp
  player2: NakiCheckProp
  player3: NakiCheckProp
}

export type NakiCheckProp = {
  ron: boolean
  pon: boolean
  ti1: boolean // 3 12
  ti2: boolean // 2 13
  ti3: boolean // 1 23
  kan: boolean
}

export type ColorFlagProp = {
  type_1: boolean
  type_2: boolean
  type_3: boolean
  type_4: boolean
}
export type ColorTypeProp = 'type_1' | 'type_2' | 'type_3' | 'type_4'

export type IkkiTsukanFlagProp = {
  num_1: boolean
  num_4: boolean
  num_7: boolean
}

export type IkkiTsukanTypeProp = 'num_1' | 'num_4' | 'num_7'

export type SangenhaiFlagProp = {
  num_5: boolean
  num_6: boolean
  num_7: boolean
}

export type SangenhaiTypeProp = 'num_5' | 'num_6' | 'num_7'

export type SutehaiListWeightProp = {
  key: number
  weight: number
}