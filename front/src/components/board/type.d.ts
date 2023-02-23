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
  shanten: any // 後調整
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

export type MachiProp = {
  hai: string
  type: string
  num: numner
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