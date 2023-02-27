import style from './dora.module.css'
import bk_1 from '../hai/p_bk_1.gif'
import { getHaiSrc } from '../hai/hai_info'
import { getKanCount } from '../../game/detection/get_kan_count'
import type { AllPaiProp } from '../type'

interface DoraReachProp {
  yama: string[]
  allPai: AllPaiProp
}
export const DoraReach = ({ yama, allPai }: DoraReachProp): JSX.Element => {
  const kanCount = getKanCount(allPai)
  return <>
    <div className={style.gedanReach}>
      <img src={kanCount >= 4 ? getHaiSrc(yama[yama.length - 13], 1) : bk_1} />
      <img src={kanCount >= 3 ? getHaiSrc(yama[yama.length - 11], 1) : bk_1} />
      <img src={kanCount >= 2 ? getHaiSrc(yama[yama.length - 9], 1) : bk_1} />
      <img src={kanCount >= 1 ? getHaiSrc(yama[yama.length - 7], 1) : bk_1} />
      <img src={getHaiSrc(yama[yama.length - 5], 1)} />
      <img src={bk_1} />
      <img src={bk_1} />
    </div>
    <div className={style.jodan}>
      <img src={kanCount >= 4 ? getHaiSrc(yama[yama.length - 14], 1) : bk_1} />
      <img src={kanCount >= 3 ? getHaiSrc(yama[yama.length - 12], 1) : bk_1} />
      <img src={kanCount >= 2 ? getHaiSrc(yama[yama.length - 10], 1) : bk_1} />
      <img src={kanCount >= 1 ? getHaiSrc(yama[yama.length - 8], 1) : bk_1} />
      <img src={getHaiSrc(yama[yama.length - 6], 1)} />
      <img src={bk_1} />
      <img src={bk_1} />
    </div>
  </>
}
