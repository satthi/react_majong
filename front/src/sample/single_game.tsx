import { Game } from '../components/game'

export const SingleGame = (): JSX.Element => {
  return <Game oya='own' ownAuto={true} bakaze={1} kyoku={1} hon={1} reach={1} />
}
