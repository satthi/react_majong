import style from './board.module.css'
import type { AllPaiProp, PaiProp, TensuInfoProp, UserProp } from './type'
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
import { shantenBase } from '../game/shanten_base'

interface BoardProp {
  allPai: AllPaiProp
  setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>
  boardStatus: string
  setBoardStatus: React.Dispatch<React.SetStateAction<string>>
  yama: string[]
  bakaze: number
  kyoku: number
  hon: number
  reach: number
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

const execOwnRon = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], bakaze: number): void => {
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
  allPai.own.nakiCheck.ti = false
  allPai.own.nakiCheck.kan = false
  setAllPai(allPai)
  shantenCheck(allPai, setAllPai, yama, bakaze, 'own')

  // 判定を進める
  execNaki(allPai, setAllPai, nakiUser, setBoardStatus, yama, suteruhai, bakaze)
}

const execOwnCancel = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], bakaze: number): void => {
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
  allPai.own.nakiCheck.ti = false
  allPai.own.nakiCheck.kan = false
  setAllPai(allPai)
  shantenCheck(allPai, setAllPai, yama, bakaze, 'own')

  // 判定を進める
  execNaki(allPai, setAllPai, nakiUser, setBoardStatus, yama, suteruhai, bakaze)
}

const displayAgariInfo = (boardStatus: string, allPai: AllPaiProp, bakaze: number, yama: string[]): string => {
  // console.log(boardStatus)
  // console.log(allPai)
  // console.log(bakaze)
  // console.log(yama)
  const agariMatch = boardStatus.match(/^agari_(tsumo|ron)_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (agariMatch === null) {
    return ''
  }

  const agariUser = agariMatch[2] as UserProp
  const agariStatus = agariMatch[1]

  // 上がり情報の内訳取得
  const agariPaiInfo = allPai[agariUser]
  console.log(agariPaiInfo)

  const checkHaiInfo: PaiProp = JSON.parse(JSON.stringify(allPai[agariUser]))
  const agariHai = checkHaiInfo.base.splice(checkHaiInfo.base.length - 1, 1)

  const shantenInfoMentsu = shantenBase(checkHaiInfo, yama, bakaze, checkHaiInfo.jikaze)

  let agariInfo: TensuInfoProp = {
    fu: 0,
    han: 0,
    yakuman: 0,
    yakuList: []
  }
  shantenInfoMentsu.mentsuGroup.forEach((g) => {
    g.machi.forEach((m) => {
      if (m.haiInfo.hai === agariHai[0]) {
        if (agariStatus === 'tsumo') {
          if (agariInfo.han < m.tensu.tsumo.han || (agariInfo.han === m.tensu.tsumo.han && agariInfo.fu < m.tensu.tsumo.fu)) {
            agariInfo = m.tensu.tsumo
          }
        } else {
          if (agariInfo.han < m.tensu.ron.han || (agariInfo.han === m.tensu.ron.han && agariInfo.fu < m.tensu.ron.fu)) {
            agariInfo = m.tensu.ron
          }
        }
      }
    })
  })

  let agariString = ''
  agariString += '上がり: ' + agariUser + '/' + agariStatus + '<br />'
  agariString += String(agariInfo.fu) + '符' + String(agariInfo.han) + '翻<br />'
  agariString += agariInfo.yakuList.join('<br />')

  return agariString
}

export const Board = ({ allPai, setAllPai, boardStatus, setBoardStatus, yama, bakaze, kyoku, hon, reach }: BoardProp): JSX.Element => {
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
              <OwnBaseHai allPai={allPai} setAllPai={setAllPai} base={ownPai.base} boardStatus={boardStatus} setBoardStatus={setBoardStatus} yama={yama}shanten={ownPai.shantenInfo.shanten} machi={ownPai.shantenInfo.machi} reachMode={reachMode} setReachMode={setReachMode} bakaze={bakaze} />
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
            {boardStatus === 'agari_tsumo_own' && <>ツモ</>}
            {boardStatus === 'agari_ron_own' && <>ロン</>}
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

          {/* リーチ棒 */}
          {/* eslint-disable-next-line */}
          {allPai.player1.isReach &&
            <div className={style.player1ReachField}>
              <img src={b_1_1} />
            </div>
          }

          {/* メッセージ枠 */}
          <div className={style.player1MessageField}>
            {boardStatus === 'agari_tsumo_player1' && <>player1 ツモ</>}
            {boardStatus === 'agari_ron_player1' && <>player1 ロン</>}
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

          {/* リーチ棒 */}
          {/* eslint-disable-next-line */}
          {allPai.player2.isReach &&
            <div className={style.player2ReachField}>
              <img src={b_1_2} />
            </div>
          }

          {/* メッセージ枠 */}
          <div className={style.player2MessageField}>
            {boardStatus === 'agari_tsumo_player2' && <>player2 ツモ</>}
            {boardStatus === 'agari_ron_player2' && <>player2 ロン</>}
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

          {/* リーチ棒 */}
          {/* eslint-disable-next-line */}
          {allPai.player3.isReach &&
          <div className={style.player3ReachField}>
              <img src={b_1_1} />
            </div>
          }

          {/* メッセージ枠 */}
          <div className={style.player3MessageField}>
            {boardStatus === 'agari_tsumo_player3' && <>player3 ツモ</>}
            {boardStatus === 'agari_ron_player3' && <>player3 ロン</>}
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
                    (boardStatus === 'agari_tsumo_own' || boardStatus === 'agari_ron_own') && allPai.own.isReach
                  ) ||
                  (
                    (boardStatus === 'agari_tsumo_player1' || boardStatus === 'agari_ron_player1') && allPai.player1.isReach
                  ) ||
                  (
                    (boardStatus === 'agari_tsumo_player2' || boardStatus === 'agari_ron_player2') && allPai.player2.isReach
                  ) ||
                  (
                    (boardStatus === 'agari_tsumo_player3' || boardStatus === 'agari_ron_player3') && allPai.player3.isReach
                  )
                )
                  ? <DoraReach yama={yama} />
                  : <DoraNormal yama={yama} />
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
          <tr>
            <>
              {/* @todo: リーチ可能かどうかの判定 */}
              {!isReachable(ownPai, boardStatus) && <td className={style.controlGray}>リーチ</td>}
              {/* eslint-disable-next-line */}
              {isReachable(ownPai, boardStatus) && reachMode && <td className={style.controlRed} onClick={() => execOwnReachMode(reachMode, setReachMode)}>リーチ</td>}
              {/* eslint-disable-next-line */}
              {isReachable(ownPai, boardStatus) && !reachMode && <td className={style.controlGreen} onClick={() => execOwnReachMode(reachMode, setReachMode)}>リーチ</td>}
            </>
          </tr>
          <tr>
            {(ownPai.shantenInfo.shanten !== -1 || boardStatus.match(/^agari_/) !== null) && <td className={style.controlGray}>ツモ</td>}
            {/* eslint-disable-next-line */}
            {ownPai.shantenInfo.shanten === -1 && boardStatus.match(/^agari_/) === null && <td className={style.controlGreen} onClick={() => execOwnTsumo(allPai, setBoardStatus)}>ツモ</td>}
          </tr>
          <tr>
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) !== null || !ownPai.nakiCheck.ron) && <td className={style.controlGray}>ロン</td>}
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) === null && ownPai.nakiCheck.ron) && <td className={style.controlGreen} onClick={() => execOwnRon(allPai, setAllPai, boardStatus, setBoardStatus, yama, bakaze)}>ロン</td>}
          </tr>
          <tr>
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) !== null || (!ownPai.nakiCheck.ron && !ownPai.nakiCheck.pon && !ownPai.nakiCheck.ti && !ownPai.nakiCheck.kan)) && <td className={style.controlGray}>キャンセル</td>}
            {/* eslint-disable-next-line */}
            {boardStatus.match(/^agari_/) === null && ((ownPai.nakiCheck.ron || ownPai.nakiCheck.pon || ownPai.nakiCheck.ti || ownPai.nakiCheck.kan)) && <td className={style.controlRed} onClick={() => execOwnCancel(allPai, setAllPai, boardStatus, setBoardStatus, yama, bakaze)}>キャンセル</td>}
          </tr>
        </tbody>
      </table>
      <div dangerouslySetInnerHTML={{ __html: displayAgariInfo(boardStatus, allPai, bakaze, yama) }} />
    </div>
  </>
}
