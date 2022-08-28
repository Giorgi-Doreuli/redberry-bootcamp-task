import React from 'react'
import './PersonalInfo.css'

function PersonalInfo() {
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
            </div>
        </div>
    </div>
  )
}

export default PersonalInfo