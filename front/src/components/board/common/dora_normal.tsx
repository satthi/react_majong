import style from './dora.module.css'
import bk_1 from '../hai/p_bk_1.gif'
import { getHaiSrc } from '../hai/hai_info'
import type { AllPaiProp } from '../type'
import { getKanCount } from '../../game/detection/get_kan_count'

interface DoraNormalProp {
  yama: string[]
  allPai: AllPaiProp
}
export const DoraNormal = ({ yama, allPai }: DoraNormalProp): JSX.Element => {
  const kanCount = getKanCount(allPai)
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
