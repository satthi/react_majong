export const setTsumo = (allPai: any, user: string, setBoardStatus: React.Dispatch<React.SetStateAction<string>>): void => {
  // 上がり状態以外はツモできない
  if (allPai[user].shanten !== -1) {
    return
  }
  setBoardStatus('agari_tsumo_' + user)
}
