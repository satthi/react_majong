import type { AllPaiProp, UserProp } from '../../board/type'

export const getKanCount = (allPai: AllPaiProp): number => {
  const kanUserList: UserProp[] = [] as UserProp[]
  (Object.keys(allPai) as UserProp[]).forEach((user: UserProp) => {
    allPai[user].naki.forEach((n) => {
      if (n.type === 'ankan' || n.type === 'minkan') {
        kanUserList.push(user)
      }
    })
  })

  const uniqueKanUserList = Array.from(new Set(kanUserList))

  return (kanUserList.length === 4 && uniqueKanUserList.length > 1) ? kanUserList.length + 1 : kanUserList.length
}
