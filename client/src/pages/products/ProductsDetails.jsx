import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ImageModal from './ImageModal';
import { VscChevronRight, VscChevronLeft } from "react-icons/vsc";
import { BasketContext } from '../../context/BasketContext';

function ProductsDetails() {
    const {addToBasket} = useContext(BasketContext)
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
            const data = await response.json();
             if (!response.ok) throw new Error("veri çekilemedi");
             
            setProduct(data);
            }
           catch (err){
            console.error("hata:", err)
           }
        }

        fetchProductDetail();
    },[id]);
    
    if (!product) return <p>Yükleniyor...</p>
    if (!product.images || product.images.length === 0) return <p>Görsel yok</p>

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
    <>
    <div className='product-details'>
        <div className='main-box'>
        <div className='main-image-box' onClick={() => setIsModalOpen(true)}>
         <button className='btn-left' onClick={(e) => {e.stopPropagation(); handlePrev();}}><VscChevronLeft/></button>
            <img src={`http://localhost:5000/${product.images[currentIndex].replace(/^\/+/, '')}`}
             alt={product.name}
             className='main-image' />
         <button className='btn-right' onClick={(e) =>{ e.stopPropagation(); handleNext();}}><VscChevronRight/></button>
        </div>
        <div className='text-box'>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.stock}</p>
            <p>{product.category.name}</p>
            <p>{product.sku}</p>
            <h1>{product.price} ₺</h1>
            <button onClick={() => addToBasket(product)}>Sepete Ekle</button>
         </div>
        </div>
        <div className='thumbnail-box'>
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

    {isModalOpen && (
        <ImageModal
         product={product}
         startIndex={currentIndex}
         isModalOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         handleNext={handleNext}
         handlePrev={handlePrev}
         handleThumbnailClick={handleThumbnailClick}

        />
    )}
    </>
  )
}

export default ProductsDetails
