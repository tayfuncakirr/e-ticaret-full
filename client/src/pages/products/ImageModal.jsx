import React, { useState } from 'react'
import { useEffect } from 'react';
import { VscChevronRight, VscChevronLeft, VscChromeClose } from "react-icons/vsc";

function ImageModal({product, startIndex=0, isModalOpen, setIsModalOpen, onClose}) {
      const [currentIndex, setCurrentIndex] = useState(startIndex)
         useEffect(() => {
           if(isModalOpen) {
            document.body.style.overflow = "hidden"
           }
           else{
            document.body.style.overflow = "auto";
            return null;
           }
           return () => {
                document.body.style.overflow = "auto";
           }
         },[isModalOpen])

         
        const handlePrev = () => {
        setCurrentIndex((prev) => 
            prev === 0 ? product.images.length - 1 : prev - 1
        )
    };

    const handleNext = () => {
        setCurrentIndex((prev) => 
            prev === product.images.length - 1 ? 0 : prev + 1
        )
    };

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index) 
    };
  return (
    
        <div className='image-modal-container'>
            <div className='modal-header'>
                <h2>{product.description}</h2>
                <button onClick={onClose}><VscChromeClose/></button>
            </div>
        <div className='modal-image-box'>
         <div className='modal-main-image-box'>
            <button className='btn-left' onClick={(e) => {e.stopPropagation(); handlePrev();}}><VscChevronLeft/></button>
            <img src={`http://localhost:5000/${product.images[currentIndex].replace(/^\/+/, '')}`}
             alt={product.name}
             className='modal-main-image' />
         <button className='btn-right' onClick={(e) => {e.stopPropagation(); handleNext();}}><VscChevronRight/></button>
         </div>
        
        <div className='modal-thumbnail-box'>
            {product.images.map((img, index) =>(
                <img 
                 key={index}
                 src={`http://localhost:5000/${img.replace(/^\/+/, '')}`}
                 alt={`${product.name} ${index + 1}`} 
                 className={`thumbnail ${index === currentIndex ? "active" : ""}`}
                 onClick={() => handleThumbnailClick(index)}
                 />
            ))
            }
            </div>
        </div>
    </div>
  )
}

export default ImageModal