import { getKanCount } from '../game/detection/get_kan_count'
import { shantenBase } from '../game/shanten_base'
import { getDora } from './common/get_dora'
import type { AllPaiProp, GameMapProp, PaiProp, TensuInfoProp, TensuKeisanProp, UserProp } from './type'
import style from './agari_window.module.css'
import { BaseHaiAgari } from './common/base_hai_agari'
import { NakiAgari } from './common/naki_agari'
import { DoraReach } from './common/dora_reach'
import { DoraNormal } from './common/dora_normal'
import { tensuKeisan, tensuTotal } from '../game/calc/tensu_keisan'
import b_1_2 from './parts/b_1_2.gif'
import b_8_2 from './parts/b_8_2.gif'
import { getNextUser } from './common/next_user'

interface AgariWindowProp {
  boardStatus: string
  setBoardStatus: React.Dispatch<React.SetStateAction<string>>
  allPai: AllPaiProp
  bakaze: number
  yama: string[]
  kyoku: number
  hon: number
  reach: number
  gameMap: GameMapProp
  setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>
  setIsInitialExec: React.Dispatch<React.SetStateAction<boolean>>
  setGameEndDisplay: React.Dispatch<React.SetStateAction<boolean>>
}

interface DisplayAgariReturnProp {
  user: UserProp
  agariPaiInfo: PaiProp
  bakaze: number
  kyoku: number
  hon: number
  reach: number
  agariStatus: string
  tensuMap: TensuMapProp
  tensuMove: TensuMoveProp
  yakuInfo: GetYakuInfoProp
}

interface GetYakuInfoProp {
  yakuList: string[]
  fuhan: string
  tensu: number
  tensuDetail: TensuKeisanProp
}

interface TensuMapProp {
  own: number
  player1: number
  player2: number
  player3: number
}

interface TensuMoveProp {
  own: number
  player1: number
  player2: number
  player3: number
}

