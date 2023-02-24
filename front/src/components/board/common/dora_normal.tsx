import style from './dora.module.css'
import bk_1 from '../hai/p_bk_1.gif'
import { getHaiSrc } from '../hai/hai_info'

interface DoraNormalProp {
  yama: string[]
}
export const DoraNormal = ({ yama }: DoraNormalProp): JSX.Element => {
  return <>
    <div className={style.gedan}>
      <img src={bk_1} />
      <img src={bk_1} />
      <img src={bk_1} />
      <img src={bk_1} />
      <img src={bk_1} />
      <img src={bk_1} />
      <img src={bk_1} />
    </div>
    <div className={style.jodan}>
      <img src={bk_1} />
      <img src={bk_1} />
      <img src={bk_1} />
      <img src={bk_1} />
      {/* @todo: カンをしたときの表示調整 */}
      <img src={getHaiSrc(yama[yama.length - 6], 1)} />
      <img src={bk_1} />
      <img src={bk_1} />
    </div>
  </>
}
