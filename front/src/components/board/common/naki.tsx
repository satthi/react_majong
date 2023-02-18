import { nakiPositionProp } from "../type";
import style from './naki.module.css';
import ms1_1 from '../hai/p_ms1_1.gif';
import ms1_3 from '../hai/p_ms1_3.gif';
import bk_1 from '../hai/p_bk_1.gif';

type NakiProp = {
    naki: nakiPositionProp[];
};

export const Naki = ({naki} : NakiProp) => {
    return <>
        {naki.map((nakiHai, nakiCount) => {
            return <div className={`${style['ownPaiNakiField' + nakiCount]}`}>
                {nakiHai.key.type === 'left' && 
                    <>
                        <div className={style.nakiHai}><img src={ms1_3} /></div>
                        {nakiHai.hai.map((ownNakiOther) => {
                            return <div className={style.nakiHai}><img src={ms1_1} /></div>
                        })}
                    </>
                }
                {nakiHai.key.type === 'right' && 
                    <>
                        {nakiHai.hai.map((ownNakiOther) => {
                            return <div className={style.nakiHai}><img src={ms1_1} /></div>
                        })}
                        <div className={style.nakiHai}><img src={ms1_3} /></div>
                    </>
                }
                {nakiHai.key.type === 'center' && 
                    <>
                        {nakiHai.hai.map((ownNakiOther) => {
                            return <>
                                {ownNakiOther.position === 2 && <div className={style.nakiHai}><img src={ms1_3} /></div>}
                                <div className={style.nakiHai}><img src={ms1_1} /></div>
                            </>
                        })}
                        
                    </>
                }
                {nakiHai.key.type === 'ankan' && 
                    <>
                        <div className={style.nakiHai}><img src={bk_1} /></div>
                        {nakiHai.hai.map((ownNakiOther) => {
                            return <>
                                <div className={style.nakiHai}>
                                    {ownNakiOther.position === 3 ? <img src={bk_1} /> : <img src={ms1_1} /> }
                                </div>
                            </>
                        })}
                    </>
                }

            </div>
        })}
    </>
}