import style from './base_hai.module.css';
import { getHaiSrc } from "../hai/hai_info";

type BaseHaiOpenProp = {
    base: string[];
};

export const BaseHaiOpen = ({base}: BaseHaiOpenProp) => {
    return <>
        {base.map((basePai) => {
            return <div className={style.basePai}><img src={getHaiSrc(basePai, 1)} /></div>
        })}
    </>
}