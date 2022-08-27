import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Landing from './Components/Landing';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route exact path='/' element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
