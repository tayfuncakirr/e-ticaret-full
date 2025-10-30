import React, { useContext } from 'react'
import { ProductsContext } from '../context/ProductsContext'

function Favorites() {
  const {bestItems} = useContext(ProductsContext);
  return (
    <div>
        {bestItems.length ===0 ? (<p>Favoriler boş</p>) : (
            bestItems.map((item) => (
                <p>{item.name}</p>
            ))
        )}
    </div>
  )
}

export default Favorites