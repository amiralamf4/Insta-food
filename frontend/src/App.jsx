import React from 'react'
import './App.css' 
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  return (
    <div className="w-full h-screen bg-[url('/wallpaper.png')] bg-cover bg-center bg-no-repeat ">
      <AppRoutes />
    </div>
  )
}

export default App
