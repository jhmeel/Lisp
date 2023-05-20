import React from 'react'
import { useState,useEffect} from 'react'
import './style.css'
import Carousel from "react-multi-carousel"
import 'react-multi-carousel/lib/styles.css';
import { nextBtnIcon } from '../../assets/svgIcons';
import iconsback from '/src/assets/logo/iconsback.png'







const BCarousel = () => {
    
 const images = ["/src/assets/images/simplify-codebase-swift-decorator-design-pattern-nocdn.avif","/src/assets/images/using-kotlin-sleep-delay-wait-android-app-web-nocdn.avif","/src/assets/images/Using-Cow-Rust-efficient-memory-utilization.avif"]
const [currentImage, setCurrentImage] = useState(0);

useEffect(()=>{
  const interval = setInterval(() =>{
    setCurrentImage((currentImage + 1) % images.length)
  },20000)
  return () => clearInterval(interval)
},currentImage)

 const handlePrevClick = () => {
   setCurrentImage((currentImage - 1 + images.length) % images.length);
 };

 const handleNextClick = () => {
   setCurrentImage((currentImage + 1) % images.length);
 };




 return (
  <>
   <div className="carousel-container">
       <img  draggable={false} src={images[currentImage]} alt={`Image ${currentImage}`} />
       <div className="btnss">
       <div className="prev-button" onClick={handlePrevClick}><img src={iconsback}/></div>
       <div className="next-button" onClick={handleNextClick}>{nextBtnIcon}</div> 
       </div>
     </div>
     
     

  </>
    
 );
};

export default BCarousel