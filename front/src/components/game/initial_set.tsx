import { getInitialYama } from '../board/hai/hai_info'
import type { AllPaiProp, GameMapProp, UserProp } from '../board/type'
import { shantenCheck } from './shanten_check'

export const initialSet = (setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, setYama: React.Dispatch<React.SetStateAction<string[]>>, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, gameMap: GameMapProp, setExecUser: React.Dispatch<React.SetStateAction<string>>, setAgariDisplay: React.Dispatch<React.SetStateAction<boolean>>, setRyukyokuDisplay: React.Dispatch<React.SetStateAction<boolean>>, isInitialExec: boolean, setIsInitialExec: React.Dispatch<React.SetStateAction<boolean>>): void => {
  // 既に実行ずみ
  // 今ちゃんと動いていない。最悪2回実行してもまぁいいといえばいいのでこのままにするかも
  if (isInitialExec) {
    return
  }
  // 山などの初期配置
  const newYama = getInitialYama()

  const userList: UserProp[] = ['own', 'player1', 'player2', 'player3']
  const initialSortPai: AllPaiProp = {
    own: {
      base: [],
      naki: [],
      sutehai: [],
      shantenInfo: {
        shanten: 99,
        machi: [],
        mentsuGroup: []
      },
      isReach: false,
      ippatsu: false,
      nakiCheck: {
        ron: false,
        pon: false,
        ti1: false,
        ti2: false,
        ti3: false,
        kan: false
      },
      jikaze: 0,
      kantsumo: false
    },
    player1: {
      base: [],
      naki: [],
      sutehai: [],
      shantenInfo: {
        shanten: 99,
        machi: [],
        mentsuGroup: []
      },
      isReach: false,
      ippatsu: false,
      nakiCheck: {
        ron: false,
        pon: false,
        ti1: false,
        ti2: false,
        ti3: false,
        kan: false
      },
      jikaze: 0,
      kantsumo: false
    },
    player2: {
      base: [],
      naki: [],
      sutehai: [],
      shantenInfo: {
        shanten: 99,
        machi: [],
        mentsuGroup: []
      },
      isReach: false,
      ippatsu: false,
      nakiCheck: {
        ron: false,
        pon: false,
        ti1: false,
        ti2: false,
        ti3: false,
        kan: false
      },
      jikaze: 0,
      kantsumo: false
    },
    player3: {
      base: [],
      naki: [],
      sutehai: [],
      shantenInfo: {
        shanten: 99,
        machi: [],
        mentsuGroup: []
      },
      isReach: false,
      ippatsu: false,
      nakiCheck: {
        ron: false,
        pon: false,
        ti1: false,
        ti2: false,
        ti3: false,
        kan: false
      },
      jikaze: 0,
      kantsumo: false
    }
  }

  let setSortPaiFlag = false
  let jikazeCount = 0
  userList.forEach((user) => {
    if (user === gameMap.oya) {
      setSortPaiFlag = true
    }

    if (setSortPaiFlag) {
      jikazeCount++
      initialSortPai[user] = {
        base: [],
        naki: [],
        sutehai: [],
        shantenInfo: {
          shanten: 99,
          machi: [],
          mentsuGroup: []
        },
        isReach: false,
        ippatsu: false,
        nakiCheck: {
          ron: false,
          pon: false,
          ti1: false,
          ti2: false,
          ti3: false,
          kan: false
        },
        jikaze: jikazeCount,
        kantsumo: false
      }
    }
  })
  userList.forEach((user) => {
    if (user === gameMap.oya) {
      setSortPaiFlag = false
    }

    if (setSortPaiFlag) {
      jikazeCount++
      initialSortPai[user] = {
        base: [],
        naki: [],
        sutehai: [],
        shantenInfo: {
          shanten: 99,
          machi: [],
          mentsuGroup: []
        },
        isReach: false,
        ippatsu: false,
        nakiCheck: {
          ron: false,
          pon: false,
          ti1: false,
          ti2: false,
          ti3: false,
          kan: false
        },
        jikaze: jikazeCount,
        kantsumo: false
      }
    }
  })

  // とりあえず4枚ずつ配布
  for (let i = 1; i <= 3; i += 1) {
    (Object.keys(initialSortPai) as UserProp[]).forEach((user) => {
      // 4マイずつ配布
      const catYama = newYama.splice(0, 4)

      initialSortPai[user].base = initialSortPai[user].base.concat(catYama)
    })
  }

  setExecUser('')
  setAgariDisplay(false)
  setRyukyokuDisplay(false);

  // 1枚ずつ配布
  (Object.keys(initialSortPai) as UserProp[]).forEach((user) => {
    const catYama = newYama.splice(0, 1)

    // 1枚もらってから配列をソート
    initialSortPai[user].base = initialSortPai[user].base.concat(catYama).sort()
    // シャンテン計算はしよう
    shantenCheck(initialSortPai, setAllPai, newYama, gameMap.bakaze, user)
  })
  setAllPai(initialSortPai)
  setYama(newYama)

  setTimeout(() => {
    setIsInitialExec(true)
    setBoardStatus('turn_' + Object.keys(initialSortPai)[0] + '_1')
  }, 500)
}
