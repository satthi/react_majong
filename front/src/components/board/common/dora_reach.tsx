import style from './dora.module.css'
import bk_1 from '../hai/p_bk_1.gif'
import { getHaiSrc } from '../hai/hai_info'

interface DoraReachProp {
  yama: string[]
}
export const DoraReach = ({ yama }: DoraReachProp): JSX.Element => {
  return <>
    <div className={style.gedanReach}>
      <img src={bk_1} />
      <img src={bk_1} />
      <img src={bk_1} />
      <img src={bk_1} />
      {/* @todo: カンをしたときの表示調整 */}
      <img src={getHaiSrc(yama[yama.length - 5], 1)} />
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
