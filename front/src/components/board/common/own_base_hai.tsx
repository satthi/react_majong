import style from './base_hai.module.css'
import { getHaiSrc } from '../hai/hai_info'
import type { AllPaiProp, GameMapProp, MachiInfoProp, PaiProp, SuteType } from '../type'
import { execSuteru } from '../../game/exec_suteru'
import { shantenBase } from '../../game/shanten_base'

interface OwnBaseHaiProp {
  allPai: AllPaiProp
  setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>
  base: string[]
  boardStatus: string
  setBoardStatus: React.Dispatch<React.SetStateAction<string>>
  yama: string[]
  setYama: React.Dispatch<React.SetStateAction<string[]>>
  shanten: number
  machi: MachiInfoProp[]
  reachMode: boolean
  setReachMode: React.Dispatch<React.SetStateAction<boolean>>
  bakaze: number
  setExecUser: React.Dispatch<React.SetStateAction<string>>
  gameMap: GameMapProp
  setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>
}

const execOwnSuteru = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, haiKey: number, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, reachMode: boolean, setReachMode: React.Dispatch<React.SetStateAction<boolean>>, bakaze: number, setExecUser: React.Dispatch<React.SetStateAction<string>>, gameMap: GameMapProp, setGameMap: React.Dispatch<React.SetStateAction<GameMapProp>>): void => {
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
      const shantenInfo = shantenBase(allPai, checkHaiInfo, yama, bakaze, checkHaiInfo.jikaze)
      // 切ったらテンパイが崩れる
      if (shantenInfo.shanten !== 0) {
        return
      }

      suteType = 'reach'
      setReachMode(false)
    }

    // リーチ時はツモ切りのみ
    // eslint-disable-next-line
    if (allPai.own.isReach && haiKey !== allPai.own.base.length - 1) {
      return
    }
    execSuteru(allPai, setAllPai, 'own', boardStatus, setBoardStatus, haiKey, yama, setYama, suteType, false, bakaze, setExecUser, gameMap, setGameMap)
  }
}

export const OwnBaseHai = ({ allPai, setAllPai, base, boardStatus, setBoardStatus, yama, setYama, shanten, machi, reachMode, setReachMode, bakaze, setExecUser, gameMap, setGameMap }: OwnBaseHaiProp): JSX.Element => {
  return <>
    {base.map((basePai, haiKey) => {
      return <div key={haiKey} className={style.basePai}>
        <img src={getHaiSrc(basePai, 0)} onClick={() => { execOwnSuteru(allPai, setAllPai, boardStatus, setBoardStatus, haiKey, yama, setYama, reachMode, setReachMode, bakaze, setExecUser, gameMap, setGameMap) }}/>
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
            return <img src={getHaiSrc(m.haiInfo.hai, 1)} key={k} height='30px' />
          })}
        </span>
      }

    </div>
  </>
}
