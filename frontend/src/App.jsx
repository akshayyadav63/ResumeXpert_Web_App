import React from 'react'
import { Route,Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import './App.css'
import UserProvider from './context/UserContext'

function App() {
  
  return (
    <UserProvider>
       <Routes>
      <Route path='/' element={<LandingPage/>}/>

    </Routes>
    </UserProvider>
   
  )
}

export default App
