import React from 'react'
import { shantenBase } from '../components/game/shanten_base'

export const ShantenTest = (): JSX.Element => {
  const hai = {
    base: [
      'hai_1_1',
      'hai_1_1',
      'hai_1_1',
      'hai_1_2',
      'hai_1_3',
      'hai_1_4',
      'hai_4_4',
      'hai_4_4',
      'hai_4_5',
      'hai_4_5',
      'hai_4_6',
      'hai_4_6',
      'hai_4_7'
    ],
    naki: [],
    sutehai: [],
    shanten: 99
  }
  const a = shantenBase(hai)
  console.log(a)

  console.log('HH')

  return <>{ a }シャンテン</>
}
