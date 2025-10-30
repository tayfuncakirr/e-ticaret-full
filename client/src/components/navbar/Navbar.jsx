import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import  styles from "./styles.module.css"
import SearchModal from './SearchModal';

function Navbar({user, setUser, setShowBasket}) {
  const [inputValue, setInputValue] = useState("");
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser))
  },[])
  return (
    <>
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">Web sanatçısı</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/favoriler">Favoriler</Link>
          </li>
        </ul>
      </div>
      <div className='search-input'>
        <input type="text" placeholder='Ara' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <button>Ara</button>
      </div>
      <button className={styles.basketBtn} onClick={() => setShowBasket(prev => !prev)}>Basket</button>
      {user ? (
        <div className={styles.userLoginBox}>
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

    <SearchModal inputValue = {inputValue} setInputValue={setInputValue}/>
       </>
  )
}

export default Navbar