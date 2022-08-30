import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {IoIosArrowBack} from 'react-icons/io'
import {useDropzone} from 'react-dropzone';
import './LaptopInfo.css'

function LaptopInfo() {

  const [fileNames, setFileNames] = useState([]);
  const [laptopName, setLaptopName] = useState('');
  const laptopNameError = 'ლათინური ასოები, ციფრები, !@#$%^&*()_+= ';

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
            <div className='name' >
              <h5 className='h5-name'>სახელი</h5>
              <input  type="text" placeholder='HP' className='laptop-name-input'
              onChange={(event) => setLaptopName(event.target.value)} value = {laptopName}
              required />
              <p className='error'>{laptopNameError}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default LaptopInfo