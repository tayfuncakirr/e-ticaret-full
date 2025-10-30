import React, { useContext } from 'react'
import { ProductsContext } from '../../context/ProductsContext'
import { BasketContext } from '../../context/BasketContext';
import { IoHeartSharp } from "react-icons/io5";



function Products() {
    const {addToBasket} = useContext(BasketContext);
    const {
        products,
        page,
        setPage,
        handleProductDetails,
        totalPages,
        total,
        bestItems,
        toogleFavorite
    } = useContext(ProductsContext);

    
    
/*
    useEffect(() => {
        fetch("http://localhost:5000/api/products")
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch((e) => console.log(e))
    },[])*/

  
    return (
        <>
    <div className='products'>
        {
        products.map((product) => {
            
             const isFavorite = bestItems.some((item) => item._id === product._id);
             return (
                
            <div key={product._id} className='product-card' onClick={() => handleProductDetails(product._id)}>
                <i onClick={(e) => {e.stopPropagation(); toogleFavorite(product)}} 
                     style={{color: isFavorite ? "pink": "rgba(198,198,198,0.5)"}}
                     className='favorites-btn'
                     >
                     <IoHeartSharp/> </i>
                {product.images && product.images.length > 0 &&(
                    <div className='product-image-box'><img  src={`http://localhost:5000/${product.images[0].replace(/^\/+/, '')}`}  alt={product.name} width={100}/></div>
                )}
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.price} ₺</p>
                 <div className='products-btn-box'><button onClick={(e) => {e.stopPropagation(); addToBasket(product)}}>Sepete Ekle</button></div>
            </div>
             )
            
})
        }
    </div>
     <button onClick={() => setPage( page -1)} disabled={page === 1}>Önceki</button>
     <span> {page}/{totalPages} | Toplam ürün: {total}</span>
     <button
      onClick={() => setPage( page +1)} disabled={page === totalPages}>Sonraki</button>
    </>
    )

}

export default Products