import { Game } from '../components/game'

export const SingleGameManual = (): JSX.Element => {
  return <Game oya='own' ownAuto={false} bakaze={1} kyoku={1} hon={1} reach={1} />
}