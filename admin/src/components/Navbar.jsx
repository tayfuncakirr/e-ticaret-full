import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import "../App.css"
import { useState } from 'react'


function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("admin") || null);
  const navigate = useNavigate();
  

   const handleLogOut = () => {
     localStorage.removeItem("admin");
     setToken(null);
     navigate("/")
     
   }
  return (
    <div className='navbar'>
        <Link to={"/dashboard/productslist"}>Ürünler</Link>
        <Link to={"/dashboard/productform"}>Ürün Ekle</Link>
        <Link to={"/dashboard/categoryform"}>Kategoriler</Link>
        <div className='admin-log-btn'>{token ? (
            <button onClick={handleLogOut}>Çıkış Yap</button>
        ):(<button onClick={() => navigate("/")}>Giriş Yap</button>)}</div>
    </div>
  )
}

export default Navbar