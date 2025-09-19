import React, { useEffect, useState } from 'react'

function Category() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
    .then(response => response.json())
    .then(data => setCategory(data))
    .catch(e => console.log(e))
  },[])
  return (
    <div className='category-container'>
      <h2>Kategoriler</h2>
      {category.map((cat) => (
        <div key={cat._id}>
          {cat.name}
        </div>
      ))}
    </div>
  )
}

export default Category