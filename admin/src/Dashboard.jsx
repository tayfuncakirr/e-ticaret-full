import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
<>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default Dashboard
