import style from './board.module.css'
import { PaiProp } from './type';
import { Sutehai } from './common/sutehai';
import { OwnBaseHai } from './common/own_base_hai';
import { PlaterBaseHai } from './common/player_base_hai';
import { Naki } from './common/naki';

type BoardProp = {
    ownPai: PaiProp;
    player1Pai: PaiProp;
    player2Pai: PaiProp;
    player3Pai: PaiProp;
}
export const Board = ({ownPai, player1Pai, player2Pai, player3Pai}: BoardProp) => {

    return <div className={style.board}>
        <>
            {/* 自陣 */}
            <div className={style.ownPaiBaseField}>
                <OwnBaseHai base={ownPai.base}/>
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
            <div className={style.player1PaiBaseField}>
                <PlaterBaseHai base={player1Pai.base} />
            </div>


            {/* 鳴き */}
            <div className={style.player1NakiField}>
                <Naki naki={player1Pai.naki} />
            </div>

            {/* 捨て牌 */}
            <div className={style.player1SutehaiField}>
                <Sutehai sutehai={player1Pai.sutehai}/>
            </div>

            {/* player2 */}
            <div className={style.player2PaiBaseField}>
                <PlaterBaseHai base={player2Pai.base} />
            </div>

            {/* 鳴き */}
            <div className={style.player2NakiField}>
                <Naki naki={player2Pai.naki} />
            </div>

            {/* 捨て牌 */}
            <div className={style.player2SutehaiField}>
                <Sutehai sutehai={player2Pai.sutehai}/>
            </div>

            {/* player3 */}
            <div className={style.player3PaiBaseField}>
                <PlaterBaseHai base={player3Pai.base} />
            </div>

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
}