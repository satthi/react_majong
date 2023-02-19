import style from './base_hai.module.css'
import { getHaiSrc } from '../hai/hai_info'

interface BaseHaiOpenProp {
  base: string[]
  shanten: number
}

export const BaseHaiOpen = ({ base, shanten }: BaseHaiOpenProp): JSX.Element => {
  return <>
    {base.map((basePai) => {
      return <div className={style.basePai} key={basePai}><img src={getHaiSrc(basePai, 1)} /></div>
    })}
    <div className={style.shanten}>
      {shanten === -1 && <>上がり</>}
      {shanten === 0 && <>テンパイ</>}
      {shanten > 0 && shanten !== 99 && <>{shanten}シャンテン</>}
    </div>
  </>
}
