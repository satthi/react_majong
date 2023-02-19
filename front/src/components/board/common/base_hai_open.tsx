import style from './base_hai.module.css'
import { getHaiSrc } from '../hai/hai_info'

interface BaseHaiOpenProp {
  base: string[]
}

export const BaseHaiOpen = ({ base }: BaseHaiOpenProp): JSX.Element => {
  return <>
    {base.map((basePai) => {
      return <div className={style.basePai} key={basePai}><img src={getHaiSrc(basePai, 1)} /></div>
    })}
  </>
}
