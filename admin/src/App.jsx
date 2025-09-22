import {BrowserRouter, Routes,Route} from "react-router-dom"

import './App.css'
import Login from './pages/Login'
import ProductForm from "./pages/ProductForm"

function App() {
  

  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<ProductForm/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
