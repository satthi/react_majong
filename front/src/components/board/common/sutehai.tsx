import type { SutehaiProp } from '../type'
import style from './sutehai.module.css'
import { getHaiSrc } from '../hai/hai_info'

interface SutehaiConstProp {
  sutehai: SutehaiProp[]
}

export const Sutehai = ({ sutehai }: SutehaiConstProp): JSX.Element => {
  return <>
    {sutehai.map((sutehaiPai) => {
      return <div className={style.sutehai} key={sutehaiPai.hai} >
        {sutehaiPai.type === 'normal' ? <img src={getHaiSrc(sutehaiPai.hai, 1)} /> : <img src={getHaiSrc(sutehaiPai.hai, 3)} /> }
      </div>
    })}
  </>
}
