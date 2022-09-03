import React from 'react'
import { Link } from 'react-router-dom'
import './SubmitPage.css'
import axios from 'axios'

function SubmitPage(props) {

const image = props.image;


const postData = () => {
  const formData = new FormData();
  formData.append("name", JSON.parse(sessionStorage.getItem("name")));
  formData.append('surname', JSON.parse(sessionStorage.getItem("lastName")));
  formData.append("team_id", JSON.parse(sessionStorage.getItem("teamsSelect")));
  formData.append("position_id", JSON.parse(sessionStorage.getItem("positionsSelect")));
  formData.append("phone_number", JSON.parse(sessionStorage.getItem("phone").split(' ').join('')));
  formData.append("email", JSON.parse(sessionStorage.getItem("email")));
  formData.append("laptop_image", image);
  formData.append("laptop_name", JSON.parse(sessionStorage.getItem('laptopName')));
  formData.append("laptop_brand_id", JSON.parse(sessionStorage.getItem('brandsSelect')));
  formData.append("laptop_cpu", JSON.parse(sessionStorage.getItem('cpusSelect')));
  formData.append("laptop_cpu_cores", JSON.parse(sessionStorage.getItem('cpuCore')));
  formData.append("laptop_cpu_threads", JSON.parse(sessionStorage.getItem('cpuThread')));
  formData.append("laptop_ram", JSON.parse(sessionStorage.getItem('memoryCapacity')));
  formData.append("laptop_hard_drive_type", JSON.parse(sessionStorage.getItem('memoryType')));
  formData.append("laptop_state",  JSON.parse(sessionStorage.getItem('condition')));
  formData.append("laptop_purchase_date", "");
  formData.append("laptop_price", JSON.parse(sessionStorage.getItem('price')));
  formData.append("token", "6f46a4b154a5ee8a57ad7445ed09004a");
  const config = {     
    headers: { 'content-type': 'multipart/form-data' }
}


  axios.post('https://pcfy.redberryinternship.ge/api/laptop/create', formData, config)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

const clearSessionStorage = () =>{
  
}

  return (
    <div className="submitPage">
      <div className="frame">
        <img src='Frame.png' alt='frame' className='frame-img' />
      </div>
      <Link to='/' className='submit-info' onClick={() => {postData(); clearSessionStorage()}}>სიაში გადაყვანა</Link>
      <Link to='/' className='go-to-landing' onClick={() => clearSessionStorage()}>მთავარი</Link>
    </div>
  )
}

export default SubmitPage