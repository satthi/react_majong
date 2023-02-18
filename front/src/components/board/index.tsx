import style from './board.module.css'
import { AllPaiProp, PaiProp } from './type';
import { Sutehai } from './common/sutehai';
import { OwnBaseHai } from './common/own_base_hai';
import { PlaterBaseHai } from './common/player_base_hai';
import { Naki } from './common/naki';
import { useState } from 'react';
import { BaseHaiOpen } from './common/base_hai_open';

type BoardProp = {
    allPai: AllPaiProp;
    setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>;
    boardStatus: string;
    setBoardStatus: React.Dispatch<React.SetStateAction<string>>;
}

export const execHaiOpen = (haiOpen:boolean, setHaiOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setHaiOpen(!haiOpen)
}

export const Board = ({allPai, setAllPai, boardStatus, setBoardStatus}: BoardProp) => {
    const ownPai = allPai.own;
    const player1Pai = allPai.player1;
    const player2Pai = allPai.player2;
    const player3Pai = allPai.player3;
    const [haiOpen, setHaiOpen] = useState(false);
    // 表示
    return <>
            <div className={style.board}>
            <>
                {/* 自陣 */}
                <div className={style.ownPaiBaseField}>
                    <OwnBaseHai allPai={allPai} setAllPai={setAllPai} base={ownPai.base} boardStatus={boardStatus} setBoardStatus={setBoardStatus} />
                </div>

                {/* 鳴き */}
                <div className={style.ownNakiField}>
                    <Naki naki={ownPai.naki} />
                </div>

                {/* 捨て牌 */}
                <div className={style.ownSutehaiField}>
                    <Sutehai sutehai={ownPai.sutehai}/>
                </div>

                {/* player1 */}
                {!haiOpen ? 
                <div className={style.player1PaiBaseField}>
                    <PlaterBaseHai base={player1Pai.base} />
                </div> :
                <div className={style.player1PaiBaseField}>
                    <BaseHaiOpen base={player1Pai.base}/>
                </div>}


                {/* 鳴き */}
                <div className={style.player1NakiField}>
                    <Naki naki={player1Pai.naki} />
                </div>

                {/* 捨て牌 */}
                <div className={style.player1SutehaiField}>
                    <Sutehai sutehai={player1Pai.sutehai}/>
                </div>

                {/* player2 */}
                {!haiOpen ? 
                <div className={style.player2PaiBaseField}>
                    <PlaterBaseHai base={player2Pai.base} />
                </div> :
                <div className={style.player2PaiBaseField}>
                    <BaseHaiOpen base={player2Pai.base}/>
                </div>}

                {/* 鳴き */}
                <div className={style.player2NakiField}>
                    <Naki naki={player2Pai.naki} />
                </div>

                {/* 捨て牌 */}
                <div className={style.player2SutehaiField}>
                    <Sutehai sutehai={player2Pai.sutehai}/>
                </div>

                {/* player3 */}
                {!haiOpen ? 
                <div className={style.player3PaiBaseField}>
                    <PlaterBaseHai base={player3Pai.base} />
                </div> :
                <div className={style.player3PaiBaseField}>
                    <BaseHaiOpen base={player3Pai.base}/>
                </div>}

                {/* 鳴き */}
                <div className={style.player3NakiField}>
                    <Naki naki={player3Pai.naki} />
                </div>

                {/* 捨て牌 */}
                <div className={style.player3SutehaiField}>
                    <Sutehai sutehai={player3Pai.sutehai}/>
                </div>

            </>
        </div>
        <button onClick={() => execHaiOpen(haiOpen, setHaiOpen)}>open</button>
    </>
}