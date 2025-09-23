import {BrowserRouter, Routes,Route} from "react-router-dom"

import './App.css'
import Login from './pages/Login'
import ProductForm from "./pages/ProductForm"
import ProductList from "./pages/ProductList"

function App() {
  

  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<ProductForm/>}/>
      <Route path="/productslist" element={<ProductList/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
