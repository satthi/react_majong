import React from 'react'
import { BaseHaiOpen } from '../components/board/common/base_hai_open'
import { getHaiSrc } from '../components/board/hai/hai_info'
import type { PaiProp } from '../components/board/type'
import { shantenBase, shantenMentsu } from '../components/game/shanten_base'

export const ShantenTest = (): JSX.Element => {
  const hai: PaiProp = {
    base: [
      // 'hai_1_1',
      // 'hai_1_1',
      // 'hai_1_1',
      // 'hai_1_2',
      // 'hai_1_2',
      // 'hai_1_2',
      // 'hai_1_3',
      // 'hai_1_3',
      // 'hai_2_1',
      // 'hai_2_2',
      // 'hai_4_5',
      // 'hai_4_5',
      // 'hai_4_5'
      'hai_1_1',
      'hai_1_1',
      'hai_1_1',
      'hai_1_2',
      'hai_1_3',
      'hai_1_4',
      'hai_1_5',
      'hai_1_6',
      'hai_1_7',
      'hai_1_8',
      'hai_1_9',
      'hai_1_9',
      'hai_1_9',
      'hai_4_1'
    ],
    naki: [],
    sutehai: [],
    shantenInfo: {
      shanten: 99,
      machi: [],
      mentsuGroup: []
    },
    isReach: false,
    nakiCheck: {
      ron: false,
      pon: false,
      ti: false,
      kan: false
    }
  }
  const a = shantenBase(hai)
  const shantenMentsuData = shantenMentsu(hai)

  return <>
    <div style={{ position: 'absolute', top: '40px' }}>
      <BaseHaiOpen base={hai.base} shanten={a.shanten} machi={a.machi} />
    </div>

    <div style={{ position: 'absolute', top: '200px' }}>
      {shantenMentsuData.map((b, bi) => {
        return <div style={{ clear: 'both' }} key={bi}>
          {b.mentsu.map((c, ci) => {
            return <div style={{ border: ' 3px solid #000', float: 'left' }} key={ci} >
              {c.map((cmentsugroup, cmentsugroupI) => {
                return <img src={getHaiSrc(cmentsugroup.hai, 1)} key={cmentsugroupI} />
              })}
            </div>
          })}
          {b.toitsu.map((c, ci) => {
            return <div style={{ border: '3px solid #000', float: 'left' }} key={ci} >
              {c.map((cmentsugroup, cmentsugroupI) => {
                return <img src={getHaiSrc(cmentsugroup.hai, 1)} key={cmentsugroupI} />
              })}
            </div>
          })}
          {b.tatsu.map((c, ci) => {
            return <div style={{ border: '3px solid #000', float: 'left' }} key={ci} >
              {c.map((cmentsugroup, cmentsugroupI) => {
                return <img src={getHaiSrc(cmentsugroup.hai, 1)} key={cmentsugroupI} />
              })}
            </div>
          })}
          {b.kokushi.length > 0 &&
            <div style={{ border: '3px solid #000', float: 'left' }}>
              {b.kokushi.map((c, ci) => {
                return <img src={getHaiSrc(c.hai, 1)} key={ci} />
              })}
            </div>
          }
          {b.remainHaiCountInfo.map((c) => {
            return [...Array(c.count)].map((x) => {
              return <div style={{ border: '3px solid #000', float: 'left' }} key={x} ><img src={getHaiSrc(c.hai, 1)} /></div>
            })
          })}
        </div>
      })}
    </div>
  </>
}
