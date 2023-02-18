import { SutehaiProp } from "../type";
import style from './sutehai.module.css';
import ms1_1 from '../hai/p_ms1_1.gif';
import ms1_3 from '../hai/p_ms1_3.gif';

type SutehaiConstProp = {
    sutehai: SutehaiProp[];
}

export const Sutehai = ({sutehai}: SutehaiConstProp) => {
    return <>
        {sutehai.map((ownSutehaiPai) => {
            return <div className={style.sutehai}>
                {ownSutehaiPai.type === 'normal' ? <img src={ms1_1} /> : <img src={ms1_3} /> }
            </div>
        })}

    </>;
}