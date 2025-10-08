import {BrowserRouter, Routes,Route} from "react-router-dom"
import './App.css'
import Login from './pages/Login'
import ProductForm from "./pages/ProductForm"
import ProductList from "./pages/ProductList"
import CategoryForm from "./pages/CategoryForm"
import Dashboard from "./Dashboard"
import { useState } from "react"
import {jwtDecode} from "jwt-decode";
import { useEffect } from "react"

function App() {
  const [token, setToken] = useState(localStorage.getItem("admin") || null);
  

  useEffect(()=> {
    if (!token) return;

     try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("admin");
        setToken(null);
        window.location.href="/";
      }
    }
    catch(e) {
      localStorage.removeItem("admin");
        setToken(null);
        window.location.href="/";
    }
  },[token]);


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
