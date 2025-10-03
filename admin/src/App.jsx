import {BrowserRouter, Routes,Route} from "react-router-dom"

import './App.css'
import Login from './pages/Login'
import ProductForm from "./pages/ProductForm"
import ProductList from "./pages/ProductList"
import CategoryForm from "./pages/CategoryForm"
import Dashboard from "./Dashboard"

function App() {
  

  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>}/>

      <Route path='/dashboard' element={<Dashboard/>}>
       <Route path="productslist" element={<ProductList/>}/>
       <Route path="productform" element={<ProductForm/>}/>
       <Route path="categoryform" element={<CategoryForm/>}/>
      </Route>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
