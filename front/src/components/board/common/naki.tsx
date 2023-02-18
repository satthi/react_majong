import { nakiPositionProp } from "../type";
import style from './naki.module.css';
import bk_1 from '../hai/p_bk_1.gif';
import { getHaiSrc } from "../hai/hai_info";

type NakiProp = {
    naki: nakiPositionProp[];
};

export const Naki = ({naki} : NakiProp) => {
    return <>
        {naki.map((nakiHai, nakiCount) => {
            return <div className={`${style['ownPaiNakiField' + nakiCount]}`}>
                {nakiHai.key.type === 'left' && 
                    <>
                        <div className={style.nakiHai}><img src={getHaiSrc(nakiHai.key.hai, 3)} /></div>
                        {nakiHai.hai.map((nakiOther) => {
                            return <div className={style.nakiHai}><img src={getHaiSrc(nakiOther, 1)} /></div>
                        })}
                    </>
                }
                {nakiHai.key.type === 'right' && 
                    <>
                        {nakiHai.hai.map((nakiOther) => {
                            return <div className={style.nakiHai}><img src={getHaiSrc(nakiOther, 1)} /></div>
                        })}
                        <div className={style.nakiHai}><img src={getHaiSrc(nakiHai.key.hai, 3)} /></div>
                    </>
                }
                {nakiHai.key.type === 'center' && 
                    <>
                        {nakiHai.hai.map((nakiOther, nakiCount) => {
                            return <>
                                {nakiCount === 1 && <div className={style.nakiHai}><img src={getHaiSrc(nakiHai.key.hai, 3)} /></div>}
                                <div className={style.nakiHai}><img src={getHaiSrc(nakiOther, 1)} /></div>
                            </>
                        })}
                        
                    </>
                }
                {nakiHai.key.type === 'ankan' && 
                    <>
                        <div className={style.nakiHai}><img src={bk_1} /></div>
                        {nakiHai.hai.map((nakiOther, nakiCount) => {
                            return <>
                                <div className={style.nakiHai}>
                                    {nakiCount === 2 ? <img src={bk_1} /> : <img src={getHaiSrc(nakiOther, 1)} /> }
                                </div>
                            </>
                        })}
                    </>
                }

            </div>
        })}
    </>
}