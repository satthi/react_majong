import style from './base_hai.module.css';
import ms1_0 from '../hai/p_ms1_0.gif';
import { getHaiSrc } from "../hai/hai_info";
import { AllPaiProp } from '../type';
import { execSuteru } from '../../game';

type OwnBaseHaiProp = {
    allPai: AllPaiProp;
    setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>;
    base: string[];
    boardStatus: string;
    setBoardStatus: React.Dispatch<React.SetStateAction<string>>;
};

const execOwnSuteru = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, haiKey: number) => {
    if (boardStatus === 'think_own') {
        // 捨てた後に固定実行
        execSuteru(allPai, setAllPai, 'own', setBoardStatus, haiKey);
        // setBoardStatus('turn_player1');
    }
}

export const OwnBaseHai = ({allPai, setAllPai, base, boardStatus, setBoardStatus}: OwnBaseHaiProp) => {
    return <>
        {base.map((basePai, haiKey) => {
            return <div className={style.basePai}>
                <img src={getHaiSrc(basePai, 0)} onClick={() => execOwnSuteru(allPai, setAllPai, boardStatus, setBoardStatus, haiKey)}/>
            </div>
        })}
    </>
}