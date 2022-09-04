import React, {useEffect, useState} from 'react'
import './LaptopList.css'
import axios from 'axios'
import './LaptopList.css'
import Card from './Card'
import {Link} from 'react-router-dom'
import {IoIosArrowBack} from 'react-icons/io'

function LaptopList() {

    const [laptopData, setlaptopData] = useState([]);

    useEffect(() =>{
        const getData = () => {
            axios.get('https://pcfy.redberryinternship.ge/api/laptops?token=73426823c5b4d01ed260155425fb5b64')
            .then(res => {
                const persons = res.data;
                setlaptopData(persons.data)
              });
          }

          getData();
    }, [])


  return (
    <div className='LaptopList'>
        <div className='prev-page'>
            <Link to='/'>
            <div className='arrow-ellipse'>
                <IoIosArrowBack />
            </div>     
            </Link>
      </div>
        <h2>ჩანაწერების სია</h2>
        <div className='list'>
            {laptopData.map((item) => (
                <div className='cardList'>
                    <Card img={item.laptop.image} laptopName={item.laptop.name} 
                    userName={item.user.name} userSurName={item.user.surname} id={item.laptop.id}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default LaptopList