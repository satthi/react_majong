import React from 'react';
import ReactDOM from 'react-dom/client';
import style from './board.module.css'
import ms1_0 from './hai/p_ms1_0.gif';
import ms1_1 from './hai/p_ms1_1.gif';
import ms1_3 from './hai/p_ms1_3.gif';
import bk_1 from './hai/p_bk_1.gif';
import bk_5 from './hai/p_bk_5.gif';
import { PaiProp } from './type';

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
                {ownPai.base.map((ownBasePai) => {
                    return <div className={style.ownBasePai}><img src={ms1_0} /></div>
                })}
            </div>
            {/* 鳴き */}
            
            {ownPai.naki.map((ownNakiPai, ownNakiCount) => {
                return <div>
                    <div className={`${style['ownPaiNakiField' + ownNakiCount]}`}>
                        {ownNakiPai.key.type === 'left' && 
                            <>
                                <div className={style.ownNakiPai}><img src={ms1_3} /></div>
                                {ownNakiPai.hai.map((ownNakiOther) => {
                                    return <div className={style.ownNakiPai}><img src={ms1_1} /></div>
                                })}
                            </>
                        }
                        {ownNakiPai.key.type === 'right' && 
                            <>
                                {ownNakiPai.hai.map((ownNakiOther) => {
                                    return <div className={style.ownNakiPai}><img src={ms1_1} /></div>
                                })}
                                <div className={style.ownNakiPai}><img src={ms1_3} /></div>
                            </>
                        }
                        {ownNakiPai.key.type === 'center' && 
                            <>
                                {ownNakiPai.hai.map((ownNakiOther) => {
                                    return <>
                                        {ownNakiOther.position === 2 && <div className={style.ownNakiPai}><img src={ms1_3} /></div>}
                                        <div className={style.ownNakiPai}><img src={ms1_1} /></div>
                                    </>
                                })}
                                
                            </>
                        }
                        {ownNakiPai.key.type === 'ankan' && 
                            <>
                                <div className={style.ownNakiPai}><img src={bk_1} /></div>
                                {ownNakiPai.hai.map((ownNakiOther) => {
                                    return <>
                                        <div className={style.ownNakiPai}>
                                            {ownNakiOther.position === 3 ? <img src={bk_1} /> : <img src={ms1_1} /> }
                                        </div>
                                    </>
                                })}
                            </>
                        }

                    </div>

                </div>
            })}

            {/* 捨て牌 */}
            <div className={style.ownSutehaiField}>
                {ownPai.sutehai.map((ownSutehaiPai) => {
                    return <div className={style.ownSutehai}>
                        {ownSutehaiPai.type === 'normal' ? <img src={ms1_1} /> : <img src={ms1_3} /> }
                    </div>
                })}
            </div>

            {/* player1 */}
            <div className={style.player1PaiBaseField}>
                {player1Pai.base.map((player1Pai) => {
                    return <div className={style.player1BasePai}><img src={bk_5} /></div>
                })}
            </div>

            {/* 鳴き */}
            {player1Pai.naki.map((player1NakiPai, player1NakiCount) => {
                return <div>
                    <div className={`${style['player1PaiNakiField' + player1NakiCount]}`}>
                        {player1NakiPai.key.type === 'left' && 
                            <>
                                <div className={style.player1NakiPai}><img src={ms1_3} /></div>
                                {player1NakiPai.hai.map((player1NakiOther) => {
                                    return <div className={style.player1NakiPai}><img src={ms1_1} /></div>
                                })}
                            </>
                        }
                        {player1NakiPai.key.type === 'right' && 
                            <>
                                {player1NakiPai.hai.map((player1NakiOther) => {
                                    return <div className={style.player1NakiPai}><img src={ms1_1} /></div>
                                })}
                                <div className={style.player1NakiPai}><img src={ms1_3} /></div>
                            </>
                        }
                        {player1NakiPai.key.type === 'center' && 
                            <>
                                {player1NakiPai.hai.map((player1NakiOther) => {
                                    return <>
                                        {player1NakiOther.position === 2 && <div className={style.player1NakiPai}><img src={ms1_3} /></div>}
                                        <div className={style.player1NakiPai}><img src={ms1_1} /></div>
                                    </>
                                })}
                                
                            </>
                        }
                        {player1NakiPai.key.type === 'ankan' && 
                            <>
                                <div className={style.player1NakiPai}><img src={bk_1} /></div>
                                {player1NakiPai.hai.map((player1NakiOther) => {
                                    return <>
                                        <div className={style.player1NakiPai}>
                                            {player1NakiOther.position === 3 ? <img src={bk_1} /> : <img src={ms1_1} /> }
                                        </div>
                                    </>
                                })}
                            </>
                        }

                    </div>

                </div>
            })}

            {/* 捨て牌 */}
            <div className={style.player1SutehaiField}>
                {player1Pai.sutehai.map((player1SutehaiPai) => {
                    return <div className={style.player1Sutehai}>
                        {player1SutehaiPai.type === 'normal' ? <img src={ms1_1} /> : <img src={ms1_3} /> }
                    </div>
                })}
            </div>


            {/* player2 */}
            <div className={style.player2PaiBaseField}>
                {player2Pai.base.map((player2Pai) => {
                    return <div className={style.player2BasePai}><img src={bk_5} /></div>
                })}
            </div>

            {/* 鳴き */}
            {player2Pai.naki.map((player2NakiPai, player2NakiCount) => {
                return <div>
                    <div className={`${style['player2PaiNakiField' + player2NakiCount]}`}>
                        {player2NakiPai.key.type === 'left' && 
                            <>
                                <div className={style.player2NakiPai}><img src={ms1_3} /></div>
                                {player2NakiPai.hai.map((player2NakiOther) => {
                                    return <div className={style.player2NakiPai}><img src={ms1_1} /></div>
                                })}
                            </>
                        }
                        {player2NakiPai.key.type === 'right' && 
                            <>
                                {player2NakiPai.hai.map((player2NakiOther) => {
                                    return <div className={style.player2NakiPai}><img src={ms1_1} /></div>
                                })}
                                <div className={style.player2NakiPai}><img src={ms1_3} /></div>
                            </>
                        }
                        {player2NakiPai.key.type === 'center' && 
                            <>
                                {player2NakiPai.hai.map((player2NakiOther) => {
                                    return <>
                                        {player2NakiOther.position === 2 && <div className={style.player2NakiPai}><img src={ms1_3} /></div>}
                                        <div className={style.player2NakiPai}><img src={ms1_1} /></div>
                                    </>
                                })}
                                
                            </>
                        }
                        {player2NakiPai.key.type === 'ankan' && 
                            <>
                                <div className={style.player2NakiPai}><img src={bk_1} /></div>
                                {player2NakiPai.hai.map((player2NakiOther) => {
                                    return <>
                                        <div className={style.player2NakiPai}>
                                            {player2NakiOther.position === 3 ? <img src={bk_1} /> : <img src={ms1_1} /> }
                                        </div>
                                    </>
                                })}
                            </>
                        }

                    </div>

                </div>
            })}

            {/* 捨て牌 */}
            <div className={style.player2SutehaiField}>
                {player2Pai.sutehai.map((player2SutehaiPai) => {
                    return <div className={style.player2Sutehai}>
                        {player2SutehaiPai.type === 'normal' ? <img src={ms1_1} /> : <img src={ms1_3} /> }
                    </div>
                })}
            </div>


            {/* player3 */}
            <div className={style.player3PaiBaseField}>
                {player3Pai.base.map((player3Pai) => {
                    return <div className={style.player3BasePai}><img src={bk_5} /></div>
                })}
            </div>

            {/* 鳴き */}
            {player3Pai.naki.map((player3NakiPai, player3NakiCount) => {
                return <div>
                    <div className={`${style['player3PaiNakiField' + player3NakiCount]}`}>
                        {player3NakiPai.key.type === 'left' && 
                            <>
                                <div className={style.player3NakiPai}><img src={ms1_3} /></div>
                                {player3NakiPai.hai.map((player3NakiOther) => {
                                    return <div className={style.player3NakiPai}><img src={ms1_1} /></div>
                                })}
                            </>
                        }
                        {player3NakiPai.key.type === 'right' && 
                            <>
                                {player3NakiPai.hai.map((player3NakiOther) => {
                                    return <div className={style.player3NakiPai}><img src={ms1_1} /></div>
                                })}
                                <div className={style.player3NakiPai}><img src={ms1_3} /></div>
                            </>
                        }
                        {player3NakiPai.key.type === 'center' && 
                            <>
                                {player3NakiPai.hai.map((player3NakiOther) => {
                                    return <>
                                        {player3NakiOther.position === 2 && <div className={style.player3NakiPai}><img src={ms1_3} /></div>}
                                        <div className={style.player3NakiPai}><img src={ms1_1} /></div>
                                    </>
                                })}
                                
                            </>
                        }
                        {player3NakiPai.key.type === 'ankan' && 
                            <>
                                <div className={style.player3NakiPai}><img src={bk_1} /></div>
                                {player3NakiPai.hai.map((player3NakiOther) => {
                                    return <>
                                        <div className={style.player3NakiPai}>
                                            {player3NakiOther.position === 3 ? <img src={bk_1} /> : <img src={ms1_1} /> }
                                        </div>
                                    </>
                                })}
                            </>
                        }

                    </div>

                </div>
            })}

            {/* 捨て牌 */}
            <div className={style.player3SutehaiField}>
                {player3Pai.sutehai.map((player3SutehaiPai) => {
                    return <div className={style.player3Sutehai}>
                        {player3SutehaiPai.type === 'normal' ? <img src={ms1_1} /> : <img src={ms1_3} /> }
                    </div>
                })}
            </div>

        </>
    </div>
}