import type { AllPaiProp, UserProp } from '../board/type'

export const initialSet = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, setExecUser: React.Dispatch<React.SetStateAction<string>>): void => {
  // とりあえず4枚ずつ配布

  for (let i = 1; i <= 3; i += 1) {
    (Object.keys(allPai) as UserProp[]).forEach((user) => {
      // 4マイずつ配布
      const catYama = yama.splice(0, 4)
      setYama(yama)

      allPai[user].base = allPai[user].base.concat(catYama)
      setAllPai(allPai)
    })
  }

  // 1枚ずつ配布
  (Object.keys(allPai) as UserProp[]).forEach((user) => {
    const catYama = yama.splice(0, 1)
    setYama(yama)

    // 1枚もらってから配列をソート
    allPai[user].base = allPai[user].base.concat(catYama).sort()
    setAllPai(allPai)
  })

  setTimeout(() => {
    // setExecUser(Object.keys(allPai)[0])
    setBoardStatus('turn_' + Object.keys(allPai)[0])
  }, 500)
}
