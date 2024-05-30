import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.svg'

function ImageGenerator() {
    const {image_url, setImage_url} = useState("/")
    let inputRef = useRef(null)

    const imageGenerate = async () => {
        if (inputRef.current.value === "") {
            return 0
        }
        try {
             const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method : "POST",
                headers:{
                    "content-Type":"application/json",
                    Authorization:
                    "",
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"1024x1024"
                }    
                ),
            }
        )

        let data = await response.json()
        let data_array =data.data
        setImage_url(data_array[0].url)
        console.log(data)
    
        } catch (error) {
            console.error("Error generating image:", error);
        }
    }
  return (
    <div className='container'>
      <h1 className='header'> Ai Image <span>Generator</span></h1>
      <div className="image-loading">
        <div className="image"><img src={image_url === "/"?image_url:default_image} alt="" /></div>
        <div className="loading">
            <div className="loading-bar"></div>
            <div className="loading-text"></div>
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='description what you want to see' />
        <button className='generate-btn'onClick={()=>{imageGenerate()}}>Generate</button>
      </div>
    </div>
  )
}

export default ImageGenerator
