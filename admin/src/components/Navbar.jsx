import React from 'react'
import {Link} from "react-router-dom"
import "../App.css"

function Navbar() {
  return (
    <div className='navbar'>
        <Link to={"/dashboard/productslist"}>Ürünler</Link>
        <Link to={"/dashboard/productform"}>Ürün Ekle</Link>
        <Link to={"/dashboard/categoryform"}>Kategoriler</Link>
        <Link to={"/"}>admin</Link>
    </div>
  )
}

export default Navbar