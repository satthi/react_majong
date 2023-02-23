import style from './board.module.css'
import type { AllPaiProp } from './type'
import { Sutehai } from './common/sutehai'
import { OwnBaseHai } from './common/own_base_hai'
import { PlaterBaseHai } from './common/player_base_hai'
import { Naki } from './common/naki'
import { useState } from 'react'
import { BaseHaiOpen } from './common/base_hai_open'
import { setTsumo } from './common/set_tsumo'

interface BoardProp {
  allPai: AllPaiProp
  setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>
  boardStatus: string
  setBoardStatus: React.Dispatch<React.SetStateAction<string>>
  yama: string[]
}

export const execHaiOpen = (haiOpen: boolean, setHaiOpen: React.Dispatch<React.SetStateAction<boolean>>): void => {
  setHaiOpen(!haiOpen)
}

export const execOwnTsumo = (allPai: AllPaiProp, setBoardStatus: React.Dispatch<React.SetStateAction<string>>): void => {
  setTsumo(allPai, 'own', setBoardStatus)
}

export const execOwnReachMode = (reachMode: boolean, setReachMode: React.Dispatch<React.SetStateAction<boolean>>): void => {
  setReachMode(!reachMode)
}

export const Board = ({ allPai, setAllPai, boardStatus, setBoardStatus, yama }: BoardProp): JSX.Element => {
  const ownPai = allPai.own
  const player1Pai = allPai.player1
  const player2Pai = allPai.player2
  const player3Pai = allPai.player3
  const [haiOpen, setHaiOpen] = useState(false)
  const [reachMode, setReachMode] = useState(false)

  // 表示
  return <>
    <div className={style.boardBase}>
      <div className={style.board}>
        <>
          {/* 自陣 */}
          {(boardStatus !== 'agari_ron_own' && boardStatus !== 'agari_tsumo_own')
            ? <div className={style.ownPaiBaseField}>
              <OwnBaseHai allPai={allPai} setAllPai={setAllPai} base={ownPai.base} boardStatus={boardStatus} setBoardStatus={setBoardStatus} yama={yama}shanten={ownPai.shantenInfo.shanten} machi={ownPai.shantenInfo.machi} reachMode={reachMode} setReachMode={setReachMode} />
            </div>
            : <div className={style.ownPaiBaseField}>
            <BaseHaiOpen base={ownPai.base} shanten={ownPai.shantenInfo.shanten} machi={ownPai.shantenInfo.machi} />
          </div>
        }

          {/* 鳴き */}
          <div className={style.ownNakiField}>
            <Naki naki={ownPai.naki} />
          </div>

          {/* 捨て牌 */}
          <div className={style.ownSutehaiField}>
            <Sutehai sutehai={ownPai.sutehai}/>
          </div>

          {/* player1 */}
          {(!haiOpen && boardStatus !== 'agari_ron_player1' && boardStatus !== 'agari_tsumo_player1')
            ? <div className={style.player1PaiBaseField}>
              <PlaterBaseHai base={player1Pai.base} />
            </div>
            : <div className={style.player1PaiBaseField}>
              <BaseHaiOpen base={player1Pai.base} shanten={player1Pai.shantenInfo.shanten} machi={player1Pai.shantenInfo.machi} />
            </div>
          }

          {/* 鳴き */}
          <div className={style.player1NakiField}>
            <Naki naki={player1Pai.naki} />
          </div>

          {/* 捨て牌 */}
          <div className={style.player1SutehaiField}>
            <Sutehai sutehai={player1Pai.sutehai}/>
          </div>

          {/* player2 */}
          {(!haiOpen && boardStatus !== 'agari_ron_player2' && boardStatus !== 'agari_tsumo_player2')
            ? <div className={style.player2PaiBaseField}>
              <PlaterBaseHai base={player2Pai.base} />
            </div>
            : <div className={style.player2PaiBaseField}>
              <BaseHaiOpen base={player2Pai.base} shanten={player2Pai.shantenInfo.shanten} machi={player2Pai.shantenInfo.machi} />
            </div>
          }

          {/* 鳴き */}
          <div className={style.player2NakiField}>
            <Naki naki={player2Pai.naki} />
          </div>

          {/* 捨て牌 */}
          <div className={style.player2SutehaiField}>
            <Sutehai sutehai={player2Pai.sutehai}/>
          </div>

          {/* player3 */}
          {(!haiOpen && boardStatus !== 'agari_ron_player3' && boardStatus !== 'agari_tsumo_player3')
            ? <div className={style.player3PaiBaseField}>
              <PlaterBaseHai base={player3Pai.base} />
            </div>
            : <div className={style.player3PaiBaseField}>
              <BaseHaiOpen base={player3Pai.base} shanten={player3Pai.shantenInfo.shanten} machi={player3Pai.shantenInfo.machi} />
            </div>
          }

          {/* 鳴き */}
          <div className={style.player3NakiField}>
            <Naki naki={player3Pai.naki} />
          </div>

          {/* 捨て牌 */}
          <div className={style.player3SutehaiField}>
            <Sutehai sutehai={player3Pai.sutehai}/>
          </div>

          <div className={style.info}>
            残り：{yama.length - 14} 枚
            {boardStatus === 'ryukyoku' && <>流局</>}
            {boardStatus === 'agari_tsumo_own' && <>own ツモ</>}
            {boardStatus === 'agari_ron_own' && <>own ロン</>}
            {boardStatus === 'agari_tsumo_player1' && <>player1 ツモ</>}
            {boardStatus === 'agari_ron_player1' && <>player1 ロン</>}
            {boardStatus === 'agari_tsumo_player2' && <>player2 ツモ</>}
            {boardStatus === 'agari_ron_player2' && <>player2 ロン</>}
            {boardStatus === 'agari_tsumo_player3' && <>player3 ツモ</>}
            {boardStatus === 'agari_ron_player3' && <>player3 ロン</>}
          </div>
        </>
      </div>
    </div>
    <div className={style.controlBase}>
      <table>
        <tr>
          {/* eslint-disable-next-line */}
          {haiOpen && <td onClick={() => execHaiOpen(haiOpen, setHaiOpen)} className={style.controlRed}>牌を閉じる</td>}
          {/* eslint-disable-next-line */}
          {!haiOpen && <td onClick={() => execHaiOpen(haiOpen, setHaiOpen)} className={style.controlGreen}>牌を開ける</td>}
        </tr>
        <tr>
          {/* @todo: リーチ可能かどうかの判定 */}
          {ownPai.shantenInfo.shanten !== 0 && <td className={style.controlGray}>リーチ</td>}
          {/* eslint-disable-next-line */}
          {ownPai.shantenInfo.shanten === 0 && reachMode && <td className={style.controlRed} onClick={() => execOwnReachMode(reachMode, setReachMode)}>リーチ</td>}
          {/* eslint-disable-next-line */}
          {ownPai.shantenInfo.shanten === 0 && !reachMode && <td className={style.controlGreen} onClick={() => execOwnReachMode(reachMode, setReachMode)}>リーチ</td>}
        </tr>
        <tr>
          {ownPai.shantenInfo.shanten !== -1 && <td className={style.controlGray}>ツモ</td>}
          {/* eslint-disable-next-line */}
          {ownPai.shantenInfo.shanten === -1 && <td className={style.controlGreen} onClick={() => execOwnTsumo(allPai, setBoardStatus)}>ツモ</td>}
        </tr>
      </table>
    </div>
  </>
}
