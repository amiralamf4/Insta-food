import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const  handleSubmit = async (e) => {
    e.preventDefault();   
    const userData = {
      email,
      password
    }
    const response = await axios.post("http://localhost:3000/api/auth/user/login",userData, {withCredentials:true}); 
    // console.log(response.data);
     
    navigate("/home");

  } 

  return (
    <div className="auth-page w-full h-screen flex justify-center items-center">
      <div className="auth-card bg-orange-100 w-[80vw] sm:w-[60vw] lg:w-1/4 p-10 rounded-3xl shadow-lg">
        <h1 className="brand text-3xl text-orange-500 font-semibold text-center">InstaZomato</h1>
        <h2 className='text-2xl text-gray-600 font-medium text-center mt-3'>Welcome back</h2>
        
        {/* form */}
        
        <form className="auth-form mt-5 flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="input flex flex-col gap-2">
            <label className='text-orange-500 font-semibold'>Email</label>
            <input className=' border-b-2 rounded-2xl border-orange-400 p-2 pl-4' type="email" 
            onChange={(e)=>setEmail(e.target.value)} value={email}
            placeholder="you@example.com" />
          </div>
          <div className="input flex flex-col gap-2">
            <label className='text-orange-500 font-semibold'>Password</label>
            <input className='border-b-2 rounded-2xl border-orange-400 p-2 pl-4' type="password" 
            onChange={(e)=>setPassword(e.target.value)} value={password}
            placeholder="••••••••" />
          </div>
          <button className="submit w-full bg-orange-500 p-2 text-2xl text-white font-semibold rounded-2xl cursor-pointer">Log in</button>
        </form>
        <div className='text-xs'>
        <div className="alt mt-4"><Link to="/partner/login">Log in as Food Partner.</Link></div>
        <div className="alt mt-1">New here? <Link to="/user/register">Create an account</Link></div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
