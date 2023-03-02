
export const getDora = (doraHyojiText: string): string => {
  const omoteDoraMatch = doraHyojiText.match(/^hai_([1-4])_([1-9])$/)
  // matchしないことはないはずなんだけどね
  if (omoteDoraMatch === null) {
    return ''
  }
  const doraType = Number(omoteDoraMatch[1])
  let doraNum = Number(omoteDoraMatch[2]) + 1
  // 数字牌が9の次は1
  if ((doraType === 1 || doraType === 2 || doraType === 3) && doraNum === 10) {
    doraNum = 1
  } else if (doraType === 4 && doraNum === 5) {
    // 北の次は東
    doraNum = 1
  } else if (doraType === 4 && doraNum === 8) {
    // 中の次は白
    doraNum = 5
  }
  return 'hai_' + String(doraType) + '_' + String(doraNum)
}
