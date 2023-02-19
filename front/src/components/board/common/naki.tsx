import type { nakiPositionProp } from '../type'
import style from './naki.module.css'
import bk_1 from '../hai/p_bk_1.gif'
import { getHaiSrc } from '../hai/hai_info'
import { Fragment } from 'react'

interface NakiProp {
  naki: nakiPositionProp[]
}

export const Naki = ({ naki }: NakiProp): JSX.Element => {
  return <>
    {naki.map((nakiHai, nakiCount) => {
      return <div className={`${style['ownPaiNakiField' + String(nakiCount)]}`} key={nakiCount}>
        {nakiHai.key.type === 'left' &&
          <>
            <div className={style.nakiHai}><img src={getHaiSrc(nakiHai.key.hai, 3)} /></div>
            {nakiHai.hai.map((nakiOther) => {
              return <div className={style.nakiHai} key={nakiOther}><img src={getHaiSrc(nakiOther, 1)} /></div>
            })}
          </>
        }
        {nakiHai.key.type === 'right' &&
          <>
            {nakiHai.hai.map((nakiOther) => {
              return <div className={style.nakiHai} key={nakiOther}><img src={getHaiSrc(nakiOther, 1)} /></div>
            })}
            <div className={style.nakiHai}><img src={getHaiSrc(nakiHai.key.hai, 3)} /></div>
          </>
        }
        {nakiHai.key.type === 'center' &&
          <>
            {nakiHai.hai.map((nakiOther, nakiCount) => {
              return <Fragment key={nakiCount}>
                {nakiCount === 1 && <div className={style.nakiHai}><img src={getHaiSrc(nakiHai.key.hai, 3)} /></div>}
                <div className={style.nakiHai}><img src={getHaiSrc(nakiOther, 1)} /></div>
              </Fragment>
            })}
          </>
        }
        {nakiHai.key.type === 'ankan' &&
          <>
            <div className={style.nakiHai}><img src={bk_1} /></div>
            {nakiHai.hai.map((nakiOther, nakiCount) => {
              return <Fragment key={nakiCount}>
              <div className={style.nakiHai}>
                  {nakiCount === 2 ? <img src={bk_1} /> : <img src={getHaiSrc(nakiOther, 1)} /> }
                </div>
              </Fragment>
            })}
          </>
        }
      </div>
    })}
  </>
}
