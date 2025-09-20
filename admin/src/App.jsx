import {BrowserRouter, Routes,Route} from "react-router-dom"

import './App.css'
import Login from './pages/Login'

function App() {
  

  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<h2>Admin Panel Dashboard</h2>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