const getAgariInfo = (boardStatus: string, allPai: AllPaiProp, bakaze: number, yama: string[], kyoku: number, hon: number, reach: number, gameMap: GameMapProp): DisplayAgariReturnProp | undefined => {
  const agariMatch = boardStatus.match(/^agari_(tsumo|ron)_(own|player1|player2|player3)_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (agariMatch === null) {
    return
  }

  const agariUser = agariMatch[2] as UserProp
  const ronTaishoUser = agariMatch[3] as UserProp
  const agariStatus = agariMatch[1]

  // 上がり情報の内訳取得
  const agariPaiInfo = allPai[agariUser]

  const yakuInfo = getYakuInfo(allPai, agariUser, yama, bakaze, agariStatus, hon)

  // @todo: これを最終的には外だしする
  const tensuMap = gameMap.tensu

  const tensuMove: TensuMoveProp = {
    own: 0,
    player1: 0,
    player2: 0,
    player3: 0
  }

  // リーチ棒分足しておく
  tensuMove[agariUser] = yakuInfo.tensu + reach * 1000
  if (agariStatus === 'ron') {
    tensuMove[ronTaishoUser] = yakuInfo.tensu * -1
  } else {
    // ツモ時
    // 親
    if (agariPaiInfo.jikaze === 1) {
      (Object.keys(tensuMove) as UserProp[]).forEach((u) => {
        if (u !== agariUser) {
          tensuMove[u] = yakuInfo.tensuDetail.oya.tsumo * -1
        }
      })
    } else {
      (Object.keys(tensuMove) as UserProp[]).forEach((u) => {
        if (u !== agariUser) {
          if (allPai[u].jikaze === 1) {
            tensuMove[u] = yakuInfo.tensuDetail.ko.tsumo.oya * -1
          } else {
            tensuMove[u] = yakuInfo.tensuDetail.ko.tsumo.ko * -1
          }
        }
      })
    }
  }

  return {
    user: agariUser,
    agariPaiInfo,
    bakaze,
    kyoku,
    hon,
    reach,
    agariStatus,
    tensuMap,
    tensuMove,
    yakuInfo
  }
}

const getYakuInfo = (allPai: AllPaiProp, agariUser: UserProp, yama: string[], bakaze: number, agariStatus: string, hon: number): GetYakuInfoProp => {
  const agariPaiInfo: PaiProp = JSON.parse(JSON.stringify(allPai[agariUser]))
  const checkHaiInfo: PaiProp = JSON.parse(JSON.stringify(allPai[agariUser]))
  const agariHai = checkHaiInfo.base.splice(checkHaiInfo.base.length - 1, 1)
  const shantenInfoMentsu = shantenBase(allPai, checkHaiInfo, yama, bakaze, checkHaiInfo.jikaze)

  let agariInfo: TensuInfoProp = {
    fu: 0,
    han: 0,
    yakuman: 0,
    yakuList: [],
    yakumanYakuList: []
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

  // 役満判定があるときはここで表示内容を出して終わり
  if (agariInfo.yakuman > 0) {
    let fuhanText = ''
    if (agariInfo.yakuman > 1) {
      fuhanText += String(agariInfo.yakuman) + '倍'
    }
    fuhanText += '役満'

    return {
      yakuList: agariInfo.yakumanYakuList,
      fuhan: fuhanText,
      tensu: tensuTotal(agariInfo, agariPaiInfo.jikaze, agariStatus, hon),
      tensuDetail: tensuKeisan(agariInfo, hon)
    }
  }

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

  const checkHaiList: string[] = agariPaiInfo.base
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

  return {
    yakuList: agariInfo.yakuList,
    fuhan: String(agariInfo.fu) + '符' + String(agariInfo.han) + '翻', // @todo: 満貫以上のテキスト表示を追加する
    tensu: tensuTotal(agariInfo, agariPaiInfo.jikaze, agariStatus, hon),
    tensuDetail: tensuKeisan(agariInfo, hon)
  }
}

const execNextGame = (agariInfo: DisplayAgariReturnProp, gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setIsInitialExec: React.Dispatch<React.SetStateAction<boolean>>, setGameEndDisplay: React.Dispatch<React.SetStateAction<boolean>>): void => {
  // 点数の調整
  gameMap.tensu.own = gameMap.tensu.own + agariInfo.tensuMove.own
  gameMap.tensu.player1 = gameMap.tensu.player1 + agariInfo.tensuMove.player1
  gameMap.tensu.player2 = gameMap.tensu.player2 + agariInfo.tensuMove.player2
  gameMap.tensu.player3 = gameMap.tensu.player3 + agariInfo.tensuMove.player3

  // 本場については親が上がったときは増やす
  if (agariInfo.user === gameMap.oya) {
    if (gameMap.bakaze === 2 && gameMap.kyoku === 4) {
      // 上がりやめ判定
      if (
        (agariInfo.user === 'own' || gameMap.tensu[agariInfo.user] > gameMap.tensu.own) &&
        (agariInfo.user === 'player1' || gameMap.tensu[agariInfo.user] > gameMap.tensu.player1) &&
        (agariInfo.user === 'player2' || gameMap.tensu[agariInfo.user] > gameMap.tensu.player2) &&
        (agariInfo.user === 'player3' || gameMap.tensu[agariInfo.user] > gameMap.tensu.player3)
      ) {
        // 南場の場合は終わる
        setGameMap(gameMap)
        setGameEndDisplay(true)
        setBoardStatus('end')
        return
      }
    }
    gameMap.hon += 1
  } else {
    // 子については本場をなくして次の局に
    gameMap.hon = 0
    if (gameMap.kyoku !== 4) {
      gameMap.kyoku += 1
      gameMap.oya = getNextUser(gameMap.oya)
    } else {
      if (gameMap.bakaze === 2) {
        // 南場の場合は終わる
        setGameMap(gameMap)
        setGameEndDisplay(true)
        setBoardStatus('end')
        return
      } else {
        gameMap.bakaze += 1
        gameMap.kyoku = 1
        gameMap.oya = getNextUser(gameMap.oya)
      }
    }
  }

  // リーチ棒はなくす
  gameMap.reach = 0

  setGameMap(gameMap)

  setIsInitialExec(false)
  setBoardStatus('initial')
}

export const AgariWindow = ({ boardStatus, setBoardStatus, allPai, bakaze, yama, kyoku, hon, reach, gameMap, setGameMap, setIsInitialExec, setGameEndDisplay }: AgariWindowProp): JSX.Element => {
  const agariInfo = getAgariInfo(boardStatus, allPai, bakaze, yama, kyoku, hon, reach, gameMap)
  if (typeof agariInfo === 'undefined') {
    return <></>
  }

  return <div className={style.agari_window}>
    <>
      <div className={style.playerName}>{agariInfo.user}</div>
      <div className={style.ba}>
        {bakaze === 1 && '東'}
        {bakaze === 2 && '南'}
        {bakaze === 3 && '西'}
        {bakaze === 4 && '北'}
        {kyoku === 1 && '一'}
        {kyoku === 2 && '二'}
        {kyoku === 3 && '三'}
        {kyoku === 4 && '四'}
        局
      </div>
      <div className={style.ie}>
        {agariInfo.agariPaiInfo.jikaze === 1 && '東'}
        {agariInfo.agariPaiInfo.jikaze === 2 && '南'}
        {agariInfo.agariPaiInfo.jikaze === 3 && '西'}
        {agariInfo.agariPaiInfo.jikaze === 4 && '北'}
        家 {agariInfo.agariStatus === 'tsumo' && 'ツモ'}
        {agariInfo.agariStatus === 'ron' && 'ロン'}
      </div>
      <div className={style.honInfo}>
        <img src={b_1_2} /> × {reach}<br />
        <img src={b_8_2} /> × {hon}
      </div>
      <div className={style.doraField}>
        {
          agariInfo.agariPaiInfo.isReach
            ? <DoraReach yama={yama} allPai={allPai} />
            : <DoraNormal yama={yama} allPai={allPai} />
        }
      </div>
      <div className={style.hai}>
        <BaseHaiAgari base={agariInfo.agariPaiInfo.base} />
        <NakiAgari naki={agariInfo.agariPaiInfo.naki} />
      </div>
      <div className={style.yaku}>
        {agariInfo.yakuInfo.yakuList.map((y, yk) => <div className={style.yaku_child} key={yk}>{ y }</div>)}
      </div>
      <div className={style.fu_han}>{agariInfo.yakuInfo.fuhan}</div>
      <div className={style.tensu}>{agariInfo.yakuInfo.tensu}点</div>
      <div className={style.tensuText}>{agariInfo.yakuInfo.tensuDetail.yakuText}</div>
      {/* eslint-disable-next-line */}
      <div className={style.next} onClick={() => execNextGame(agariInfo, gameMap, setGameMap, setBoardStatus, setIsInitialExec, setGameEndDisplay)}>次の局</div>
      {(Object.keys(allPai) as UserProp[]).map((user, userKey) =>
        // eslint-disable-next-line
        <div className={`${style.tensuBox} ${style['tensuBoxPosition' + userKey]}`} key={userKey}>
          <div className={style.tensuName}>{user}</div>
          <div className={style.tensuHyoji}>
            {agariInfo.tensuMap[user] + agariInfo.tensuMove[user]}
            {agariInfo.tensuMove[user] > 0 && <>(+{agariInfo.tensuMove[user]})</>}
            {agariInfo.tensuMove[user] < 0 && <>({agariInfo.tensuMove[user]})</>}
          </div>
        </div>
      )}
    </>
  </div>
}
