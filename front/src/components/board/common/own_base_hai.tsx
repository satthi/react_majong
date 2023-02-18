import { HaiPositionProp } from "../type";
import style from './base_hai.module.css';
import ms1_0 from '../hai/p_ms1_0.gif';

type OwnBaseHaiProp = {
    base: HaiPositionProp[];
};

export const OwnBaseHai = ({base}: OwnBaseHaiProp) => {
    return <>
        {base.map(() => {
            return <div className={style.basePai}><img src={ms1_0} /></div>
        })}
    </>
}