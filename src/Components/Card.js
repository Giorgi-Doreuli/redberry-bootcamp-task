import React from 'react'
import { useNavigate} from 'react-router-dom'
import './Card.css'

function Card(props) {

    const navigate = useNavigate();
    
  return (
    <div className="card">
        <div className="cardWrapper">
            <img src={`https://pcfy.redberryinternship.ge/${props.img}`} className="cardImg" alt={props.m}/>
            <div className="cardInfoWrapper">
                <div className="cardInfo">
                    <div className="cardInfoNameSurname">
                        <p className="cardInfoName">{props.userName}</p>
                        <p className="cardInfoSurName">{props.userSurName}</p>
                    </div>
                    <p className="cardInfoLaptopName">{props.laptopName}</p>
                </div>
                <div className="seeMoreInfo" onClick={() => navigate(`/laptopList/${props.id}`)}>
                    <p className="seeMoreInfoNameP">მეტის ნახვა</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card