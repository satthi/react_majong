import { getKanCount } from '../game/detection/get_kan_count'
import { shantenBase } from '../game/shanten_base'
import { getDora } from './common/get_dora'
import type { AllPaiProp, PaiProp, TensuInfoProp, UserProp } from './type'
import style from './agari_window.module.css'
import { BaseHaiAgari } from './common/base_hai_agari'
import { NakiAgari } from './common/naki_agari'
import { DoraReach } from './common/dora_reach'
import { DoraNormal } from './common/dora_normal'

interface AgariWindowProp {
  boardStatus: string
  allPai: AllPaiProp
  bakaze: number
  yama: string[]
  kyoku: number
  hon: number
  reach: number
}

interface DisplayAgariReturnProp {
  user: UserProp
  agariPaiInfo: PaiProp
  bakaze: number
  kyoku: number
  hon: number
  reach: number
  agariStatus: string
  yakuInfo: GetYakuInfoProp
}

interface GetYakuInfoProp {
  yakuList: string[]
  fuhan: string
  tensu: string
}

const getAgariInfo = (boardStatus: string, allPai: AllPaiProp, bakaze: number, yama: string[], kyoku: number, hon: number, reach: number): DisplayAgariReturnProp | undefined => {
  const agariMatch = boardStatus.match(/^agari_(tsumo|ron)_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (agariMatch === null) {
    return
  }

  const agariUser = agariMatch[2] as UserProp
  const agariStatus = agariMatch[1]

  // 上がり情報の内訳取得
  const agariPaiInfo = allPai[agariUser]

  return {
    user: agariUser,
    agariPaiInfo,
    bakaze,
    kyoku,
    hon,
    reach,
    agariStatus,
    yakuInfo: getYakuInfo(allPai, agariUser, yama, bakaze, agariStatus)
  }
}

const getYakuInfo = (allPai: AllPaiProp, agariUser: UserProp, yama: string[], bakaze: number, agariStatus: string): GetYakuInfoProp => {
  const agariPaiInfo = allPai[agariUser]
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
      tensu: '48000点'
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

  return {
    yakuList: agariInfo.yakuList,
    fuhan: String(agariInfo.fu) + '符' + String(agariInfo.han) + '翻', // @todo: 満貫以上のテキスト表示を追加する
    tensu: '48000点'
  }
}

export const AgariWindow = ({ boardStatus, allPai, bakaze, yama, kyoku, hon, reach }: AgariWindowProp): JSX.Element => {
  // return <div dangerouslySetInnerHTML={ { __html: displayAgariInfo(boardStatus, allPai, bakaze, yama) } } />

  const agariInfo = getAgariInfo(boardStatus, allPai, bakaze, yama, kyoku, hon, reach)
  if (typeof agariInfo === 'undefined') {
    return <></>
  }

  return <div className={style.agari_window}>
    <div className={style.playerName}>{agariInfo.user}</div>
    <div className={style.tsumoRon}>ツモ</div>
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

      {hon}本場
    </div>
    <div className={style.ie}>
      {agariInfo.agariPaiInfo.jikaze === 1 && '東'}
      {agariInfo.agariPaiInfo.jikaze === 2 && '南'}
      {agariInfo.agariPaiInfo.jikaze === 3 && '西'}
      {agariInfo.agariPaiInfo.jikaze === 4 && '北'}
      家 {agariInfo.agariStatus === 'tsumo' && 'ツモ'}
      {agariInfo.agariStatus === 'ron' && 'ロン'}
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
    <div className={style.yaku} dangerouslySetInnerHTML={ { __html: agariInfo.yakuInfo.yakuList.join('<br />') } } />
    <div className={style.fu_han}>{agariInfo.yakuInfo.fuhan}</div>
    <div className={style.tensu}>{agariInfo.yakuInfo.tensu}</div>
  </div>
}
