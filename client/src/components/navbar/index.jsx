import React from 'react'
import {Link} from "react-router-dom"
import  styles from "./styles.module.css"

function Navbar() {
  return (
    
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">Web sanatçısı</Link>
        </div>
        <ul className="menu">
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        <Link to="signin"> <button className='login'>Login</button></Link>
        <Link to="signup"><button className='register'>Register</button></Link>
        </div>
    </nav>

  )
}

export default Navbar