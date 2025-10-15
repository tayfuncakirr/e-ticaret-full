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

function App() {
   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
   const [showBasket, setShowBasket] = useState(false);

  return (
    <ProductsProvider>
    <BasketProvider>
      <BrowserRouter>
    <Navbar user={user} setUser={setUser} setShowBasket={setShowBasket}/>
    <Category/>  
    {
      showBasket && <Basket/>
    }
    <Routes>
      <Route path='/' index element={<Home/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path="/signin" element={<Signin setUser={setUser}/>}/>
      <Route path="/signup" element={<Signup setUser={setUser}/>}/>
      
    </Routes>
    </BrowserRouter>
    </BasketProvider>
    </ProductsProvider>
    
  )
}




export default App
