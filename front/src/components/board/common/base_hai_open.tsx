import style from './base_hai.module.css'
import { getHaiSrc } from '../hai/hai_info'
import type { MachiProp } from '../type'

interface BaseHaiOpenProp {
  base: string[]
  shanten: number
  machi: MachiProp[]
}

export const BaseHaiOpen = ({ base, shanten, machi }: BaseHaiOpenProp): JSX.Element => {
  return <>
    {base.map((basePai, basePaiI) => {
      return <div className={style.basePai} key={basePaiI}><img src={getHaiSrc(basePai, 1)} /></div>
    })}
    <div className={style.shanten}>
      {shanten === -1 && <>上がり</>}
      {shanten === 0 && <>テンパイ</>}
      {shanten > 0 && shanten !== 99 && <>{shanten}シャンテン</>}
      {machi.length > 0 &&
        <span className={style.machi}>
          待ち：
          {machi.map((m, k) => {
            return <img src={getHaiSrc(m.hai, 1)} key={k} height='30px' />
          })}
        </span>
      }
    </div>
  </>
}
