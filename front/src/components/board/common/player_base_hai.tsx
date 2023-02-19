import style from './base_hai.module.css'
import bk_5 from '../hai/p_bk_5.gif'

interface OwnBaseHaiProp {
  base: string[]
};

export const PlaterBaseHai = ({ base }: OwnBaseHaiProp): JSX.Element => {
  return <>
    {base.map((basePai) => {
      return <div className={style.basePai} key={basePai} ><img src={bk_5} /></div>
    })}
  </>
}
