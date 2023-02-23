import style from './base_hai.module.css'
import { getHaiSrc } from '../hai/hai_info'
import type { AllPaiProp, HaiInfoProp, PaiProp, SuteType } from '../type'
import { execSuteru } from '../../game/exec_suteru'
import { shantenBase } from '../../game/shanten_base'

interface OwnBaseHaiProp {
  allPai: AllPaiProp
  setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>
  base: string[]
  boardStatus: string
  setBoardStatus: React.Dispatch<React.SetStateAction<string>>
  yama: string[]
  shanten: number
  machi: HaiInfoProp[]
  reachMode: boolean
  setReachMode: React.Dispatch<React.SetStateAction<boolean>>
}

const execOwnSuteru = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, haiKey: number, yama: string[], reachMode: boolean, setReachMode: React.Dispatch<React.SetStateAction<boolean>>): void => {
  const turnUserMatch = boardStatus.match(/^think_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (turnUserMatch === null) {
    return
  }

  const turnUser = turnUserMatch[1]
  if (turnUser === 'own') {
    // 捨てる

    let suteType: SuteType = 'normal'
    // リーチモードの場合はリーチする
    if (reachMode) {
      // その牌を切ったときにテンパイするか確認。しないときは反応なし
      const checkHaiInfo: PaiProp = JSON.parse(JSON.stringify(allPai[turnUser]))
      checkHaiInfo.base.splice(haiKey, 1)
      const shantenInfo = shantenBase(checkHaiInfo)
      // 切ったらテンパイが崩れる
      if (shantenInfo.shanten !== 0) {
        return
      }

      suteType = 'reach'
      setReachMode(false)
    }

    // リーチ時はツモ切りのみ
    if (allPai.own.isReach === true && haiKey !== allPai.own.base.length - 1) {
      return
    }

    execSuteru(allPai, setAllPai, 'own', setBoardStatus, haiKey, yama, suteType)
  }
}

export const OwnBaseHai = ({ allPai, setAllPai, base, boardStatus, setBoardStatus, yama, shanten, machi, reachMode, setReachMode }: OwnBaseHaiProp): JSX.Element => {
  return <>
    {base.map((basePai, haiKey) => {
      return <div key={haiKey} className={style.basePai}>
        {/* eslint-disable-next-line */}
        <img src={getHaiSrc(basePai, 0)} onClick={() => execOwnSuteru(allPai, setAllPai, boardStatus, setBoardStatus, haiKey, yama, reachMode, setReachMode)}/>
      </div>
    })}
    <div className={style.shanten}>
      {shanten === -1 && <>上がり</>}
      {shanten === 0 && <>テンパイ</>}
      {shanten > 0 && shanten !== 99 && <>{shanten}シャンテン</>}
      {machi.length > 0 &&
        <span className={style.machi}>
          待ち：
          {machi.map((m, k) => {
            return <img src={getHaiSrc(m.hai, 1)} key={k} height='30px' />
          })}
        </span>
      }

    </div>
  </>
}
