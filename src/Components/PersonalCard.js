import React, { useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './PersonalCard.css'
import axios from 'axios';
import {Link} from 'react-router-dom'
import {IoIosArrowBack} from 'react-icons/io'
import SessionStorage from './SessionStorage'

function PersonalCard() {
    const {idNum} = useParams();

    const [LaptopInfo, setlaptopInfo] = SessionStorage('LaptopInfo', '');
    const [positions, setPositions] = SessionStorage('positions', '');
    const [brands, setBrands] = SessionStorage('brands', '');

    useEffect(() =>{
        const getData = () => {
            axios.get(`https://pcfy.redberryinternship.ge/api/laptop/${idNum}?token=4f18fd700fefc88ae6c9066fe7ab08d2`)
            .then(res => {
                const persons = res.data;
                setlaptopInfo(persons.data);
                console.log(persons.data);
              });
          }

        const getPositions = async () => {
           const api_url = 'https://pcfy.redberryinternship.ge/api/positions';
           const fetchPositions = await fetch(api_url);
           const fetchedPositions = await fetchPositions.json();
           setPositions(fetchedPositions.data);
        }

        const getBrands = async () => {
            const api_url = 'https://pcfy.redberryinternship.ge/api/brands';
            const fetchBrands = await fetch(api_url);
            const fetchedBrands = await fetchBrands.json();
            setBrands(fetchedBrands.data);
        }

        getPositions();
        getBrands();
        getData();
    }, [idNum, setlaptopInfo, setPositions, setBrands])

  return (
    <div className='PersonalCard'>
        <div className='prev-page'>
            <Link to='/laptopList' onClick={() => sessionStorage.clear()}> 
                <div className='arrow-ellipse'>
                    <IoIosArrowBack />
                </div>     
            </Link>
        </div>
        <h2 className='personal-card-header'>ლეპტოპის ინფო</h2>
            {LaptopInfo && positions && brands ?
            <div className='LaptopInfoCard'>
                <div className='imageAndPersonalInfo'>
                    <img src={`https://pcfy.redberryinternship.ge/${LaptopInfo.laptop.image}`} 
                    alt={LaptopInfo.laptop.image} className='LaptopImage'/>
                    <div className='PersonalInfoCard'>
                        <div className='PersonalInfoCardKeys'>
                            <h3>სახელი:</h3>
                            <h3>თიმი:</h3>
                            <h3>პოზიცია:</h3>
                            <h3>მეილი:</h3>
                            <h3>ტელ. ნომერი:</h3>
                        </div>
                        <div className='PersonalInfoCardValues'>
                            <p>{LaptopInfo.user.name}</p>
                            <p>{LaptopInfo.user.surname}</p>
                            <p>{positions.find(x => x.id === LaptopInfo.user.position_id).name}</p>
                            <p className='personalCardEmail'>{LaptopInfo.user.email}</p>
                            <p>{LaptopInfo.user.phone_number.replace(/(\d{3})(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')}</p>
                        </div>
                    </div>
                </div>
                <div className='line'></div>
                <div className='PersonalCardLaptopSpecs'>
                    <div className='LaptopSpecsName'>
                        <div className='LaptopSpecsNameKey'>
                            <h3>ლეპტოპის სახელი:</h3>
                            <h3>ლეპტოპის ბრენდი:</h3>
                            <h3>RAM:</h3>
                            <h3>მეხსიერების ტიპი:</h3>
                        </div>
                        <div className='LaptopSpecsNameValue'>
                            <p>{LaptopInfo.laptop.name}</p>
                            <p>{brands.find(x => x.id === LaptopInfo.laptop.brand_id).name}</p>
                            <p>{LaptopInfo.laptop.ram}</p>
                            <p>{LaptopInfo.laptop.hard_drive_type}</p>
                        </div>
                    </div>
                    <div className='LaptopSpecsCpu'>
                        <div className='LaptopSpecsCpuKey'>
                            <h3>CPU:</h3>
                            <h3>CPU-ს ბირთვი:</h3>
                            <h3>CPU-ს ნაკადი:</h3>
                        </div>
                        <div className='LaptopSpecsCpuValue'>
                            <p>{LaptopInfo.laptop.cpu.name}</p>
                            <p>{LaptopInfo.laptop.cpu.cores}</p>
                            <p>{LaptopInfo.laptop.cpu.threads}</p>
                        </div>
                    </div>
                </div>
                <div className='line'></div>
                <div className='Condition-Price-time'>
                    <div className='LaptopConditionPrice'>
                        <div className='LaptopConditionPriceKey'>
                            <h3 className='condition-h3'>ლეპტოპის მდგომარეობა:</h3>
                            <h3 className='condition-small-device-h3'>მდგომარეობა:</h3>
                            <h3>ლეპტოპის ფასი:</h3>
                        </div>
                        <div className='LaptopConditionPriceValue'>
                            <p>{LaptopInfo.laptop.state}</p>
                            <p>{LaptopInfo.laptop.price}</p>
                        </div>
                    </div>
                    <div className='LaptopConditionTime'>
                        <div className='LaptopConditionPriceKey'>
                           <h3>შეძენის თარიღი:</h3>
                        </div>
                        <div className='LaptopConditionPriceValue'>
                            <p>{LaptopInfo.laptop.purchase_date}</p>
                        </div>
                    </div>
                </div> 
            </div>
            : ''}
    </div>
  )
}

export default PersonalCard