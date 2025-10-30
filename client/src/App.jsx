import { useState } from 'react'
import { Routes,Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'

import './App.css'
import Signin from './pages/auth/signin/Signin'
import Signup from './pages/auth/signup/Signup'
import Products from './pages/products/Products'
import Category from './pages/categories/Category'
import ProductsProvider from './context/ProductsContext'
import Home from './pages/home/Home'
import Basket from './components/Basket'
import BasketProvider from './context/BasketContext'
import Payment from './pages/pay/Payment'
import ProductsDetails from './pages/products/ProductsDetails'
import Favorites from './pages/Favorites'

function App() {
   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
   const [showBasket, setShowBasket] = useState(false);

  return (
    <BrowserRouter>
    <ProductsProvider>
    <BasketProvider user={user} setUser={setUser}>
    <Navbar user={user} setUser={setUser} setShowBasket={setShowBasket}/>
    <Category/>  
    {
      showBasket && <Basket setShowBasket={setShowBasket} user={user}/>
    }
    <Routes>
      <Route path='/' index element={<Home/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path="/signin" element={<Signin setUser={setUser}/>}/>
      <Route path="/signup" element={<Signup setUser={setUser}/>}/>
       <Route path="/favoriler" element={<Favorites/>}/>
      <Route path="/payment" element={<Payment/>}/>
      <Route path='/products/productdetails/:id' element={<ProductsDetails/>}/>
      
    </Routes>
    </BasketProvider>
    </ProductsProvider>
    </BrowserRouter>
    
  )
}




export default App
