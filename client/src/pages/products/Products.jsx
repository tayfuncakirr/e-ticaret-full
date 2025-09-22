import React, { useContext } from 'react'
import { ProductsContext } from '../../context/ProductsContext'


function Products() {
    const {products} = useContext(ProductsContext);
/*
    useEffect(() => {
        fetch("http://localhost:5000/api/products")
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch((e) => console.log(e))
    },[])*/
  return (
    <div className='products'>
        {
        products.map((product) =>(
            <div key={product._id} className='product-card'>
                {product.images && product.images.map((img, index) => (
                    <img key={index} src={`http://localhost:5000${product.images[0]}`} alt={product.name} />
                ))}
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.price} ₺</p>

            </div>
        ))
        }
    </div>

  )
}

export default Products