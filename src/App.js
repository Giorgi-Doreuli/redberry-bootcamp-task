import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Landing from './Components/Landing';
import PersonalInfo from './Components/PersonalInfo'
import LaptopInfo from './Components/LaptopInfo';
import SubmitPage from './Components/SubmitPage';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route path='/personalInfo' element={<PersonalInfo/>}/>
            <Route path='/laptopInfo' element={<LaptopInfo />}/>
            <Route path='/submitPage' element={<SubmitPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
