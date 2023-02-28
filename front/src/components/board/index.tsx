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
import { isAnkanableList } from '../game/detection/is_ankanable_list'
import { execAnkan } from '../game/exec_ankan'
import { getKanCount } from '../game/detection/get_kan_count'

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

const execOwnRon = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean): void => {
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
  execNaki(allPai, setAllPai, nakiUser, boardStatus, setBoardStatus, yama, setYama, suteruhai, bakaze, setExecUser, ownAuto)
}

const execOwnPon = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean): void => {
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
  execNaki(allPai, setAllPai, nakiUser, boardStatus, setBoardStatus, yama, setYama, suteruhai, bakaze, setExecUser, ownAuto)
}

const execOwnMinkan = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean): void => {
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
  execNaki(allPai, setAllPai, nakiUser, boardStatus, setBoardStatus, yama, setYama, suteruhai, bakaze, setExecUser, ownAuto)
}

const execOwnAnkan = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, kanPai: string, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>): void => {
  // @todo: 直実行だと画面の再描画がされないのでやり方を考える必要あり
  execAnkan(allPai, setAllPai, 'own', kanPai, boardStatus, setBoardStatus, setExecUser)
}

const execOwnTi1 = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean): void => {
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
  execNaki(allPai, setAllPai, nakiUser, boardStatus, setBoardStatus, yama, setYama, suteruhai, bakaze, setExecUser, ownAuto)
}

const execOwnTi2 = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean): void => {
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
  execNaki(allPai, setAllPai, nakiUser, boardStatus, setBoardStatus, yama, setYama, suteruhai, bakaze, setExecUser, ownAuto)
}

const execOwnTi3 = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean): void => {
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
  execNaki(allPai, setAllPai, nakiUser, boardStatus, setBoardStatus, yama, setYama, suteruhai, bakaze, setExecUser, ownAuto)
}

const execOwnCancel = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>, ownAuto: boolean): void => {
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
  execNaki(allPai, setAllPai, nakiUser, boardStatus, setBoardStatus, yama, setYama, suteruhai, bakaze, setExecUser, ownAuto)
}

