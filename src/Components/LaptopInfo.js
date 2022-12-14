import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {IoIosArrowBack} from 'react-icons/io'
import {useDropzone} from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLariSign, faCircleCheck, faCircleExclamation, faCamera} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom"
import SessionStorage from './SessionStorage';
import './LaptopInfo.css'
import SubmitPage from './SubmitPage'
import axios from 'axios';

function LaptopInfo() {

  const [success, setSuccess] = useState(false);
  const [validEverything, setValidEverything] = useState(false);
  const [brands, setBrands] = useState([]);
  const [cpus, setCpus] = useState([]);
  const [brandsSelect, setBrandsSelect] = SessionStorage('brandsSelect', 'DEFAULT');
  const [cpusSelect, setCpusSelect] = SessionStorage('cpusSelect', 'DEFAULT');
  const [fileUrls, setfileUrls] = useState('');
  const [fileNames, setFileNames] = useState([]);
  const [fileTargetValues, setFileTargetValues] =useState('');
  const [fileSize, setFileSize] = useState([]);
  const [laptopName, setLaptopName] = SessionStorage('laptopName', '');
  const [cpuCore, setCpuCore] = SessionStorage('cpuCore', '');
  const [cpuThread, setCpuThread] = SessionStorage('cpuThread', '');
  const [time, setTime] = SessionStorage('time', '');
  const [price, setPrice] = SessionStorage('price', '');
  const [memoryType, setMemoryType] = SessionStorage('memoryType', '');
  const [memoryCapacity, setMemoryCapacity] = SessionStorage('memoryCapacity', '');
  const [condition, setCondition] = SessionStorage('condition', '');
  const [validImage, setValidImage] = useState(false);
  const [validLaptopName, setValidLaptopName] = useState(false);
  const [validLaptopBrand, setValidLaptopBrand] = useState(false);
  const [validLaptopCpu, setValidLaptopCpu] = useState(false);
  const [validCpuCore, setValidCpuCore] = useState(false);
  const [validCpuThread, setValidCpuThread] = useState(false);
  const [validMemoryCapacity, setValidMemoryCapacity] = useState(false);
  const [validMemoryType, setValidMemoryType] = useState(false);
  const [validLaptopPrice, setValidLaptopPrice] = useState(false);
  const [validCondition, setValidCondition] = useState(false);
  const laptopNameText = '???????????????????????? ??????????????????, ?????????????????????, !@#$%^&*()_+= ';
  const cpuCoreText = '?????????????????? ?????????????????????';
  const cpuThreadText = '?????????????????? ?????????????????????';
  const memoryCapacityText = '?????????????????? ?????????????????????';
  const laptopPriceText = '?????????????????? ?????????????????????';
  const [photoError, setPhotoError] = useState('uploaded');
  const [laptopNameError, setLaptopNameError] = useState('true');
  const [laptopBrandSelected, setLaptopBrandSelected] = useState('true');
  const [laptopCpuSelected, setLaptopCpuSelected] = useState('true');
  const [cpuCoreError, setCPUCoreError] = useState('true');
  const [cpuThreadError, setCPUThreadError] = useState('true');
  const [memoryCapacityError, setMemoryCapacityError] = useState('true');
  const [memoryTypeError, setMemoryTypeError] = useState('true');
  const [priceError, setPriceError] = useState('true');
  const [laptopConditionError, setLaptopConditionError] = useState('true');
  const navigate = useNavigate();

const postData = () => {
  const formData = new FormData();
  formData.append("name", JSON.parse(sessionStorage.getItem("name")));
  formData.append('surname', JSON.parse(sessionStorage.getItem("lastName")));
  formData.append("team_id", JSON.parse(sessionStorage.getItem("teamsSelect")));
  formData.append("position_id", JSON.parse(sessionStorage.getItem("positionsSelect")));
  formData.append("phone_number", JSON.parse(sessionStorage.getItem("phone").split(' ').join('')));
  formData.append("email", JSON.parse(sessionStorage.getItem("email")));
  formData.append("laptop_image", fileTargetValues);
  formData.append("laptop_name", JSON.parse(sessionStorage.getItem('laptopName')));
  formData.append("laptop_brand_id", JSON.parse(sessionStorage.getItem('brandsSelect')));
  formData.append("laptop_cpu", JSON.parse(sessionStorage.getItem('cpusSelect')));
  formData.append("laptop_cpu_cores", JSON.parse(sessionStorage.getItem('cpuCore')));
  formData.append("laptop_cpu_threads", JSON.parse(sessionStorage.getItem('cpuThread')));
  formData.append("laptop_ram", JSON.parse(sessionStorage.getItem('memoryCapacity')));
  formData.append("laptop_hard_drive_type", JSON.parse(sessionStorage.getItem('memoryType')));
  formData.append("laptop_state",  JSON.parse(sessionStorage.getItem('condition')));
  formData.append("laptop_purchase_date", JSON.parse(sessionStorage.getItem('time')));
  formData.append("laptop_price", JSON.parse(sessionStorage.getItem('price')));
  formData.append("token", "4f18fd700fefc88ae6c9066fe7ab08d2");
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
  sessionStorage.clear();
}

    const {getRootProps, getInputProps, open} = useDropzone({

      noClick: true,
      noKeyboard: true,

      accept: {
        'image/*': []
      },
      onDrop: acceptedFiles => {
        setfileUrls(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
        setFileNames(acceptedFiles.map(file => file.name));
        setFileSize(acceptedFiles.map(file => file.size));
        setValidImage(true);
        setFileTargetValues(acceptedFiles[0]);
      }
    });

    useEffect(() =>{
      const getBrands = async () => {
          const api_url = 'https://pcfy.redberryinternship.ge/api/brands';
          const fetchBrands = await fetch(api_url);
          const fetchedBrands = await fetchBrands.json();
          setBrands(fetchedBrands.data);
      }

      const getCpus = async () => {
        const api_url = 'https://pcfy.redberryinternship.ge/api/cpus';
        const fetchCpus = await fetch(api_url);
        const fetchedCpus = await fetchCpus.json();
        setCpus(fetchedCpus.data);
    }
  
      getBrands();
      getCpus();
  }, [])

  const validateImage = (checkFile) => {  
    if(checkFile.length > 0){
      setValidImage(true);
      setPhotoError('uploaded');
    }else{
      setValidImage(false);
      setPhotoError('notUploaded');
    }
  }

  const validateLaptopName = (checkText) => {
    const regexpLaptopName = /[a-zA-Z0-9!@#$%^&*()_+=]/g;
    if(checkText === laptopName){
      if (regexpLaptopName.exec(checkText) !== null) {
        setValidLaptopName(true);
        setLaptopNameError('true');
          } else {
            setValidLaptopName(false);
            setLaptopNameError('false');
          }
    }
  }

  const validateCpuCore = (checkText) => {
    const regexpCpuCore = /^[0-9\b]+$/g;
    if(checkText === cpuCore){
      if (regexpCpuCore.exec(checkText) !== null) {
        setValidCpuCore(true);
        setCPUCoreError('true');
          } else {
            setValidCpuCore(false);
            setCPUCoreError('false');
          }
    }
  }

  const validateMemoryCapacity = (checkText) => {
    const regexpMemoryCapacity = /^[0-9\b]+$/g;
    if(checkText === memoryCapacity){
      if (regexpMemoryCapacity.exec(checkText) !== null) {
        setValidMemoryCapacity(true);
        setMemoryCapacityError('true');
          } else {
            setValidMemoryCapacity(false);
            setMemoryCapacityError('false');
          }
    }
  }

  
  const validateCpuThread = (checkText) => {
    const regexpCpuThread = /^[0-9\b]+$/g;
    if(checkText === cpuThread){
      if (regexpCpuThread.exec(checkText) !== null) {
        setValidCpuThread(true);
        setCPUThreadError('true');
          } else {
            setValidCpuThread(false);
            setCPUThreadError('false');
          }
    }
  }
  
  const validatePrice = (checkText) => {
    const regexpPrice = /^[0-9\b]+$/g;
    if(checkText === price){
      if (regexpPrice.exec(checkText) !== null) {
        setValidLaptopPrice(true);
        setPriceError('true');
          } else {
            setValidLaptopPrice(false);
            setPriceError('false');
          }
    }
  }
  

  const validateBrandSelect = (checkText) => {
    if(checkText === 'DEFAULT') {
      setValidLaptopBrand(false);
      setLaptopBrandSelected('false');
    }else {
      setValidLaptopBrand(true);
      setLaptopBrandSelected('true');
    }
}


const validateCpuSelect = (checkText) => {
  if(checkText === 'DEFAULT') {
    setValidLaptopCpu(false);
    setLaptopCpuSelected('false');
  }else {
    setValidLaptopCpu(true);
    setLaptopCpuSelected('true');
  }
}
const validateMemoryType = (checkText) => {
  if(checkText === 'SSD' || checkText === 'HDD'){ 
    setValidMemoryType(true);
    setMemoryTypeError('true');
  }else{
    setValidMemoryType(false);
    setMemoryTypeError('false');
  }
}

const validateCondition = (checkText) => {
  if(checkText === 'new' || checkText === 'used'){
    setValidCondition(true);
    setLaptopConditionError('true');
  }else{
    setValidCondition(false);
    setLaptopConditionError('false');
  }
}

const nextPage = () => {
  validateImage(fileUrls);
  validateLaptopName(laptopName);
  validateBrandSelect(brandsSelect);
  validateCpuSelect(cpusSelect);
  validateCpuCore(cpuCore);
  validateCpuThread(cpuThread);
  validateMemoryCapacity(memoryCapacity);
  validateMemoryType(memoryType);
  validatePrice(price);
  validateCondition(condition);
  setValidEverything(!validEverything);
}

const prevPage = () => {
  navigate('/personalInfo');
}

const checkError = () => {
  if(validImage && validLaptopName && validLaptopBrand && validLaptopCpu && validCpuCore
     && validCpuThread && validMemoryCapacity && validMemoryType && validLaptopPrice && validCondition) {
      setSuccess(true);
      postData();
      clearSessionStorage();
  }
}   

useEffect(() =>{
  checkError();
}, [validEverything])




  return (
    <div className="laptopInfo" style={{position: success ? 'fixed' : ''}}>
      <div className='prev-page'>
        <Link to='/personalInfo'>
          <div className='arrow-ellipse'>
            <IoIosArrowBack />
          </div>     
        </Link>
      </div>
      <div className='laptopInfo-headers'>
          <div className='laptop-header-1-div'>
            <p className='laptop-header-1' onClick={() => prevPage()}>???????????????????????????????????? ????????????</p>
          </div>
          <div className='laptop-header-2-div'>
            <p className='laptop-header-2'><span className='laptop-header-2-span' >???????????????????????? ??????????????????????????????????????????</span></p>
            <p className='laptop-header-2-page'>2/2</p>
          </div>
      </div>
      <div className='laptopInfo-box'>
        <div className='laptopInfo-survey'>
          <div className='laptop-image'>
                <div {...getRootProps({className: 'dropzone'})} className='choose-file' 
                      style={{display : fileUrls.length>0 ? 'none' : '', 
                              border : photoError === 'notUploaded' ? '2px #E52F2F dashed' : '',
                              backgroundColor: photoError === 'notUploaded' ? '#F7E2E2' : ''}}>
                  <div className='choose-file-small-device' onClick={open}></div>
                  <input {...getInputProps()} id='image-input'/>
                  <div className='camera-icon'>
                    <FontAwesomeIcon icon={faCamera} color='#79C6EE'/>
                  </div>
                  <div className='upload-text-small-device' style={{color: photoError === 'notUploaded' ? '#E52F2F' : ''}}>
                    <p>???????????????????????? ???????????????</p>
                    <p>????????????????????????</p>
                  </div>
                  <div className='error-sign' style={{display: photoError === 'notUploaded' ? '' : 'none'}}>
                    <FontAwesomeIcon icon={faCircleExclamation} color='#C9CB52'/>
                  </div>
                  <div className='upload-text' style={{color: photoError === 'notUploaded' ? '#E52F2F' : ''}}>
                    <p>?????????????????? ?????? ????????????????????? </p>
                    <p>???????????????????????? ????????????</p>
                  </div>
                  <button type="button" onClick={open} className='upload-btn'>
                    ?????????????????????
                  </button>
                </div>
                <div className='image' style={{display : fileUrls.length<1 ? 'none' : ''}}>                  
                  {fileUrls.length > 0 ?                  
                    <div className='image-layer'>{fileUrls.map((file) => (
                      <div className='upload-again-div'>
                        <img src={file.preview} alt='preview' className='uploaded-image'/>
                        <div className='image-info-btn'>
                          <div className='image-info-icon'>
                            <FontAwesomeIcon icon={faCircleCheck} color='#BED918'/>
                            <div className='image-info'>
                              {fileNames.map(fileName => (
                                <p>{fileName},</p> 
                              ))}
                              {fileSize.map(fileSize => (
                                <p>{parseInt(fileSize/10000)/10} MB</p> 
                              ))}
                            </div>
                          </div>
                          <button type="button" onClick={open} className='upload-again-btn'>
                            ????????????????????? ????????????????????? 
                          </button>
                        </div>
                      </div>
                    ))
                    }</div>: ''}
                  </div>
          </div>
          <div className='laptop-name-brand'>
            <div className='laptop-name' style={{color: laptopNameError === 'false' ? 'red' : ''}}>
              <h5 className='laptop-info-header'>???????????????????????? ??????????????????</h5>
              <input  type="text" placeholder='HP' className='laptop-info-input'
              onChange={(event) => setLaptopName(event.target.value)} value = {laptopName}
              onBlur={() => validateLaptopName(laptopName)}
              style={{borderColor: laptopNameError === 'false' ? 'red' : ''}}
              required />
              <p className='error'>{laptopNameText}</p>
            </div>
            <div className='laptop-brands'>
              <select value={brandsSelect} className='brands-select' id='brands-select' 
                onChange={e => setBrandsSelect(e.target.value)}
                onBlur={() => validateBrandSelect(brandsSelect)}
                style={{border: laptopBrandSelected === 'false' ? '2px solid red' : ''}}>
                  <option value="DEFAULT" disabled selected>???????????????????????? ??????????????????</option>
                    {brands.map(item => (
                    <option
                    value={item.id}
                    >
                    {item.name}
                    </option>
                    ))}
              </select>
            </div>
          </div>
          <div className='line'></div>
          <div className='cpu-specs'>
            <div className='laptop-cpus'>
              <select value={cpusSelect} className='cpus-select' id='cpus-select' 
                onChange={e => setCpusSelect(e.target.value)}
                onBlur={() => validateCpuSelect(cpusSelect)}
                style={{border: laptopCpuSelected === 'false' ? '2px solid red' : ''}}>
                <option value="DEFAULT" disabled selected>CPU</option>
                {cpus.map(item => (
                <option
                value={item.name}
                >
                {item.name}
                </option>
                ))}
              </select>
            </div>
            <div className='cpu-core' style={{color: cpuCoreError === 'false' ? 'red' : ''}}>
              <h5 className='laptop-info-header'>CPU-??? ??????????????????</h5>
              <input  type="text" placeholder='14' className='laptop-info-input'
              onChange={(event) => setCpuCore(event.target.value)} value = {cpuCore}
              onBlur={() => validateCpuCore(cpuCore)}
              style={{borderColor: cpuCoreError === 'false' ? 'red' : ''}}
              required />
              <p className='error'>{cpuCoreText}</p>
            </div>
            <div className='cpu-thread' style={{color: cpuThreadError === 'false' ? 'red' : ''}}>
              <h5 className='laptop-info-header'>CPU-??? ??????????????????</h5>
              <input  type="text" placeholder='365' className='laptop-info-input'
              onChange={(event) => setCpuThread(event.target.value)} value = {cpuThread}
              onBlur={() => validateCpuThread(cpuThread)}
              style={{borderColor: cpuThreadError === 'false' ? 'red' : ''}}
              required />
              <p className='error'>{cpuThreadText}</p>
            </div>
          </div>
          <div className='memory-specs'>
            <div className='memory-capacity' style={{color: memoryCapacityError === 'false' ? 'red' : ''}}>
              <h5 className='laptop-info-header'>???????????????????????? RAM (GB)</h5>
              <input  type="text" placeholder='16' className='laptop-info-input'
              onChange={(event) => setMemoryCapacity(event.target.value)} value = {memoryCapacity}
              onBlur={() => validateMemoryCapacity(memoryCapacity)}
              style={{borderColor: memoryCapacityError === 'false' ? 'red' : ''}}
              required />
              <p className='error'>{memoryCapacityText}</p>
            </div>
            <div className='memory-type'>
              <div className='memory-error-sign'>
                <h5 className='laptop-info-header' style={{color: memoryTypeError === 'false' ? 'red' : ''}}>????????????????????????????????? ????????????</h5>
                <FontAwesomeIcon icon={faCircleExclamation} color='#C9CB52'  style={{display: memoryTypeError === 'false' ? '' : 'none'}}/>
              </div>
              <div className='memory-radio-buttons' onChange={(event) => setMemoryType(event.target.value)}
                                                    onBlur={() => validateMemoryType(memoryType)}>
                <div className='ssd'>
                ?? <input type="radio" id="SSD" value="SSD" name='memory-type' 
                        className='laptop-info-radios' checked={memoryType === 'SSD' ? 'true' : ''}/>
                  <label for='SSD'>SSD</label>
                </div>
                <div className='hdd'>
                ?? <input type="radio" id="HDD" value="HDD" name='memory-type' 
                          className='laptop-info-radios' checked={memoryType === 'HDD' ? 'true' : ''}/>
                  <label for='HDD'>HDD</label>
                </div>
              </div>
            </div>
          </div>
          <div className='line'></div>
          <div className='laptop-time-price'>
            <div className='laptop-time'>
              <h5 className='laptop-info-header'>????????????????????? ?????????????????? (????????????????????????)</h5>
              <input  type="date" placeholder='?????? / ?????? / ????????????' className='laptop-info-input'
              onChange={(event) => setTime(event.target.value)} value = {time}
              required />
            </div>
            <div className='laptop-price'>
              <div className='laptop-price-info' style={{color: priceError === 'false' ? 'red' : ''}}>
                <h5 className='laptop-info-header'>???????????????????????? ????????????</h5>
                <input  type="text" placeholder='0000' className='laptop-info-input'
                onChange={(event) => setPrice(event.target.value)} value = {price}
                onBlur={() => validatePrice(price)}
                style={{borderColor: priceError === 'false' ? 'red' : ''}}
                required />
                <p className='error'>{laptopPriceText}</p>
              </div>
              <div className='lari-icon'>
                <FontAwesomeIcon icon={faLariSign} color='grey'/>
              </div>
            </div>
          </div>
          <div className='laptop-condition'>
            <div className='condition-error-sign'>
              <h5 className='laptop-info-header' style={{color: laptopConditionError === 'false' ? 'red' : ''}}>???????????????????????? ?????????????????????????????????</h5>
              <FontAwesomeIcon icon={faCircleExclamation} color='#C9CB52'  style={{display: laptopConditionError === 'false' ? '' : 'none'}}/>
            </div>
            <div className='condition-radio-buttons' onChange={(event) => setCondition(event.target.value)}
                                                    onBlur={() => validateCondition(condition)}>
              <div className='new'>
              ?? <input type="radio" id="new" value="new" name='laptop-condition' 
                      className='laptop-info-radios' checked={condition === 'new' ? 'true' : ''}/>
                <label for='new'>???????????????</label>
              </div>
              <div className='used'>
              ?? <input type="radio" id="used" value="used" name='laptop-condition' 
                      className='laptop-info-radios' checked={condition === 'used' ? 'true' : ''}/>
                <label for='used'>?????????????????????</label>
              </div>
            </div>
          </div>
          <div className='change-page'>
            <p onClick={() => prevPage()} className='prev-page-btn'>????????????</p>
            <button onClick={() => nextPage()} className='next-page-btn'>????????????????????????????????????</button>
          </div>
        </div>
      </div>
      <div className='redberry-logo'>
            <img src='redberry-logo.png' alt='redberry-logo' className='redberry-img'/>
      </div>
      {success && <SubmitPage />}
    </div>
  
  )
}

export default LaptopInfo