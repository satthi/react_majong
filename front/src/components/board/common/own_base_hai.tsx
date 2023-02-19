import style from './base_hai.module.css'
import { getHaiSrc } from '../hai/hai_info'
import type { AllPaiProp } from '../type'
import { execSuteru } from '../../game'

interface OwnBaseHaiProp {
  allPai: AllPaiProp
  setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>
  base: string[]
  boardStatus: string
  setBoardStatus: React.Dispatch<React.SetStateAction<string>>
}

const execOwnSuteru = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, boardStatus: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, haiKey: number): void => {
  const turnUserMatch = boardStatus.match(/^think_(own|player1|player2|player3)$/)
  // マッチしないときは何もしない
  if (turnUserMatch === null) {
    return
  }

  const turnUser = turnUserMatch[1]
  if (turnUser === 'own') {
    // 捨てた後に固定実行
    execSuteru(allPai, setAllPai, 'own', setBoardStatus, haiKey)
    // setBoardStatus('turn_player1')
  }
}

export const OwnBaseHai = ({ allPai, setAllPai, base, boardStatus, setBoardStatus }: OwnBaseHaiProp): JSX.Element => {
  return <>
    {base.map((basePai, haiKey) => {
      return <div key={haiKey} className={style.basePai}>
        {/* eslint-disable-next-line */}
        <img src={getHaiSrc(basePai, 0)} onClick={() => execOwnSuteru(allPai, setAllPai, boardStatus, setBoardStatus, haiKey)}/>
      </div>
    })}
  </>
}
