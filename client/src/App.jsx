import { useState } from 'react'
import { Routes,Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/navbar'

import './App.css'
import Signin from './pages/auth/signin'
import Signup from './pages/auth/signup'

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    
  )
}

function Home() {
  return (

    <div>Home</div>
  )
}


export default App
