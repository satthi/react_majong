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
}

export type ShantenInfoProp = {
  shanten: number
  machi: HaiInfoProp[]
  mentsuGroup: ShantenBaseInfo[]
}

export type ShantenListProp = {
  key: number
  shantenInfo: ShantenInfoProp
}

type nakiPositionProp = {
  type: string
  key: {
      hai: string
      type: string
  }
  hai: string[]
}

export type SutehaiProp = {
  hai: string
  type: string
}

export type SuteType = 'normal' | 'reach'

export type HaiInfoProp = {
  hai: string
  type: number
  num: number

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
  kokushi: HaiInfoProp[]
  mentsu: HaiInfoProp[][]
  toitsu: HaiInfoProp[][]
  tatsu: HaiInfoProp[][]
  remain: HaiInfoProp[]
  shanten: number
  machi:  HaiInfoProp[]
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
  ti: boolean
  kan: boolean
}

