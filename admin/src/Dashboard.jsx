import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
<>
    <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    <Outlet context={{searchTerm}}/>
    </>
  )
}

export default Dashboard
