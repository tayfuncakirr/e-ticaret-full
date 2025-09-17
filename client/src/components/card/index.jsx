import React from 'react'
import { Link } from 'react-router-dom'

function Card() {
  return (
    <div className='card-container'>
        <div className="card">
         <Link to="#/">
            <img src="https://picsum.photos/id/237/200/300" alt='product'/>
        
        <div className="card-description">
         <p>17/09/2025</p>
         <p>macbook pro</p>
         <p>5000 TL</p>
        </div>
        </Link>
        <Link className='add-link'>Add To Basket</Link>
        
        </div>
        <div className="card">
         <Link to="#/">
            <img src="https://picsum.photos/id/237/200/300" alt='product'/>
        
        <div className="card-description">
         <p>17/09/2025</p>
         <p>macbook pro</p>
         <p>5000 TL</p>
        </div>
        </Link>
        <Link className='add-link'>Add To Basket</Link>
        
        </div>
        <div className="card">
         <Link to="#/">
            <img src="https://picsum.photos/id/237/200/300" alt='product'/>
        
        <div className="card-description">
         <p>17/09/2025</p>
         <p>macbook pro</p>
         <p>5000 TL</p>
        </div>
        </Link>
        <Link className='add-link'>Add To Basket</Link>
        
        </div>
        <div className="card">
         <Link to="#/">
            <img src="https://picsum.photos/id/237/200/300" alt='product'/>
        
        <div className="card-description">
         <p>17/09/2025</p>
         <p>macbook pro</p>
         <p>5000 TL</p>
        </div>
        </Link>
        <Link className='add-link'>Add To Basket</Link>
        
        </div>
        <div className="card">
         <Link to="#/">
            <img src="https://picsum.photos/id/237/200/300" alt='product'/>
        
        <div className="card-description">
         <p>17/09/2025</p>
         <p>macbook pro</p>
         <p>5000 TL</p>
        </div>
        </Link>
        <Link className='add-link'>Add To Basket</Link>
        
        </div>
        <div className="card">
         <Link to="#/">
            <img src="https://picsum.photos/id/237/200/300" alt='product'/>
        
        <div className="card-description">
         <p>17/09/2025</p>
         <p>macbook pro</p>
         <p>5000 TL</p>
        </div>
        </Link>
        <Link className='add-link'>Add To Basket</Link>
        
        </div>
    </div>
  )
}

export default Card