const displayAgariInfo = (boardStatus: string, allPai: AllPaiProp, bakaze: number, yama: string[]): string => {
  const agariMatch = boardStatus.match(/^agari_(tsumo|ron)_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (agariMatch === null) {
    return ''
  }

  const agariUser = agariMatch[2] as UserProp
  const agariStatus = agariMatch[1]

  // 上がり情報の内訳取得
  const agariPaiInfo = allPai[agariUser]

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

  // ここにドラ判定を追加する
  let omoteDoraCount = 0
  let uraDoraCount = 0
  const omoteDora = getDora(yama[yama.length - 6])
  const kanDoras: string[] = []
  const kanCount = getKanCount(allPai)
  if (kanCount >= 1) {
    kanDoras.push(getDora(yama[yama.length - 8]))
  }
  if (kanCount >= 2) {
    kanDoras.push(getDora(yama[yama.length - 10]))
  }
  if (kanCount >= 3) {
    kanDoras.push(getDora(yama[yama.length - 12]))
  }
  if (kanCount >= 4) {
    kanDoras.push(getDora(yama[yama.length - 14]))
  }
  let uraDora = ''
  const uraKanDoras: string[] = []
  if (agariPaiInfo.isReach) {
    uraDora = getDora(yama[yama.length - 5])
    if (kanCount >= 1) {
      uraKanDoras.push(getDora(yama[yama.length - 7]))
    }
    if (kanCount >= 2) {
      uraKanDoras.push(getDora(yama[yama.length - 9]))
    }
    if (kanCount >= 3) {
      uraKanDoras.push(getDora(yama[yama.length - 11]))
    }
    if (kanCount >= 4) {
      uraKanDoras.push(getDora(yama[yama.length - 13]))
    }
  }

  const checkHaiList: string[] = []
  checkHaiList.concat(agariPaiInfo.base)
  agariPaiInfo.naki.forEach((n) => {
    checkHaiList.push(n.keyHai.haiInfo.hai)
    n.hai.forEach((nh) => {
      checkHaiList.push(nh.hai)
    })
  })

  checkHaiList.forEach((b) => {
    if (b === omoteDora) {
      omoteDoraCount++
    }
    kanDoras.forEach((k) => {
      if (b === k) {
        omoteDoraCount++
      }
    })
    if (b === uraDora) {
      uraDoraCount++
    }
    uraKanDoras.forEach((k) => {
      if (b === k) {
        uraDoraCount++
      }
    })
  })

  agariInfo.han += omoteDoraCount + uraDoraCount
  if (omoteDoraCount > 0) {
    agariInfo.yakuList.push('ドラ' + String(omoteDoraCount))
  }
  if (uraDoraCount > 0) {
    agariInfo.yakuList.push('裏ドラ' + String(uraDoraCount))
  }

  let agariString = ''
  agariString += '上がり: ' + agariUser + '/' + agariStatus + '<br />'
  agariString += String(agariInfo.fu) + '符' + String(agariInfo.han) + '翻<br />'
  agariString += agariInfo.yakuList.join('<br />')

  return agariString
}

export const getDora = (doraHyojiText: string): string => {
  const omoteDoraMatch = doraHyojiText.match(/^hai_([1-4])_([1-9])$/)
  // matchしないことはないはずなんだけどね
  if (omoteDoraMatch === null) {
    return ''
  }
  const doraType = Number(omoteDoraMatch[1])
  let doraNum = Number(omoteDoraMatch[2]) + 1
  // 数字牌が9の次は1
  if ((doraType === 1 || doraType === 2 || doraType === 3) && doraNum === 10) {
    doraNum = 1
  } else if (doraType === 4 && doraNum === 5) {
    // 北の次は東
    doraNum = 1
  } else if (doraType === 4 && doraNum === 8) {
    // 中の次は白
    doraNum = 5
  }
  return 'hai_' + String(doraType) + '_' + String(doraNum)
}

export const Board = ({ allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, kyoku, hon, reach, setExecUser, ownAuto }: BoardProp): JSX.Element => {
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
              <OwnBaseHai allPai={allPai} setAllPai={setAllPai} base={ownPai.base} boardStatus={boardStatus} setBoardStatus={setBoardStatus} yama={yama} shanten={ownPai.shantenInfo.shanten} machi={ownPai.shantenInfo.machi} reachMode={reachMode} setReachMode={setReachMode} bakaze={bakaze} setYama={setYama} setExecUser={setExecUser} />
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
            {(boardStatus.match(/^agari_/) === null && ownPai.nakiCheck.ron) && <td className={style.controlGreen} onClick={() => execOwnRon(allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, setExecUser, ownAuto)}>ロン</td>}
          </tr>
          <tr>
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) !== null || !ownPai.nakiCheck.pon) && <td className={style.controlGray}>ポン</td>}
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) === null && ownPai.nakiCheck.pon) && <td className={style.controlGreen} onClick={() => execOwnPon(allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, setExecUser, ownAuto)}>ポン</td>}
          </tr>
          <tr>
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) !== null || !ownPai.nakiCheck.kan) && <td className={style.controlGray}>ミンカン</td>}
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) === null && ownPai.nakiCheck.kan) && <td className={style.controlGreen} onClick={() => execOwnMinkan(allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, setExecUser, ownAuto)}>ミンカン</td>}
          </tr>
          <tr>
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) !== null || boardStatus !== 'think_own' || typeof isAnkanableList(ownPai)[0] === 'undefined') && <td className={style.controlGray}>アンカン1</td>}
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) === null && boardStatus === 'think_own' && typeof isAnkanableList(ownPai)[0] !== 'undefined') && <td className={style.controlGreen} onClick={() => execOwnAnkan(allPai, setAllPai, isAnkanableList(ownPai)[0], boardStatus, setBoardStatus, setExecUser)}>アンカン1</td>}
          </tr>
          <tr>
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) !== null || boardStatus !== 'think_own' || typeof isAnkanableList(ownPai)[1] === 'undefined') && <td className={style.controlGray}>アンカン2</td>}
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) === null && boardStatus === 'think_own' && typeof isAnkanableList(ownPai)[1] !== 'undefined') && <td className={style.controlGreen} onClick={() => execOwnAnkan(allPai, setAllPai, isAnkanableList(ownPai)[1], boardStatus, setBoardStatus, setExecUser)}>アンカン2</td>}
          </tr>
          <tr>
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) !== null || boardStatus !== 'think_own' || typeof isAnkanableList(ownPai)[2] === 'undefined') && <td className={style.controlGray}>アンカン3</td>}
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) === null && boardStatus === 'think_own' && typeof isAnkanableList(ownPai)[2] !== 'undefined') && <td className={style.controlGreen} onClick={() => execOwnAnkan(allPai, setAllPai, isAnkanableList(ownPai)[2], boardStatus, setBoardStatus, setExecUser)}>アンカン3</td>}
          </tr>
          <tr>
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) !== null || !ownPai.nakiCheck.ti1) && <td className={style.controlGray}>チー1</td>}
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) === null && ownPai.nakiCheck.ti1) && <td className={style.controlGreen} onClick={() => execOwnTi1(allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, setExecUser, ownAuto)}>チー1</td>}
          </tr>
          <tr>
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) !== null || !ownPai.nakiCheck.ti2) && <td className={style.controlGray}>チー2</td>}
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) === null && ownPai.nakiCheck.ti2) && <td className={style.controlGreen} onClick={() => execOwnTi2(allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, setExecUser, ownAuto)}>チー2</td>}
          </tr>
          <tr>
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) !== null || !ownPai.nakiCheck.ti3) && <td className={style.controlGray}>チー3</td>}
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) === null && ownPai.nakiCheck.ti3) && <td className={style.controlGreen} onClick={() => execOwnTi3(allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, setExecUser, ownAuto)}>チー3</td>}
          </tr>
          <tr>
            {/* eslint-disable-next-line */}
            {(boardStatus.match(/^agari_/) !== null || (!ownPai.nakiCheck.ron && !ownPai.nakiCheck.pon && !ownPai.nakiCheck.ti1 && !ownPai.nakiCheck.ti2 && !ownPai.nakiCheck.ti3 && !ownPai.nakiCheck.kan)) && <td className={style.controlGray}>キャンセル</td>}
            {/* eslint-disable-next-line */}
            {boardStatus.match(/^agari_/) === null && ((ownPai.nakiCheck.ron || ownPai.nakiCheck.pon || ownPai.nakiCheck.ti1 || ownPai.nakiCheck.ti2 || ownPai.nakiCheck.ti3 || ownPai.nakiCheck.kan)) && <td className={style.controlRed} onClick={() => execOwnCancel(allPai, setAllPai, boardStatus, setBoardStatus, yama, setYama, bakaze, setExecUser, ownAuto)}>キャンセル</td>}
          </tr>
        </tbody>
      </table>
      <div dangerouslySetInnerHTML={{ __html: displayAgariInfo(boardStatus, allPai, bakaze, yama) }} />
    </div>
  </>
}
