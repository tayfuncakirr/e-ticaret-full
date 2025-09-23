import React, { useContext } from 'react'
import { ProductsContext } from '../../context/ProductsContext'


function Products() {
    const {products} = useContext(ProductsContext);
    const {page,setPage} = useContext(ProductsContext);
    const {totalPages} = useContext(ProductsContext);
    const {total} = useContext(ProductsContext);
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
        products.map((product) =>(
            <div key={product._id} className='product-card'>
                {product.images && product.images.map((img, index) => (
                    <img key={index} src={`http://localhost:5000${product.images[0]}`} alt={product.name} width={100}/>
                ))}
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.price} ₺</p>

            </div>
        ))
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