import { SutehaiProp } from "../type";
import style from './sutehai.module.css';
import ms1_1 from '../hai/p_ms1_1.gif';
import ms1_3 from '../hai/p_ms1_3.gif';
import { getHaiSrc } from "../hai/hai_info";

type SutehaiConstProp = {
    sutehai: SutehaiProp[];
}

export const Sutehai = ({sutehai}: SutehaiConstProp) => {
    return <>
        {sutehai.map((sutehaiPai) => {
            return <div className={style.sutehai}>
                {sutehaiPai.type === 'normal' ? <img src={getHaiSrc(sutehaiPai.hai, 1)} /> : <img src={getHaiSrc(sutehaiPai.hai, 3)} /> }
            </div>
        })}

    </>;

}