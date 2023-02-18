import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Sample } from './sample'

function App() {
    return (
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path="/sample" element={<Sample />} />
        </Routes>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;