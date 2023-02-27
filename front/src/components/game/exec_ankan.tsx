import type { AllPaiProp, HaiInfoProp, UserProp } from '../board/type'
import { shantenCheck } from './shanten_check'

export const execAnkan = (allPai: AllPaiProp, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, user: UserProp, kanPai: string, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, bakaze: number): void => {
  const kanhaiMatch = kanPai.match(/^hai_([1-4])_([1-9])$/)
  if (kanhaiMatch === null) {
    return
  }

  const kanhaiKaiseki: HaiInfoProp = {
    hai: kanPai,
    type: Number(kanhaiMatch[1]),
    num: Number(kanhaiMatch[2])
  }

  // keyがずれる関係で一気に実行せずに4回実行する
  let cutHaiExec = false
  allPai[user].base.forEach((b, bk) => {
    // eslint-disable-next-line
    if (b === kanPai && cutHaiExec === false) {
      allPai[user].base.splice(bk, 1)
      cutHaiExec = true
    }
  })
  cutHaiExec = false
  allPai[user].base.forEach((b, bk) => {
    // eslint-disable-next-line
    if (b === kanPai && cutHaiExec === false) {
      allPai[user].base.splice(bk, 1)
      cutHaiExec = true
    }
  })
  cutHaiExec = false
  allPai[user].base.forEach((b, bk) => {
    // eslint-disable-next-line
    if (b === kanPai && cutHaiExec === false) {
      allPai[user].base.splice(bk, 1)
      cutHaiExec = true
    }
  })
  cutHaiExec = false
  allPai[user].base.forEach((b, bk) => {
    // eslint-disable-next-line
    if (b === kanPai && cutHaiExec === false) {
      allPai[user].base.splice(bk, 1)
      cutHaiExec = true
    }
  })

  // nakiHai情報にセットする
  allPai[user].naki.push({
    type: 'ankan',
    keyHai: {
      haiInfo: kanhaiKaiseki,
      position: 'none'
    },
    hai: [
      kanhaiKaiseki,
      kanhaiKaiseki,
      kanhaiKaiseki
    ]
  })
  setAllPai(allPai)
  console.log(allPai)

  // カンの分のツモ
  const catYama = yama.splice(0, 1)
  setYama(yama)

  // 1枚もらう
  allPai[user].base = allPai[user].base.concat(catYama)
  setAllPai(allPai)

  shantenCheck(allPai, setAllPai, yama, bakaze, user)
}
