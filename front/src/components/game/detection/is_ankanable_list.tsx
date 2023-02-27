import type { PaiProp } from '../../board/type'

export const isAnkanableList = (hai: PaiProp): string[] => {
  const kanList: string[] = []
  // これはもうanyでかんにん
  const haiCountList: any = {}
  hai.base.forEach((b) => {
    // eslint-disable-next-line
    haiCountList[b] = (haiCountList[b] || 0) as number + 1
    if (haiCountList[b] === 4) {
      kanList.push(b)
    }
  })

  return kanList
}
