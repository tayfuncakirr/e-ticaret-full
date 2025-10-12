import React, { useContext} from 'react'
import { ProductsContext } from '../../context/ProductsContext'

function Category() {
  const {category} = useContext(ProductsContext)
  
  return (
    <div className='category-container'>
      {category.map((cat) => (
        <div key={cat._id}>
          {cat.name}
        </div>
      ))}
    </div>
  )
}

export default Category