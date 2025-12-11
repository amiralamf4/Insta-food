import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister.jsx'
import UserLogin from '../pages/auth/UserLogin.jsx'
import PartnerRegister from '../pages/auth/PartnerRegister.jsx'
import PartnerLogin from '../pages/auth/PartnerLogin.jsx'
import Home from '../pages/home/Home.jsx'
import CreateFood from '../pages/food-partner/CreateFood.jsx'
import Profile from '../pages/food-partner/Profile.jsx'

const AppRoutes = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        <Route path="/user/register" element={<UserRegister/>} />
        <Route path="/user/login" element={<UserLogin/>} />
        <Route path="/partner/register" element={<PartnerRegister/>} />
        <Route path="/partner/login" element={<PartnerLogin/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/create-food" element={<CreateFood/>}/>
        <Route path="/food-partner/:id" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes