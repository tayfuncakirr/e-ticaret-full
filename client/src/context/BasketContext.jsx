import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const BasketContext = createContext();
function BasketProvider({children, user}) {

  const navigate = useNavigate();
    
    const [basketItems, setBasketItems] = useState(() => {
      const savedBasket = localStorage.getItem("basket");
      return savedBasket ? JSON.parse(savedBasket) : []
    });
    
    
    const handleCheckOut = () => {
        if (!user) {
             navigate("/signin")
        }
        else {
            navigate("/payment")
        }
    }

    useEffect(() => {
      localStorage.setItem("basket", JSON.stringify(basketItems))
    },[basketItems])

    const addToBasket = (product) => {
        setBasketItems(prev => {
         const existing = prev.find(item => item._id === product._id);

         if (existing) {
          return prev.map( item => (
          item._id === product._id
          ? {...item, quantity: item.quantity + 1}
          : item
          ));

         } else {
          return [...prev, {...product, quantity: 1}]
         }

        } )
    }
    const removeBasketItem = (index) => {
       setBasketItems(basketItems.filter((_,i) => i !== index ))
    }

    const increaseQuantity = (index) => {
      setBasketItems(prev => prev.map((item,i) => i === index
        ? {...item, quantity: item.quantity +1}
        : item)
      )
    }
    const decreaseQuantity = (index) => {
      setBasketItems(prev => prev.map((item,i) => 
        i === index
         ? {...item, quantity: item.quantity -1}
         : item)
         .filter(item => item.quantity > 0)
        )
      };
  return (
    <BasketContext.Provider value={{
      basketItems,
       addToBasket,
       removeBasketItem,
       increaseQuantity,
       decreaseQuantity,
       handleCheckOut }}>
        {children}
    </BasketContext.Provider>
  )
}

export default BasketProvider