import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {IoIosArrowBack} from 'react-icons/io'
import {useDropzone} from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLariSign, faCircleCheck, faCircleExclamation} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom"
import './LaptopInfo.css'

function LaptopInfo() {

  const [brands, setBrands] = useState([]);
  const [cpus, setCpus] = useState([]);
  const [brandsSelect, setBrandsSelect] = useState('DEFAULT');
  const [cpusSelect, setCpusSelect] = useState('DEFAULT');
  const [fileUrls, setfileUrls] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [fileSize, setFileSize] = useState([]);
  const [laptopName, setLaptopName] = useState('');
  const [cpuCore, setCpuCore] = useState('');
  const [cpuThread, setCpuThread] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [memoryType, setMemoryType] = useState('');
  const [memoryCapacity, setMemoryCapacity] = useState('');
  const [condition, setCondition] = useState('');
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
  const laptopNameText = 'ლათინური ასოები, ციფრები, !@#$%^&*()_+= ';
  const cpuCoreText = 'მხოლოდ ციფრები';
  const cpuThreadText = 'მხოლოდ ციფრები';
  const memoryCapacityText = 'მხოლოდ ციფრები';
  const laptopPriceText = 'მხოლოდ ციფრები';
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
  if(checkText === 'new' || checkText === 'secondary'){
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
}

useEffect(() =>{
  if(validImage && validLaptopName && validLaptopBrand && validLaptopCpu
    && validCpuCore && validCpuThread && validMemoryCapacity && validMemoryType && validLaptopPrice && validCondition){
    navigate('/submitPage');
  }
}, [validImage, validLaptopName, validLaptopBrand, validLaptopCpu, validCpuThread,
    validMemoryCapacity, validMemoryType, validCpuCore, validLaptopPrice, validCondition, navigate])

  return (
    <div className="laptopInfo">
      <div className='prev-page'>
        <Link to='/'>
          <div className='arrow-ellipse'>
            <IoIosArrowBack />
          </div>     
        </Link>
      </div>
      <div className='laptopInfo-headers'>
        <p className='header-1'>თანამშრომლის ინფო</p>
        <p className='header-2'><span className='header-2-span'>ლეპტოპის მახასიათებლები</span></p>
      </div>
      <div className='laptopInfo-box'>
        <div className='laptopInfo-survey'>
          <div className='laptop-image'>
                <div {...getRootProps({className: 'dropzone'})} className='choose-file' 
                      style={{display : fileUrls.length>0 ? 'none' : '', 
                              border : photoError === 'notUploaded' ? '2px #E52F2F dashed' : '',
                              backgroundColor: photoError === 'notUploaded' ? '#F7E2E2' : ''}}>
                  <input {...getInputProps()} />
                  <div className='error-sign' style={{display: photoError === 'notUploaded' ? '' : 'none'}}>
                    <FontAwesomeIcon icon={faCircleExclamation} color='#C9CB52'/>
                  </div>
                  <div className='upload-text' style={{color: photoError === 'notUploaded' ? '#E52F2F' : ''}}>
                    <p>ჩააგდე ან ატვირთე </p>
                    <p>ლეპტოპის ფოტო</p>
                  </div>
                  <button type="button" onClick={open} className='upload-btn'>
                    ატვირთე
                  </button>
                </div>
                <div className='image' style={{display : fileUrls.length<1 ? 'none' : ''}}>                  
                  {fileUrls.length > 0 ?                  
                    <div className='image-layer'>{fileUrls.map((file) => (
                      <div className='upload-again-btn'>
                        <img src={file.preview} alt='preview' className='uploaded-image'/>
                        <div className='image-info-btn'>
                          <div className='image-info'>
                            <FontAwesomeIcon icon={faCircleCheck} color='#BED918'/>
                            {fileNames.map(fileName => (
                              <p>{fileName},</p> 
                            ))}
                            {fileSize.map(fileSize => (
                              <p>{parseInt(fileSize/100000)} MB</p> 
                            ))}
                          </div>
                          <button type="button" onClick={open} className='upload-btn'>
                            თავიდან ატვირთე 
                          </button>
                        </div>
                      </div>
                    ))
                    }</div>: ''}
                  </div>
          </div>
          <div className='laptop-name-brand'>
            <div className='laptop-name' style={{color: laptopNameError === 'false' ? 'red' : ''}}>
              <h5 className='laptop-info-header'>ლეპტოპის სახელი</h5>
              <input  type="text" placeholder='HP' className='laptop-info-input'
              onChange={(event) => setLaptopName(event.target.value)} value = {laptopName}
              onBlur={() => validateLaptopName(laptopName)}
              style={{borderColor: laptopNameError === 'false' ? 'red' : ''}}
              required />
              <p className='error'>{laptopNameText}</p>
            </div>
            <div className='laptop-brands'>
              <select defaultValue={'DEFAULT'} className='brands-select' id='brands-select' 
                onChange={e => setBrandsSelect(e.target.value)}
                onBlur={() => validateBrandSelect(brandsSelect)}
                style={{border: laptopBrandSelected === 'false' ? '2px solid red' : ''}}>
                  <option value="DEFAULT" disabled>ლეპტოპის ბრენდი</option>
                    {brands.map(item => (
                    <option
                    value={item.name}
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
              <select defaultValue={'DEFAULT'} className='cpus-select' id='cpus-select' 
                onChange={e => setCpusSelect(e.target.value)}
                onBlur={() => validateCpuSelect(cpusSelect)}
                style={{border: laptopCpuSelected === 'false' ? '2px solid red' : ''}}>
                <option value="DEFAULT" disabled>CPU</option>
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
              <h5 className='laptop-info-header'>CPU-ს ბირთვი</h5>
              <input  type="text" placeholder='14' className='laptop-info-input'
              onChange={(event) => setCpuCore(event.target.value)} value = {cpuCore}
              onBlur={() => validateCpuCore(cpuCore)}
              style={{borderColor: cpuCoreError === 'false' ? 'red' : ''}}
              required />
              <p className='error'>{cpuCoreText}</p>
            </div>
            <div className='cpu-thread' style={{color: cpuThreadError === 'false' ? 'red' : ''}}>
              <h5 className='laptop-info-header'>CPU-ს ნაკადი</h5>
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
              <h5 className='laptop-info-header'>ლეპტოპის RAM (GB)</h5>
              <input  type="text" placeholder='16' className='laptop-info-input'
              onChange={(event) => setMemoryCapacity(event.target.value)} value = {memoryCapacity}
              onBlur={() => validateMemoryCapacity(memoryCapacity)}
              style={{borderColor: memoryCapacityError === 'false' ? 'red' : ''}}
              required />
              <p className='error'>{memoryCapacityText}</p>
            </div>
            <div className='memory-type'>
              <div className='memory-error-sign'>
                <h5 className='laptop-info-header' style={{color: memoryTypeError === 'false' ? 'red' : ''}}>მეხსიერების ტიპი</h5>
                <FontAwesomeIcon icon={faCircleExclamation} color='#C9CB52'  style={{display: memoryTypeError === 'false' ? '' : 'none'}}/>
              </div>
              <div className='memory-radio-buttons' onChange={(event) => setMemoryType(event.target.value)}
                                                    onBlur={() => validateMemoryType(memoryType)}>
                <div className='ssd'>
                  <input type="radio" id="SSD" value="SSD" name='memory-type' className='laptop-info-radios'/>
                  <label for='SSD'>SSD</label>
                </div>
                <div className='hdd'>
                  <input type="radio" id="HDD" value="HDD" name='memory-type' className='laptop-info-radios'/>
                  <label for='HDD'>HDD</label>
                </div>
              </div>
            </div>
          </div>
          <div className='line'></div>
          <div className='laptop-time-price'>
            <div className='laptop-time'>
              <h5 className='laptop-info-header'>შეძენის რიცხვი (არჩევითი)</h5>
              <input  type="date" placeholder='დდ / თთ / წწწწ' className='laptop-info-input'
              onChange={(event) => setTime(event.target.value)} value = {time}
              required />
            </div>
            <div className='laptop-price'>
              <div className='laptop-price-info' style={{color: priceError === 'false' ? 'red' : ''}}>
                <h5 className='laptop-info-header'>ლეპტოპის ფასი</h5>
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
              <h5 className='laptop-info-header' style={{color: laptopConditionError === 'false' ? 'red' : ''}}>ლეპტოპის მდგომარეობა</h5>
              <FontAwesomeIcon icon={faCircleExclamation} color='#C9CB52'  style={{display: laptopConditionError === 'false' ? '' : 'none'}}/>
            </div>
            <div className='condition-radio-buttons' onChange={(event) => setCondition(event.target.value)}
                                                    onBlur={() => validateCondition(condition)}>
              <div className='new'>
                <input type="radio" id="new" value="new" name='laptop-condition' className='laptop-info-radios'/>
                <label for='new'>ახალი</label>
              </div>
              <div className='secondary'>
                <input type="radio" id="secondary" value="secondary" name='laptop-condition' className='laptop-info-radios'/>
                <label for='secondary'>მეორადი</label>
              </div>
            </div>
          </div>
          <div className='next-page'>
            <button onClick={() => nextPage()} className='next-page-btn'>შემდეგი</button>
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default LaptopInfo