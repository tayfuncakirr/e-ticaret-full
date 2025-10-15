import React, { useContext } from 'react'
import { BasketContext } from '../context/BasketContext'

function Basket() {
    const { basketItems} = useContext(BasketContext);
  return (
    <div className='basket-container'>

        {basketItems.length === 0 ? (
            <p>Sepet boş</p>
        ): (
            <ul>
                {basketItems.map(item => 
                    <li key={item.id}> 
                     {item.name}
                     <p>{item.price}</p>
                    </li>
                )}
            </ul>
        )}
    </div>
  )
}

export default Basket