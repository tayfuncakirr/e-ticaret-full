import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext();

function ProductsProvider({children}){
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(()=>{
     fetch("http://localhost:5000/api/products")
       .then(response => response.json())
       .then(data => setProducts(data))
       .catch((e) => console.log(e))

     fetch("http://localhost:5000/api/categories")
        .then(response => response.json())
        .then(data => setCategory(data))
        .catch((e) => console.log(e))
    },[]);

    return (
        <ProductsContext.Provider value={{products,category}}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsProvider