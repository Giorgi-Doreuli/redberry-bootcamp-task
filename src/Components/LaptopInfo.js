import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {IoIosArrowBack} from 'react-icons/io'
import {useDropzone} from 'react-dropzone';
import './LaptopInfo.css'

function LaptopInfo() {

  const [brands, setBrands] = useState([]);
  const [cpus, setCpus] = useState([]);
  const [brandsSelect, setBrandsSelect] = useState('');
  const [cpusSelect, setCpusSelect] = useState('');
  const [fileNames, setFileNames] = useState([]);
  const [laptopName, setLaptopName] = useState('');
  const [cpuCore, setCpuCore] = useState('');
  const [cpuThread, setCpuThread] = useState('');
  const laptopNameError = 'ლათინური ასოები, ციფრები, !@#$%^&*()_+= ';
  const laptopBrandError = 'აირჩიეთ ბრენდი';
  const laptopCpuError = 'აირჩიეთ CPU';
  const cpuCoreError = 'მხოლოდ ციფრები';
  const cpuThreadError = 'მხოლოდ ციფრები';

    const {getRootProps, getInputProps, open} = useDropzone({

      noClick: true,
      noKeyboard: true,

      accept: {
        'image/*': []
      },
      onDrop: acceptedFiles => {
        setFileNames(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
      }
    });

    const removeImg = () => {
      setFileNames([]);
    }

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
                <div {...getRootProps({className: 'dropzone'})} className='choose-file'>
                  <input {...getInputProps()} />
                  <div className='upload-text'>
                    <p>ჩააგდე ან ატვირთე </p>
                    <p>ლეპტოპის ფოტო</p>
                  </div>
                  <button type="button" onClick={open} className='upload-btn'>
                    ატვირთე
                  </button>
                  {fileNames.length > 0 ?                  
                    <div className='image-layer'>{fileNames.map((file) => (
                      <div className='image-remove-btn'>
                        <img src={file.preview} alt='preview' className='uploaded-image'/>
                        <button className='remove-btn' onClick={() => removeImg()}>სურათის წაშლა</button>
                      </div>
                    ))
                    }</div>: ''}

                </div>
          </div>
          <div className='laptop-name-brand'>
            <div className='laptop-name' >
              <h5 className='laptop-info-header'>ლეპტოპის სახელი</h5>
              <input  type="text" placeholder='HP' className='laptop-info-input'
              onChange={(event) => setLaptopName(event.target.value)} value = {laptopName}
              required />
              <p className='error'>{laptopNameError}</p>
            </div>
            <div className='laptop-brands'>
              <select defaultValue={'DEFAULT'} className='brands-select' id='brands-select' 
                onChange={e => setBrandsSelect(e.target.value)}>
                  <option value="DEFAULT" disabled>ლეპტოპის ბრენდი</option>
                    {brands.map(item => (
                    <option
                    value={item.name}
                    >
                    {item.name}
                    </option>
                    ))}
              </select>
              <p className='error'>{laptopBrandError}</p>
            </div>
          </div>
          <div className='laptop-specs'>
            <div className='laptop-cpus'>
              <select defaultValue={'DEFAULT'} className='cpus-select' id='cpus-select' 
                onChange={e => setCpusSelect(e.target.value)}>
                <option value="DEFAULT" disabled>CPU</option>
                {cpus.map(item => (
                <option
                value={item.name}
                >
                {item.name}
                </option>
                ))}
              </select>
              <p className='error'>{laptopCpuError}</p>
            </div>
            <div className='cpu-core' >
              <h5 className='laptop-info-header'>CPU-ს ბირთვი</h5>
              <input  type="text" placeholder='14' className='laptop-info-input'
              onChange={(event) => setCpuCore(event.target.value)} value = {cpuCore}
              required />
              <p className='error'>{cpuCoreError}</p>
            </div>
            <div className='cpu-thread' >
              <h5 className='laptop-info-header'>CPU-ს ნაკადი</h5>
              <input  type="text" placeholder='365' className='laptop-info-input'
              onChange={(event) => setCpuThread(event.target.value)} value = {cpuThread}
              required />
              <p className='error'>{cpuThreadError}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default LaptopInfo