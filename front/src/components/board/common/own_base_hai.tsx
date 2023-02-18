import { HaiPositionProp } from "../type";
import style from './base_hai.module.css';
import ms1_0 from '../hai/p_ms1_0.gif';
import { getHaiSrc } from "../hai/hai_info";

type OwnBaseHaiProp = {
    base: HaiPositionProp[];
};

export const OwnBaseHai = ({base}: OwnBaseHaiProp) => {
    return <>
        {base.map((basePai) => {
            return <div className={style.basePai}><img src={getHaiSrc(basePai.hai, 0)} /></div>
        })}
    </>
}