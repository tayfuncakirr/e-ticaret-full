import React, { useContext, useEffect, useState } from 'react'
import { BasketContext } from '../context/BasketContext'
import { VscChromeClose } from "react-icons/vsc";

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
            <div className='basket-item-container'>
                <span className='close-btn' onClick={() => setShowBasket(false)}><VscChromeClose/></span>
                {basketItems.map((item,index) => 
                    <li  className='basket-item' key={item._id}> 
                     <p>{item.name}</p>
                      <div className='amount-box'>
                        <span onClick={() => decreaseQuantity(index)}>-</span>
                        <p>{item.quantity}</p>
                        <span onClick={() => increaseQuantity(index)}>+</span>
                        <button onClick={() => removeBasketItem(index)}>Sil</button>
                      </div>
                      <p>{item.quantity * item.price} TL</p>
                    </li>
                )}
                <p >Sepet: {total} ₺</p>
                <button onClick={handleCheckOut}>Sepeti Onayla</button>
            </div>
        )}
    </div>
  )
}

export default Basket