import type { PaiProp } from '../../board/type'

export const isTi1able = (hai: PaiProp, sutehai: string): boolean => {
  const sutehaiMatch = sutehai.match(/^hai_([1-4])_([1-9])$/)
  if (sutehaiMatch === null) {
    return false
  }

  const sutehaiType = Number(sutehaiMatch[1])
  const sutehaiNum = Number(sutehaiMatch[2])
  if (sutehaiType === 4 || sutehaiNum <= 2) {
    return false
  }

  // 3 12 のパターン
  const targetHai1 = 'hai_' + String(sutehaiType) + '_' + String(sutehaiNum - 2)
  const targetHai2 = 'hai_' + String(sutehaiType) + '_' + String(sutehaiNum - 1)

  return hai.base.filter((b) => b === targetHai1).length >= 1 && hai.base.filter((b) => b === targetHai2).length >= 1
}

export const isTi2able = (hai: PaiProp, sutehai: string): boolean => {
  const sutehaiMatch = sutehai.match(/^hai_([1-4])_([1-9])$/)
  if (sutehaiMatch === null) {
    return false
  }

  const sutehaiType = Number(sutehaiMatch[1])
  const sutehaiNum = Number(sutehaiMatch[2])
  if (sutehaiType === 4 || sutehaiNum === 1 || sutehaiNum === 9) {
    return false
  }

  // 2 13 のパターン
  const targetHai1 = 'hai_' + String(sutehaiType) + '_' + String(sutehaiNum - 1)
  const targetHai2 = 'hai_' + String(sutehaiType) + '_' + String(sutehaiNum + 1)

  return hai.base.filter((b) => b === targetHai1).length >= 1 && hai.base.filter((b) => b === targetHai2).length >= 1
}

export const isTi3able = (hai: PaiProp, sutehai: string): boolean => {
  const sutehaiMatch = sutehai.match(/^hai_([1-4])_([1-9])$/)
  if (sutehaiMatch === null) {
    return false
  }

  const sutehaiType = Number(sutehaiMatch[1])
  const sutehaiNum = Number(sutehaiMatch[2])
  if (sutehaiType === 4 || sutehaiNum >= 8) {
    return false
  }

  // 1 23 のパターン
  const targetHai1 = 'hai_' + String(sutehaiType) + '_' + String(sutehaiNum + 1)
  const targetHai2 = 'hai_' + String(sutehaiType) + '_' + String(sutehaiNum + 2)

  return hai.base.filter((b) => b === targetHai1).length >= 1 && hai.base.filter((b) => b === targetHai2).length >= 1
}
