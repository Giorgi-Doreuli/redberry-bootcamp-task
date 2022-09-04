import React from 'react'
import { Link } from 'react-router-dom'
import './SubmitPage.css'

function SubmitPage() {


  return (
    <div className="submitPage">
        <div className="frame">
          <img src='Frame.png' alt='frame' className='frame-img' />
        </div>
        <Link to='/laptopList' className='submit-info' >სიაში გადაყვანა</Link>
        <Link to='/' className='go-to-landing' >მთავარი</Link>
    </div>
  )
}

export default SubmitPage