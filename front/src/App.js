import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Sample } from './sample'
import { SingleGame } from './sample/single_game'
import { ShantenTest } from './sample/shanten_test'

function App () {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/sample" element={<Sample />} />
        <Route path="/sample/single_game" element={<SingleGame />} />
        <Route path="/sample/shanten_test" element={<ShantenTest />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
