import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext();

function ProductsProvider({children}){
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [category, setCategory] = useState([]);
    const [total, setTotal] = useState([]);

    useEffect(()=>{
     fetch(`http://localhost:5000/api/products?page=${page}&limit=10`)
       .then(response => response.json())
       .then(data =>
         {
            setProducts(data.products);
            setTotalPages(data.totalPages);
            setTotal(data.total);
        })

       .catch((e) => console.log(e))

     
    },[page]);

    useEffect(() => {
        fetch("http://localhost:5000/api/categories")
        .then(response => response.json())
        .then(data => setCategory(data))
        .catch((e) => console.log(e))
    },[])

    return (
        <ProductsContext.Provider value={{products,category,page,totalPages,total,setPage}}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsProvider