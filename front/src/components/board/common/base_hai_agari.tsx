import style from './base_hai.module.css'
import { getHaiSrc } from '../hai/hai_info'

interface BaseHaiAgariProp {
  base: string[]
}

export const BaseHaiAgari = ({ base }: BaseHaiAgariProp): JSX.Element => {
  return <>
    {base.map((basePai, basePaiI) => {
      return <div className={style.basePai} key={basePaiI}><img src={getHaiSrc(basePai, 1)} /></div>
    })}
  </>
}
