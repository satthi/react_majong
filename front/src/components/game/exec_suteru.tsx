
import type { AllPaiProp } from '../board/type'

export const execSuteru = (allPai: any, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, user: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>, suteruKey: number, yama: string[]): void => {
  const suteruHai = allPai[user].base.splice(suteruKey, 1)

  allPai[user].base = allPai[user].base.sort() // 最後ソートして配置
  // @todo: リーチを考慮
  allPai[user].sutehai = allPai[user].sutehai.concat({ hai: suteruHai, type: 'normal' }) // type は後で調整が必要
  setAllPai(allPai)

  const userKey = Object.keys(allPai).findIndex((e) => e === user)
  let nextKey = userKey + 1
  if (typeof Object.keys(allPai)[nextKey] === 'undefined') {
    nextKey = 0
  }

  // @todo: ポンやチーなど

  // 次の人にターンを回す
  setTimeout(() => {
    if (yama.length > 14) {
      setBoardStatus('turn_' + Object.keys(allPai)[nextKey])
    } else {
      // 14マイに到達したら流局
      setBoardStatus('ryukyoku')
    }
  }, 500)
}
