import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PartnerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (e)=>{
    e.preventDefault(); 
    const partnerData = {
      email,
      password
    }

    const response = await axios.post("http://localhost:3000/api/auth/foodpartner/login",partnerData, {withCredentials:true});

    const data = response.data;
    navigate("/create-food");
  }

  return (
    <div className="auth-page w-full h-screen flex justify-center items-center">
      <div className="auth-card bg-orange-100 w-[80vw] p-10 rounded-3xl shadow-lg">
        <h1 className="brand text-3xl text-orange-500 font-semibold text-center">InstaZomato</h1>
        <h2 className='text-2xl text-gray-600 font-medium text-center mt-3'>Partner sign in</h2>
        
        {/* form */}

        <form className="auth-form mt-5 flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="input flex flex-col gap-2">
            <label className='text-orange-500 font-semibold'>Email</label>
            <input className=' border-b-2 rounded-2xl border-orange-400 p-2 pl-4' type="email" 
            onChange={(e)=>setEmail(e.target.value)} value={email}
            placeholder="partner@example.com" />
          </div>
          <div className="inpu flex flex-col gap-2t">
            <label className='text-orange-500 font-semibold'>Password</label>
            <input className=' border-b-2 rounded-2xl border-orange-400 p-2 pl-4' type="password" 
            onChange={(e)=>setPassword(e.target.value)} value={password}
            placeholder="••••••••" />
          </div>
          <button className="submit">Sign in</button>
        </form>
        <div>
        <div className="alt">Don't have an account? <Link to="/partner/register">Register</Link></div>
        <div className="alt">Don't have an account? <Link to="/user/register">Register as user</Link></div>
        </div>
      </div>

      {/* Background Img */}
      <div className=" fixed -z-50 w-full h-screen bg-[url('/wallpaper.png')] bg-cover bg-center bg-no-repeat"></div>
    </div>
  )
}

export default PartnerLogin
