import React from 'react'
import { useContext, useEffect, useRef } from 'react'
import { ProductsContext } from '../../context/ProductsContext'


function SearchModal({inputValue, setInputValue}) {
  const {products} = useContext(ProductsContext);
  const containerRef = useRef(null);

  useEffect(() => {
      const handleClickOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setInputValue("");
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      }
    },[])
  

  const filtered = products.filter((product) => 
    product.name?.toLowerCase().includes(inputValue.toLowerCase()) ||
    product.sku?.toLowerCase().includes(inputValue.toLowerCase())  ||
    product.description?.toLowerCase().includes(inputValue.toLowerCase()) ||
    product.category.name?.toLowerCase().includes(inputValue.toLowerCase())
  )
  return (
    <>
    {inputValue &&  (
      <div className='filtered-product-container' ref={containerRef}>
        {filtered.map((product) => (
          <div className='filtered-product-list' key={product._id}>
            {product.images && product.images.length > 0 && (
              <div className='filtered-product-image'> 
                <img src={`http://localhost:5000/${product.images[0].replace(/^\/+/, '')}`}  alt={product.name} width={70} />
              </div>
            )}
            <p>{product.name}</p>
            <p>{product.price}</p>
            <button>Sepete ekle</button>
          </div>
        ))}
      </div>
    )}
    </>
  )
}

export default SearchModal