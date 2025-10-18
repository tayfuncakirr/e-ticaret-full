import React, { useContext, useEffect, useState } from 'react'
import { BasketContext } from '../context/BasketContext'

function Basket({setShowBasket}) {

    const {
           removeBasketItem,
           basketItems,
           increaseQuantity,
           decreaseQuantity,
           handleCheckOut
          } = useContext(BasketContext);

    const total = basketItems.reduce((sum, item) => sum + item.price * item.quantity,0)

    
  return (
    <div className='basket-container'>

        {basketItems.length === 0 ? (
            <p>Sepet boş</p>
        ): (
            <ul>
                <span onClick={() => setShowBasket(false)}>x</span>
                {basketItems.map((item,index) => 
                    <li key={item._id}> 
                     {item.name} x {item.quantity}
                     <p>{item.quantity * item.price}</p>

                     <span onClick={() => increaseQuantity(index)}>artı</span>

                     <span onClick={() => decreaseQuantity(index)}>eksi</span>
                     <button onClick={() => removeBasketItem(index)}>Sil</button>

                    </li>
                )}
                <p >Sepet: {total} ₺</p>
                <button onClick={handleCheckOut}>Sepeti Onayla</button>
            </ul>
        )}
    </div>
  )
}

export default Basket