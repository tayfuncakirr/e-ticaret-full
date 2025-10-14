import React, { useContext, useEffect, useRef, useState} from 'react'
import { ProductsContext } from '../../context/ProductsContext'

function Category() {
  const {category, products} = useContext(ProductsContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setFilteredProducts([]);
    }
  };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  },[])

  const handleCategoryClick = (catId) =>{ const filtered =  products.filter((product) =>  {

      const productCatId =
      typeof product.category === "object"
        ? product.category._id
        : product.category;

    return String(productCatId) === String(catId);
    }); 
   setFilteredProducts(filtered)
}
  
  return (
    <div className='category-wrapper' >
    <div className='category-container'>
      {category.map((cat) => (
        <div key={cat._id} onClick={() => handleCategoryClick(cat._id)}>
          {cat.name}

        </div>
      ))}

      <div className='filtered-category-container' ref={containerRef}>
        {filteredProducts.length > 0 &&(
          filteredProducts.map((product) => 
           <div key={product._id}>
            {product.images && product.images.length > 0 &&(
              <div className='filtered-product-image'> 
                <img src={`http://localhost:5000/${product.images[0].replace(/^\/+/, '')}`}  alt={product.name} width={70} />
              </div>
            )}
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button>Sepete Ekle</button>
           </div>
          )
        )}
      </div>
    </div>
    </div>
  )
}

export default Category