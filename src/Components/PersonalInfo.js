import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import SessionStorage from './SessionStorage'
import './PersonalInfo.css'
import {IoIosArrowBack} from 'react-icons/io'
import {useNavigate} from "react-router-dom"

function PersonalInfo() {

const [teams, setTeams] = useState([]);
const [positions, setPositions] = useState([]);
const [name, setName] = SessionStorage('name', '');
const [lastName, setlastName] = SessionStorage('lastName', '');
const [teamsSelect, setTeamsSelect] = SessionStorage('teamsSelect', '');
const [positionsSelect, setPositionsSelect] = SessionStorage('positionsSelect', '');
const [email, setEmail] = SessionStorage('email', '');
const [phone, setPhone] = SessionStorage('phone', '');
const [validPhone, setValidPhone] = useState(false);
const [validEmail, setValidEmail] = useState(false);
const [validPositionsSelect, setValidPositionsSelect] = useState(false);
const [validTeamsSelect, setValidTeamsSelect] = useState(false);
const [validName, setValidname] = useState(false);
const [validlastName, setValidlastName] = useState(false);
const [nameError, setNameError] = useState('მინიმუმ 2 სიმბოლო, ქართული ასოები');
const [lastNameError, setlastNameError] = useState('მინიმუმ 2 სიმბოლო, ქართული ასოები');
const emailError = 'უნდა მთავრდებოდეს @redberry.ge-თი';
const phoneError = 'უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს';
const navigate = useNavigate();
let nameCounter = 0;
let lastNameCounter = 0;
const alphabet = ['ა', 'ბ', 'გ', 'დ', 'ე', 'ვ',
                'ზ', 'თ', 'ი', 'კ', 'ლ', 'მ', 
                'ნ', 'ო', 'პ', 'ჟ', 'რ', 'ს', 
                'ტ', 'უ', 'ფ', 'ქ', 'ღ', 'ყ', 
                'შ', 'ჩ', 'ც', 'ძ', 'წ', 'ჭ',
                'ხ', 'ჯ', 'ჰ' ];


useEffect(() =>{
    const getTeams = async () => {
        const api_url = 'https://pcfy.redberryinternship.ge/api/teams';
        const fetchTeams = await fetch(api_url);
        const fetchedTeams = await fetchTeams.json();
        setTeams(fetchedTeams.data);
    }

    const getPositions = async () => {
        const api_url = 'https://pcfy.redberryinternship.ge/api/positions';
        const fetchPositions = await fetch(api_url);
        const fetchedPositions = await fetchPositions.json();
        setPositions(fetchedPositions.data);
    }


    getTeams();
    getPositions();
}, [])

const validateTeamsSelect = () => {
    if(teamsSelect === '') {
        setValidTeamsSelect(true);
    }else {
        setValidTeamsSelect(false);
    }
}

const validatePositionsSelect = () => {
    if(positionsSelect === '') {
        setValidPositionsSelect(true);
    }else {
        setValidPositionsSelect(false);
    }
}

const validateName = (checkText) => {
    for(let i=0; i < checkText.length; i++) {
        if(alphabet.includes(checkText[i])){
            nameCounter++;
        }
    }

    if(nameCounter !== checkText.length || checkText.length < 2){
        setValidname(false);
        setNameError('გამოიყენე ქართული ასოები');
    }else{
        setValidname(true);
        setNameError('მინიმუმ 2 სიმბოლო, ქართული ასოები');
    }
    nameCounter=0;
}

const validatelastName = (checkText) => {
    for(let i=0; i < checkText.length; i++) {
        if(alphabet.includes(checkText[i])){
            lastNameCounter++;
        }
    }

    if(lastNameCounter !== checkText.length || checkText.length < 2){
        setValidlastName(false);
        setlastNameError('გამოიყენე ქართული ასოები');
    }else{
        setValidlastName(true);
        setlastNameError('მინიმუმ 2 სიმბოლო, ქართული ასოები');
    }
    lastNameCounter=0;
}

const validateEmail = (checkText) => {
    const regexpEmail = /^[\w-.]+@redberry.ge/g;
    if(checkText === email){
      if (regexpEmail.exec(checkText) !== null) {
        setValidEmail(false);
          } else {
                setValidEmail(true);
          }
    }
}

const validatePhone = (checkText) => {
    const regexpPhone = /^\+(995)[\s](5)\d{2}[\s](\d{2}[\s]){2}(\d{2})$/;
    if(checkText === phone){
      if (regexpPhone.exec(checkText) !== null) {
        setValidPhone(false);
          } else {
                  setValidPhone(true);
          }
    }
}

const nextPage = () => {
    validateName(name);
    validatelastName(lastName);
    validateTeamsSelect();
    validatePositionsSelect();
    validateEmail(email);
    validatePhone(phone);
    if(validName && validlastName && !validTeamsSelect && !validPositionsSelect && !validEmail && !validPhone) {
        navigate('/laptopInfo');
    }
}

  return (
    <div className='personalInfo'>
        <div className='prev-page'>
            <Link to='/'>
                <div className='arrow-ellipse'>
                    <IoIosArrowBack />
                </div>     
            </Link>
        </div>
        <div className='personalInfo-headers'>
            <p className='header-1'><span className='header-1-span'>თანამშრომლის ინფო</span></p>
            <p className='header-2'>ლეპტოპის მახასიათებლები</p>
        </div>
        <div className='personalInfo-box'>
            <div className='personalInfo-survey'>
                <div className='name-lastName'>
                    <div className='name' style={{color: nameError === 'გამოიყენე ქართული ასოები' ? 'red' : ''}}>
                        <h5 className='personalInfo-header'>სახელი</h5>
                        <input  type="text" placeholder='გრიშა' className='personalInfo-input'
                        onChange={(event) => setName(event.target.value)} value = {name}
                        onBlur={() => validateName(name)}
                        style={{borderColor: nameError === 'გამოიყენე ქართული ასოები' ? 'red' : ''}}
                        required />
                        <p className='error'>{nameError}</p>
                    </div>
                    <div className='lastName' style={{color: lastNameError === 'გამოიყენე ქართული ასოები' ? 'red' : ''}}>
                        <h5 className='personalInfo-header'>გვარი</h5>
                        <input  type="text" placeholder='ბაგრატიონი' className='personalInfo-input'
                        onChange={(event) => setlastName(event.target.value)} value = {lastName}
                        onBlur={() => validatelastName(lastName)}
                        style={{borderColor: lastNameError === 'გამოიყენე ქართული ასოები' ? 'red' : ''}}
                        required />
                        <p className='error'>{lastNameError}</p>
                    </div>
                </div>
                <div className='teams'>   
                    <select defaultValue={'DEFAULT'} className='teams-select' id='teams-select' 
                            onChange={e => setTeamsSelect(e.target.value)}
                            onBlur={() => validateTeamsSelect()}
                            style={{border: validTeamsSelect ?'2px solid red' : ''}} >
                            <option value="DEFAULT" disabled>თიმი</option>
                            {teams.map(item => (
                            <option
                            value={item.name}
                            >
                            {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='positions'>   
                    <select defaultValue={'DEFAULT'} className='positions-select'
                            onChange={e => setPositionsSelect(e.target.value)}
                            onBlur={() => validatePositionsSelect()}
                            style={{border: validPositionsSelect ? '2px solid red': ''}} >
                            <option value="DEFAULT" disabled>პოზიცია</option>
                            {positions.map(item => (
                            <option
                            value={item.name}
                            >
                            {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='email' style={{color: validEmail ? 'red' : ''}}>
                    <h5 className='personalInfo-header'>მეილი</h5>
                    <input  type="email" placeholder='grish666@redberry.ge' className='personalInfo-input'
                    onChange={(event) => setEmail(event.target.value)} value = {email}
                    onBlur={() => validateEmail(email)}
                    style={{borderColor: validEmail ? 'red' : ''}}
                    required />
                    <p className='error'>{emailError}</p>
                </div>
                <div className='phone' style={{color: validPhone ? 'red' : ''}}>
                    <h5 className='personalInfo-header'>ტელეფონი</h5>
                    <input  type="text" placeholder='+995 598 00 07 01' className='personalInfo-input'
                    onChange={(event) => setPhone(event.target.value)} value = {phone}
                    onBlur={() => validatePhone(phone)}
                    style={{borderColor: validPhone ? 'red' : ''}}
                    required />
                    <p className='error'>{phoneError}</p>
                </div>
                <div className='next-page'>
                    <button onClick={() => nextPage()} className='next-page-btn'>შემდეგი</button>
                </div>
            </div>
        </div>
        <div className='redberry-logo'>
            <img src='redberry-logo.png' alt='redberry-logo' className='redberry-img'/>
        </div>
    </div>
  )
}

export default PersonalInfo