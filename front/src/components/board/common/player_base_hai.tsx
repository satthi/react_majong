import { HaiPositionProp } from "../type";
import style from './base_hai.module.css';
import bk_5 from '../hai/p_bk_5.gif';

type OwnBaseHaiProp = {
    base: HaiPositionProp[];
};

export const PlaterBaseHai = ({base}: OwnBaseHaiProp) => {
    return <>
        {base.map(() => {
            return <div className={style.basePai}><img src={bk_5} /></div>
        })}

    </>
}