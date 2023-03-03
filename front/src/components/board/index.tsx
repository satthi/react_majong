import style from './board.module.css'
import type { AllPaiProp, GameMapProp, UserProp } from './type'
import { Sutehai } from './common/sutehai'
import { OwnBaseHai } from './common/own_base_hai'
import { PlaterBaseHai } from './common/player_base_hai'
import { Naki } from './common/naki'
import { useState } from 'react'
import { BaseHaiOpen } from './common/base_hai_open'
import { setTsumo } from './common/set_tsumo'
import b_1_1 from './parts/b_1_1.gif'
import b_1_2 from './parts/b_1_2.gif'
import b_8_2 from './parts/b_8_2.gif'
import { isReachable } from '../game/detection/is_reachable'
import { shantenCheck } from '../game/shanten_check'
import { execNaki } from '../game/exec_naki'
import { DoraNormal } from './common/dora_normal'
import { DoraReach } from './common/dora_reach'
import { isAnkanableList } from '../game/detection/is_ankanable_list'
import { execAnkan } from '../game/exec_ankan'
import { isAddMinkanabkeList } from '../game/detection/is_add_minkanable_list'
import { execAddMinkan } from '../game/exec_add_minkan'
import { isTsumoable } from '../game/detection/is_tsumoable'
import { getHaiSrc } from './hai/hai_info'
import { AgariWindow } from './agari_window'
import { isAgari, isRonAgari, isTsumoAgari } from '../game/detection/is_agari'

interface BoardProp {
  allPai: AllPaiProp
  setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>
  boardStatus: string
  setBoardStatus: React.Dispatch<React.SetStateAction<string>>
  yama: string[]
  setYama: React.Dispatch<React.SetStateAction<string[]>>
  bakaze: number
  kyoku: number
  hon: number
  reach: number
  setExecUser: React.Dispatch<React.SetStateAction<string>>
  ownAuto: boolean
  agariDisplay: boolean
  gameMap: GameMapProp
  setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>
}

const execHaiOpen = (haiOpen: boolean, setHaiOpen: React.Dispatch<React.SetStateAction<boolean>>): void => {
  setHaiOpen(!haiOpen)
}

const execOwnTsumo = (allPai: AllPaiProp, setBoardStatus: React.Dispatch<React.SetStateAction<string>>): void => {
  setTsumo(allPai, 'own', setBoardStatus)
}

const execOwnReachMode = (reachMode: boolean, setReachMode: React.Dispatch<React.SetStateAction<boolean>>): void => {
  setReachMode(!reachMode)
}

const execOwnRon = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean, gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>): void => {
  // ロン牌をセットして実行
  const nakiUserMatch = boardStatus.match(/^naki_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (nakiUserMatch === null) {
    return
  }
  const nakiUser = nakiUserMatch[1] as UserProp
  const suteruhai = allPai[nakiUser].sutehai[allPai[nakiUser].sutehai.length - 1].hai

  // ロンだけ判定をonに
  allPai.own.nakiCheck.ron = true
  allPai.own.nakiCheck.pon = false
  allPai.own.nakiCheck.ti1 = false
  allPai.own.nakiCheck.ti2 = false
  allPai.own.nakiCheck.ti3 = false
  allPai.own.nakiCheck.kan = false
  setAllPai(allPai)
  shantenCheck(allPai, setAllPai, yama, bakaze, 'own')

  // 判定を進める
  execNaki(allPai, setAllPai, nakiUser, boardStatus, setBoardStatus, yama, setYama, suteruhai, bakaze, setExecUser, ownAuto, gameMap, setGameMap)
}

const execOwnPon = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean, gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>): void => {
  // ポン牌をセットして実行
  const nakiUserMatch = boardStatus.match(/^naki_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (nakiUserMatch === null) {
    return
  }
  const nakiUser = nakiUserMatch[1] as UserProp
  const suteruhai = allPai[nakiUser].sutehai[allPai[nakiUser].sutehai.length - 1].hai

  // ポンだけ判定をonに
  allPai.own.nakiCheck.ron = false
  allPai.own.nakiCheck.pon = true
  allPai.own.nakiCheck.ti1 = false
  allPai.own.nakiCheck.ti2 = false
  allPai.own.nakiCheck.ti3 = false
  allPai.own.nakiCheck.kan = false
  setAllPai(allPai)
  shantenCheck(allPai, setAllPai, yama, bakaze, 'own')

  // 判定を進める
  execNaki(allPai, setAllPai, nakiUser, boardStatus, setBoardStatus, yama, setYama, suteruhai, bakaze, setExecUser, ownAuto, gameMap, setGameMap)
}

const execOwnMinkan = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean, gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>): void => {
  // ポン牌をセットして実行
  const nakiUserMatch = boardStatus.match(/^naki_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (nakiUserMatch === null) {
    return
  }
  const nakiUser = nakiUserMatch[1] as UserProp
  const suteruhai = allPai[nakiUser].sutehai[allPai[nakiUser].sutehai.length - 1].hai

  // ポンだけ判定をonに
  allPai.own.nakiCheck.ron = false
  allPai.own.nakiCheck.pon = false
  allPai.own.nakiCheck.ti1 = false
  allPai.own.nakiCheck.ti2 = false
  allPai.own.nakiCheck.ti3 = false
  allPai.own.nakiCheck.kan = true
  setAllPai(allPai)
  shantenCheck(allPai, setAllPai, yama, bakaze, 'own')

  // 判定を進める
  execNaki(allPai, setAllPai, nakiUser, boardStatus, setBoardStatus, yama, setYama, suteruhai, bakaze, setExecUser, ownAuto, gameMap, setGameMap)
}

const execOwnAnkan = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, kanPai: string, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>): void => {
  execAnkan(allPai, setAllPai, 'own', kanPai, boardStatus, setBoardStatus, setExecUser)
}

