import { useState } from 'react'
import { Routes,Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'

import './App.css'
import Signin from './pages/auth/signin/Signin'
import Signup from './pages/auth/signup/Signup'
import Products from './pages/products/Products'
import Category from './pages/categories/Category'

function App() {
   const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  return (
    <BrowserRouter>
    <Category/>
    <Navbar user={user} setUser={setUser}/>
    <Routes>
      
      <Route path='/products' element={<Products/>}/>
      <Route path="/signin" element={<Signin setUser={setUser}/>}/>
      <Route path="/signup" element={<Signup setUser={setUser}/>}/>
      
    </Routes>
    </BrowserRouter>
    
  )
}




export default App
