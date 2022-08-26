import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import FirstPage from './Components/FirstPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route exact path='/' element={<FirstPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
