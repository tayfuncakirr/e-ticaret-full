import React, { useEffect, useState } from 'react'

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch((e) => console.log(e))
    },[])
  return (
    <div className='products'>
        {
        products.map((product) =>(
            <div key={product._id} className='product-card'>
                <img src={product.image} alt={product.name}  width={100}/>
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