const execOwnAddMinkan = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, kanPai: string, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>): void => {
  execAddMinkan(allPai, setAllPai, 'own', kanPai, boardStatus, setBoardStatus, setExecUser)
}

const DisplayOwnTi1 = ({ allPai, boardStatus }: { allPai: AllPaiProp, boardStatus: string }): JSX.Element => {
  // チー牌をセットして実行
  const nakiUserMatch = boardStatus.match(/^naki_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (nakiUserMatch === null) {
    return <></>
  }
  const nakiUser = nakiUserMatch[1] as UserProp
  const suteruhai = allPai[nakiUser].sutehai[allPai[nakiUser].sutehai.length - 1].hai
  const suteruHaiMatch = suteruhai.match(/^hai_([1-4])_([1-9])$/)
  if (suteruHaiMatch === null) {
    return <></>
  }

  return <>
    <img src={getHaiSrc('hai_' + suteruHaiMatch[1] + '_' + String(Number(suteruHaiMatch[2]) - 2), 1)} />
    <img src={getHaiSrc('hai_' + suteruHaiMatch[1] + '_' + String(Number(suteruHaiMatch[2]) - 1), 1)} />
  </>
}

const DisplayOwnTi2 = ({ allPai, boardStatus }: { allPai: AllPaiProp, boardStatus: string }): JSX.Element => {
  // チー牌をセットして実行
  const nakiUserMatch = boardStatus.match(/^naki_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (nakiUserMatch === null) {
    return <></>
  }
  const nakiUser = nakiUserMatch[1] as UserProp
  const suteruhai = allPai[nakiUser].sutehai[allPai[nakiUser].sutehai.length - 1].hai
  const suteruHaiMatch = suteruhai.match(/^hai_([1-4])_([1-9])$/)
  if (suteruHaiMatch === null) {
    return <></>
  }

  return <>
    <img src={getHaiSrc('hai_' + suteruHaiMatch[1] + '_' + String(Number(suteruHaiMatch[2]) - 1), 1)} />
    <img src={getHaiSrc('hai_' + suteruHaiMatch[1] + '_' + String(Number(suteruHaiMatch[2]) + 1), 1)} />
  </>
}

const DisplayOwnTi3 = ({ allPai, boardStatus }: { allPai: AllPaiProp, boardStatus: string }): JSX.Element => {
  // チー牌をセットして実行
  const nakiUserMatch = boardStatus.match(/^naki_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (nakiUserMatch === null) {
    return <></>
  }
  const nakiUser = nakiUserMatch[1] as UserProp
  const suteruhai = allPai[nakiUser].sutehai[allPai[nakiUser].sutehai.length - 1].hai
  const suteruHaiMatch = suteruhai.match(/^hai_([1-4])_([1-9])$/)
  if (suteruHaiMatch === null) {
    return <></>
  }

  return <>
    <img src={getHaiSrc('hai_' + suteruHaiMatch[1] + '_' + String(Number(suteruHaiMatch[2]) + 1), 1)} />
    <img src={getHaiSrc('hai_' + suteruHaiMatch[1] + '_' + String(Number(suteruHaiMatch[2]) + 2), 1)} />
  </>
}

const execOwnTi1 = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean, gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>): void => {
  // チー牌をセットして実行
  const nakiUserMatch = boardStatus.match(/^naki_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (nakiUserMatch === null) {
    return
  }
  const nakiUser = nakiUserMatch[1] as UserProp
  const suteruhai = allPai[nakiUser].sutehai[allPai[nakiUser].sutehai.length - 1].hai

  // ロンだけ判定をonに
  allPai.own.nakiCheck.ron = false
  allPai.own.nakiCheck.pon = false
  allPai.own.nakiCheck.ti1 = true
  allPai.own.nakiCheck.ti2 = false
  allPai.own.nakiCheck.ti3 = false
  allPai.own.nakiCheck.kan = false
  setAllPai(allPai)
  shantenCheck(allPai, setAllPai, yama, bakaze, 'own')

  // 判定を進める
  execNaki(allPai, setAllPai, nakiUser, boardStatus, setBoardStatus, yama, setYama, suteruhai, bakaze, setExecUser, ownAuto, gameMap, setGameMap)
}

const execOwnTi2 = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean, gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>): void => {
  // チー牌をセットして実行
  const nakiUserMatch = boardStatus.match(/^naki_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (nakiUserMatch === null) {
    return
  }
  const nakiUser = nakiUserMatch[1] as UserProp
  const suteruhai = allPai[nakiUser].sutehai[allPai[nakiUser].sutehai.length - 1].hai

  // ロンだけ判定をonに
  allPai.own.nakiCheck.ron = false
  allPai.own.nakiCheck.pon = false
  allPai.own.nakiCheck.ti1 = false
  allPai.own.nakiCheck.ti2 = true
  allPai.own.nakiCheck.ti3 = false
  allPai.own.nakiCheck.kan = false
  setAllPai(allPai)
  shantenCheck(allPai, setAllPai, yama, bakaze, 'own')

  // 判定を進める
  execNaki(allPai, setAllPai, nakiUser, boardStatus, setBoardStatus, yama, setYama, suteruhai, bakaze, setExecUser, ownAuto, gameMap, setGameMap)
}

const execOwnTi3 = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean, gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>): void => {
  // チー牌をセットして実行
  const nakiUserMatch = boardStatus.match(/^naki_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (nakiUserMatch === null) {
    return
  }
  const nakiUser = nakiUserMatch[1] as UserProp
  const suteruhai = allPai[nakiUser].sutehai[allPai[nakiUser].sutehai.length - 1].hai

  // ロンだけ判定をonに
  allPai.own.nakiCheck.ron = false
  allPai.own.nakiCheck.pon = false
  allPai.own.nakiCheck.ti1 = false
  allPai.own.nakiCheck.ti2 = false
  allPai.own.nakiCheck.ti3 = true
  allPai.own.nakiCheck.kan = false
  setAllPai(allPai)
  shantenCheck(allPai, setAllPai, yama, bakaze, 'own')

  // 判定を進める
  execNaki(allPai, setAllPai, nakiUser, boardStatus, setBoardStatus, yama, setYama, suteruhai, bakaze, setExecUser, ownAuto, gameMap, setGameMap)
}

const execOwnCancel = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean, gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>): void => {
  const nakiUserMatch = boardStatus.match(/^naki_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (nakiUserMatch === null) {
    return
  }
  const nakiUser = nakiUserMatch[1] as UserProp
  const suteruhai = allPai[nakiUser].sutehai[allPai[nakiUser].sutehai.length - 1].hai

  // ロンなどのフラグを全部offにして次のターンに
  allPai.own.nakiCheck.ron = false
  allPai.own.nakiCheck.pon = false
  allPai.own.nakiCheck.ti1 = false
  allPai.own.nakiCheck.ti2 = false
  allPai.own.nakiCheck.ti3 = false
  allPai.own.nakiCheck.kan = false
  setAllPai(allPai)
  shantenCheck(allPai, setAllPai, yama, bakaze, 'own')

  // 判定を進める
  execNaki(allPai, setAllPai, nakiUser, boardStatus, setBoardStatus, yama, setYama, suteruhai, bakaze, setExecUser, ownAuto, gameMap, setGameMap)
}

export const Board = ({ allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, kyoku, hon, reach, setExecUser, ownAuto, agariDisplay, gameMap, setGameMap }: BoardProp): JSX.Element => {
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
          {!isAgari(boardStatus, 'own')
            ? <div className={style.ownPaiBaseField}>
              <OwnBaseHai allPai={allPai} setAllPai={setAllPai} base={ownPai.base} boardStatus={boardStatus} setBoardStatus={setBoardStatus} yama={yama} shanten={ownPai.shantenInfo.shanten} machi={ownPai.shantenInfo.machi} reachMode={reachMode} setReachMode={setReachMode} bakaze={bakaze} setYama={setYama} setExecUser={setExecUser} gameMap={gameMap} setGameMap={setGameMap} />
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

          {/* リーチ棒 */}
          {/* eslint-disable-next-line */}
          {allPai.own.isReach &&
            <div className={style.ownReachField}>
              <img src={b_1_2} />
            </div>
          }

          {/* メッセージ枠 */}
          <div className={style.ownMessageField}>
            {isTsumoAgari(boardStatus, 'own') && <>ツモ</>}
            {isRonAgari(boardStatus, 'own') && <>ロン</>}
          </div>

          {/* 点数表示フィールド */}
          <div className={`${style.nameField} ${style.ownNameField}`}>
            <div className={style.name}>own</div>
            <div className={style.tensu}>{gameMap.tensu.own}</div>
          </div>

          {/* player1 */}
          {(!haiOpen && !isAgari(boardStatus, 'player1'))
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

          {/* リーチ棒 */}
          {/* eslint-disable-next-line */}
          {allPai.player1.isReach &&
            <div className={style.player1ReachField}>
              <img src={b_1_1} />
            </div>
          }

          {/* メッセージ枠 */}
          <div className={style.player1MessageField}>
            {isTsumoAgari(boardStatus, 'player1') && <>ツモ</>}
            {isRonAgari(boardStatus, 'player1') && <>ロン</>}
          </div>

          {/* 点数表示フィールド */}
          <div className={`${style.nameField} ${style.player1NameField}`}>
            <div className={style.name}>player1</div>
            <div className={style.tensu}>{gameMap.tensu.player1}</div>
          </div>

          {/* player2 */}
          {(!haiOpen && !isAgari(boardStatus, 'player2'))
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

          {/* リーチ棒 */}
          {/* eslint-disable-next-line */}
          {allPai.player2.isReach &&
            <div className={style.player2ReachField}>
              <img src={b_1_2} />
            </div>
          }

          {/* 点数表示フィールド */}
          <div className={`${style.nameField} ${style.player2NameField}`}>
            <div className={style.name}>player2</div>
            <div className={style.tensu}>{gameMap.tensu.player2}</div>
          </div>

          {/* メッセージ枠 */}
          <div className={style.player2MessageField}>
            {isTsumoAgari(boardStatus, 'player2') && <>ツモ</>}
            {isRonAgari(boardStatus, 'player2') && <>ロン</>}
          </div>

          {/* player3 */}
          {(!haiOpen && !isAgari(boardStatus, 'player3'))
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

          {/* リーチ棒 */}
          {/* eslint-disable-next-line */}
          {allPai.player3.isReach &&
          <div className={style.player3ReachField}>
              <img src={b_1_1} />
            </div>
          }

          {/* メッセージ枠 */}
          <div className={style.player3MessageField}>
            {isTsumoAgari(boardStatus, 'player3') && <>ツモ</>}
            {isRonAgari(boardStatus, 'player3') && <>ロン</>}
          </div>

          {/* 点数表示フィールド */}
          <div className={`${style.nameField} ${style.player3NameField}`}>
            <div className={style.name}>player3</div>
            <div className={style.tensu}>{gameMap.tensu.player3}</div>
          </div>

          <div className={style.info}>
            <div>
              {bakaze === 1 && '東'}
              {bakaze === 2 && '南'}
              {bakaze === 3 && '西'}
              {bakaze === 4 && '北'}
              {kyoku === 1 && '一'}
              {kyoku === 2 && '二'}
              {kyoku === 3 && '三'}
              {kyoku === 4 && '四'}
              局
              <div className={style.honInfo}>
                <img src={b_1_2} /> × {reach}<br />
                <img src={b_8_2} /> × {hon}
              </div>
            </div>
            <div>残り：{yama.length - 14} 枚</div>
            {boardStatus === 'ryukyoku' && <>流局</>}
            {/* ドラ */}
            <div className={style.doraField}>
              {
                (
                  (
                    isAgari(boardStatus, 'own') && allPai.own.isReach
                  ) ||
                  (
                    isAgari(boardStatus, 'player1') && allPai.player1.isReach
                  ) ||
                  (
                    isAgari(boardStatus, 'player2') && allPai.player2.isReach
                  ) ||
                  (
                    isAgari(boardStatus, 'player3') && allPai.player3.isReach
                  )
                )
                  ? <DoraReach yama={yama} allPai={allPai} />
                  : <DoraNormal yama={yama} allPai={allPai} />
              }
            </div>
          </div>
        </>
      </div>
    </div>
    <div className={style.controlBase}>
      <table>
        <tbody>
          <tr>
            {/* eslint-disable-next-line */}
            {haiOpen && <td onClick={() => execHaiOpen(haiOpen, setHaiOpen)} className={style.controlRed}>牌を閉じる</td>}
            {/* eslint-disable-next-line */}
            {!haiOpen && <td onClick={() => execHaiOpen(haiOpen, setHaiOpen)} className={style.controlGreen}>牌を開ける</td>}
          </tr>
          {isReachable(ownPai, boardStatus) &&
            <tr>
              {reachMode
                // eslint-disable-next-line
                ? <td className={style.controlRed} onClick={() => execOwnReachMode(reachMode, setReachMode)}>リーチ</td>
                // eslint-disable-next-line
                : <td className={style.controlGreen} onClick={() => execOwnReachMode(reachMode, setReachMode)}>リーチ</td>}
            </tr>
          }
          {isTsumoable(ownPai, boardStatus) &&
            <tr>
              {/* eslint-disable-next-line */}
              <td className={style.controlGreen} onClick={() => execOwnTsumo(allPai, setBoardStatus)}>ツモ</td>
            </tr>
          }
          {(boardStatus.match(/^agari_/) === null && ownPai.nakiCheck.ron) &&
            <tr>
              {/* eslint-disable-next-line */}
              <td className={style.controlGreen} onClick={() => execOwnRon(allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, setExecUser, ownAuto, gameMap, setGameMap)}>ロン</td>
            </tr>
          }
          {(boardStatus.match(/^agari_/) === null && ownPai.nakiCheck.pon) &&
            <tr>
              {/* eslint-disable-next-line */}
              <td className={style.controlGreen} onClick={() => execOwnPon(allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, setExecUser, ownAuto, gameMap, setGameMap)}>ポン</td>
            </tr>
          }
          {(boardStatus.match(/^agari_/) === null && ownPai.nakiCheck.kan) &&
          <tr>
            {/* eslint-disable-next-line */}
            <td className={style.controlGreen} onClick={() => execOwnMinkan(allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, setExecUser, ownAuto, gameMap, setGameMap)}>ミンカン</td>
          </tr>
          }
          {(boardStatus.match(/^agari_/) === null && boardStatus === 'think_own' && typeof isAnkanableList(ownPai)[0] !== 'undefined') &&
            <tr>
              {/* eslint-disable-next-line */}
              <td className={style.controlGreen} onClick={() => execOwnAnkan(allPai, setAllPai, isAnkanableList(ownPai)[0], boardStatus, setBoardStatus, setExecUser)}>カン<img src={getHaiSrc(isAnkanableList(ownPai)[0], 1)} /></td>
            </tr>
          }
          {(boardStatus.match(/^agari_/) === null && boardStatus === 'think_own' && typeof isAnkanableList(ownPai)[1] !== 'undefined') &&
            <tr>
              {/* eslint-disable-next-line */}
              <td className={style.controlGreen} onClick={() => execOwnAnkan(allPai, setAllPai, isAnkanableList(ownPai)[1], boardStatus, setBoardStatus, setExecUser)}>カン<img src={getHaiSrc(isAnkanableList(ownPai)[1], 1)} /></td>
            </tr>
          }
          {(boardStatus.match(/^agari_/) === null && boardStatus === 'think_own' && typeof isAnkanableList(ownPai)[2] !== 'undefined') &&
            <tr>
              {/* eslint-disable-next-line */}
              <td className={style.controlGreen} onClick={() => execOwnAnkan(allPai, setAllPai, isAnkanableList(ownPai)[2], boardStatus, setBoardStatus, setExecUser)}>カン<img src={getHaiSrc(isAnkanableList(ownPai)[2], 1)} /></td>
            </tr>
          }
          {(boardStatus.match(/^agari_/) === null && boardStatus === 'think_own' && typeof isAddMinkanabkeList(ownPai)[0] !== 'undefined') &&
            <tr>
              {/* eslint-disable-next-line */}
              <td className={style.controlGreen} onClick={() => execOwnAddMinkan(allPai, setAllPai, isAddMinkanabkeList(ownPai)[0], boardStatus, setBoardStatus, setExecUser)}>カン<img src={getHaiSrc(isAddMinkanabkeList(ownPai)[0], 1)} /></td>
            </tr>
          }
          {(boardStatus.match(/^agari_/) === null && boardStatus === 'think_own' && typeof isAddMinkanabkeList(ownPai)[1] !== 'undefined') &&
            <tr>
              {/* eslint-disable-next-line */}
              <td className={style.controlGreen} onClick={() => execOwnAddMinkan(allPai, setAllPai, isAddMinkanabkeList(ownPai)[1], boardStatus, setBoardStatus, setExecUser)}>カン<img src={getHaiSrc(isAddMinkanabkeList(ownPai)[1], 1)} /></td>
            </tr>
          }
          {(boardStatus.match(/^agari_/) === null && boardStatus === 'think_own' && typeof isAddMinkanabkeList(ownPai)[2] !== 'undefined') &&
            <tr>
              {/* eslint-disable-next-line */}
              <td className={style.controlGreen} onClick={() => execOwnAddMinkan(allPai, setAllPai, isAddMinkanabkeList(ownPai)[2], boardStatus, setBoardStatus, setExecUser)}>カン<img src={getHaiSrc(isAddMinkanabkeList(ownPai)[2], 1)} /></td>
            </tr>
          }
          {(boardStatus.match(/^agari_/) === null && ownPai.nakiCheck.ti1) &&
            <tr>
              {/* eslint-disable-next-line */}
              <td className={style.controlGreen} onClick={() => execOwnTi1(allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, setExecUser, ownAuto, gameMap, setGameMap)}>チー<DisplayOwnTi1 allPai={allPai} boardStatus={boardStatus} /></td>
            </tr>
          }
          {(boardStatus.match(/^agari_/) === null && ownPai.nakiCheck.ti2) &&
            <tr>
              {/* eslint-disable-next-line */}
              <td className={style.controlGreen} onClick={() => execOwnTi2(allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, setExecUser, ownAuto, gameMap, setGameMap)}>チー<DisplayOwnTi2 allPai={allPai} boardStatus={boardStatus} /></td>
            </tr>
          }
          {(boardStatus.match(/^agari_/) === null && ownPai.nakiCheck.ti3) &&
            <tr>
              {/* eslint-disable-next-line */}
              <td className={style.controlGreen} onClick={() => execOwnTi3(allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, setExecUser, ownAuto, gameMap, setGameMap)}>チー<DisplayOwnTi3 allPai={allPai} boardStatus={boardStatus} /></td>
            </tr>
          }
          <tr>
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) !== null || (!ownPai.nakiCheck.ron && !ownPai.nakiCheck.pon && !ownPai.nakiCheck.ti1 && !ownPai.nakiCheck.ti2 && !ownPai.nakiCheck.ti3 && !ownPai.nakiCheck.kan)) && <td className={style.controlGray}>キャンセル</td>}
            {/* eslint-disable-next-line */}
            {boardStatus.match(/^agari_/) === null && ((ownPai.nakiCheck.ron || ownPai.nakiCheck.pon || ownPai.nakiCheck.ti1 || ownPai.nakiCheck.ti2 || ownPai.nakiCheck.ti3 || ownPai.nakiCheck.kan)) && <td className={style.controlRed} onClick={() => execOwnCancel(allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, setExecUser, ownAuto, gameMap, setGameMap)}>キャンセル</td>}
          </tr>
        </tbody>
      </table>
      {agariDisplay &&
        <AgariWindow boardStatus={boardStatus} allPai={allPai} bakaze={bakaze} yama={yama} kyoku={kyoku} hon={hon} reach={reach} />
      }
    </div>
  </>
}
