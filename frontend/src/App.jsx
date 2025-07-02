import React from 'react'
import { Route,Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import './App.css'
import UserProvider from './context/UserContext'
import Dashboard from './pages/Dashboard'

function App() {
  
  return (
    <UserProvider>
       <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>

    </Routes>
    </UserProvider>
   
  )
}

export default App
