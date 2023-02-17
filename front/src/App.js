import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Sample } from './sample'

function App() {
    return (
      <div className="App">
        <h1>Hello React Router v6</h1>
        <BrowserRouter>
        <Routes>
          <Route path="/sample" element={<Sample />} />
        </Routes>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;