import React, { createContext, useState } from 'react'

export const BasketContext = createContext();
function BasketProvider({children}) {

    const [basketItems, setBasketItems] = useState([]);

    const addToBasket = (product) => {
        setBasketItems(prev => 
            [...prev, product]
        )
    }
  return (
    <BasketContext.Provider value={{basketItems, addToBasket}}>{children}</BasketContext.Provider>
  )
}

export default BasketProvider