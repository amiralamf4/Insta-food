// import { set } from 'mongoose'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {

  const navigate = useNavigate();
  const [fullname, setFullname] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(password !== confirmPassword){
      alert("Passwords do not match");
      return;
    }

    const userData = {
      fullName: fullname,
      email,
      password
    }
    const response = axios.post("http://localhost:3000/api/auth/user/register",userData, {withCredentials:true});

    const data = response.data;
    navigate("/home");
    
  }

  return (
    <div className="auth-page w-full h-screen flex justify-center items-center bg-orange-200">
      <div className="auth-card bg-orange-100 w-[80vw] sm:w-[70vw] lg:w-2/5 p-10 rounded-3xl shadow-lg">
        <h1 className="brand text-3xl text-orange-500 font-semibold text-center">InstaZomato</h1>
        <h2 className='text-2xl text-gray-600 font-medium text-center mt-3'>Create your account</h2>
        
        {/* form */}

        <form className="auth-form mt-5 flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="input flex flex-col gap-2">
            <label className='text-orange-500 font-semibold'>Full name</label>
            <input className=' border-b-2 rounded-2xl border-orange-400 p-2 pl-4' 
            onChange={(e)=>setFullname(e.target.value)} value={fullname}
            placeholder="John Doe" />
          </div>
          <div className="input flex flex-col gap-2">
            <label className='text-orange-500 font-semibold'>Email</label>
            <input className=' border-b-2 rounded-2xl border-orange-400 p-2 pl-4' type="email" 
            onChange={(e)=>setEmail(e.target.value)} value={email}
            placeholder="you@example.com" />
          </div>
          <div className="input flex flex-col gap-2">
            <label className='text-orange-500 font-semibold'>Password</label>
            <input className=' border-b-2 rounded-2xl border-orange-400 p-2 pl-4' type="password" 
            onChange={(e)=>setPassword(e.target.value)} value={password}
            placeholder="••••••••" />
          </div>
          <div className="input flex flex-col gap-2">
            <label className='text-orange-500 font-semibold'>Confirm password</label>
            <input className=' border-b-2 rounded-2xl border-orange-400 p-2 pl-4' type="password" 
            onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}
            placeholder="••••••••" />
          </div>
          <button className="submit w-full bg-orange-500 p-2 text-2xl text-white font-semibold rounded-2xl cursor-pointer">Sign up</button>
        </form>
        <div className="alt mt-4">Already have an account? <Link to="/user/login">Log in</Link></div>
        <div className="alt mt-1"><Link to="/partner/register">Register as food partner</Link></div>
      </div>
    </div>
  )
}

export default UserRegister
