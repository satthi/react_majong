import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Sample } from './sample'
import { HanchanGame } from './sample/hanchan_game'
import { SingleGame } from './sample/single_game'
import { SingleGameManual } from './sample/single_game_manual'
import { ShantenTest } from './sample/shanten_test'

function App () {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/sample" element={<Sample />} />
        <Route path="/sample/hanchan_game" element={<HanchanGame />} />
        <Route path="/sample/single_game" element={<SingleGame />} />
        <Route path="/sample/single_game_manual" element={<SingleGameManual />} />
        <Route path="/sample/shanten_test" element={<ShantenTest />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
