import React from 'react'
import { useEffect,useState } from 'react'

function ProductList() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [category, setCategory] = useState([]);
    const [total, setTotal] = useState([]);

    useEffect(() => {
        fetch (`http://localhost:5000/api/products?page=${page}&limit=10`)
        .then( response => response.json())
        .then (data =>{
            setProducts(data.products);
            setTotalPages(data.totalPages);
            setTotal(data.total);
        }) 
    })
  return (
    <>
    <div>
        {products.map((product) => (
            <div key={product._id}>
                {product.images && product.images.map((img,index) =>(
                    <img key={index} src={`http://localhost:5000${product.images[0]}`} alt={product.name} width={100}/>
                ))}
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>{product.stock}</p>
                <p>{product.price}</p>
                <button>Ürünü Düzenle</button>
                <button>Ürünü Sil</button>
                <hr />
            </div>
        ))}
    </div>
    <button onClick={() => setPage(page -1)} disabled={page === 1}>Önceki</button>
    <span>{page} / {totalPages}</span>
    <button onClick={() => setPage(page +1)} disabled={page === totalPages}>Sonraki</button>
    <span> Toplam Ürün: {total}</span>
    </>
  )
}

export default ProductList