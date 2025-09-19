import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import  styles from "./styles.module.css"

function Navbar({user, setUser}) {

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser))
  },[])
  return (
    
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">Web sanatçısı</Link>
        </div>
        <ul className="menu">
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {user ? (
        <div>
          <span>Hoşgeldin {user.name}</span>
          <button onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null);
          }}>Çıkış Yap</button>
        </div>
      ) : (
        <div className={styles.right}>
        <Link to="signin"> <button className='login'>Login</button></Link>
        <Link to="signup"><button className='register'>Register</button></Link>
        </div>
      )}
      
    </nav>

  )
}

export default Navbar