import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Sample } from './sample'
import { SingleGame } from './sample/single_game'

function App() {
    return (
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path="/sample" element={<Sample />} />
          <Route path="/sample/single_game" element={<SingleGame />} />
        </Routes>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;