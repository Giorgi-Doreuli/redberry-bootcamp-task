import React, {useState, useEffect} from 'react'
import './PersonalInfo.css'

function PersonalInfo() {

const [teams, setTeams] = useState([]);
const [positions, setPositions] = useState([]);

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

  return (
    <div className='personalInfo'>
        <div className='personalInfo-headers'>
            <p className='header-1'>თანამშრომლის ინფო</p>
            <p className='header-2'>ლეპტოპის მახასიათებლები</p>
        </div>
        <div className='personalInfo-box'>
            <div className='personalInfo-survey'>
                <div className='name-username'>
                    <div className='name'>
                        <h5 className='h5-name'>სახელი</h5>
                        <input  type="text" placeholder='გრიშა' className='name-input'
                        required />
                    </div>
                    <div className='username'>
                        <h5 className='h5-username'>გვარი</h5>
                        <input  type="text" placeholder='ბაგრატიონი' className='username-input'
                        required />
                    </div>
                </div>
                <div className='teams'>   
                    <select defaultValue={'DEFAULT'} className='teams-select'>
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
                    <select defaultValue={'DEFAULT'} className='positions-select'>
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
            </div>
        </div>
    </div>
  )
}

export default PersonalInfo