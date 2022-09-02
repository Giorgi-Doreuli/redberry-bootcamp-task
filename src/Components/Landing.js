import React from 'react'
import './Landing.css'
import {Link} from 'react-router-dom'
 
function Landing() {
  return (
    <div className='Landing'>
        <h2 className='Landing-heading'>Redberry</h2>
        <img src='Landing-thumbnail.png' alt='Landing-thumbnail' className='Landing-thumbnail'/>
        <div className='Landing-buttons'>
          <Link to='/personalInfo' className='personalInfo-link'>ჩანაწერის დამატება</Link>
          <Link to='/laptopList' className='list-link'>ჩანაწერების სია</Link>
        </div>
    </div>
  )
}

export default Landing