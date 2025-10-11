import React from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom"
import "../App.css"
import { useState } from 'react'


function Navbar({searchTerm, setSearchTerm}) {
  const [token, setToken] = useState(localStorage.getItem("admin") || null);
  const navigate = useNavigate();
  const location = useLocation();

  const isProductPage = location.pathname === "/dashboard/productslist";

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
        {isProductPage  && (
          <div className='search-input-container'>
          <input type="text"
           placeholder='Ara...'
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           />
          <button>Ara</button>
        </div>
        )}
        <div className='admin-log-btn'>{token ? (
            <button onClick={handleLogOut}>Çıkış Yap</button>
        ):(<button onClick={() => navigate("/")}>Giriş Yap</button>)}</div>
    </div>
  )
}

export default Navbar