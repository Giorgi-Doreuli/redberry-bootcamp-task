import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Landing from './Components/Landing';
import PersonalInfo from './Components/PersonalInfo'
import LaptopInfo from './Components/LaptopInfo';
import SubmitPage from './Components/SubmitPage';
import LaptopList from './Components/LaptopList';
import PersonalCard from './Components/PersonalCard';
import {useState} from 'react'

function App() {

const [image, setimage] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route path='/personalInfo' element={<PersonalInfo/>}/>
            <Route path='/laptopInfo' element={<LaptopInfo setimage={setimage}/>}/>
            <Route path='/submitPage' element={<SubmitPage image={image}/>}/>
            <Route path='/laptopList' element={<LaptopList />}/>
            <Route path='/laptopList/:idNum' element={<PersonalCard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
