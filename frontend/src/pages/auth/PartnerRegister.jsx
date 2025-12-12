import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PartnerRegister = () => {

  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [phone, setPhone] = useState() 

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const partnerData = {
      businessName: companyName,
      name,
      email,
      phone,
      password
    }
    const response = await axios.post("http://localhost:3000/api/auth/foodpartner/register",partnerData, {withCredentials:true});

    const data = response.data;
    navigate("/home");
    console.log("work");
  }
    

  return (
    <div className="auth-page w-full h-screen flex justify-center items-center">
      <div className="auth-card bg-orange-100 w-[80vw] sm:w-[70vw] lg:w-2/5 p-10 rounded-3xl shadow-lg">
        <h1 className="brand text-3xl text-orange-500 font-semibold text-center">InstaZomato</h1>
        <h2 className='text-2xl text-gray-600 font-medium text-center mt-3'>Food Partner Signup</h2>
       
       {/* form */}

        <form className="auth-form mt-5 flex flex-col gap-6" onSubmit={handleSubmit}>
         
          <div className="input flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="input flex flex-col gap-2 sm:w-1/2">
            <label className='text-orange-500 font-semibold'>Business name</label>
            <input className=' border-b-2 rounded-2xl border-orange-400 p-2 pl-4 sm:w-full' 
            onChange={(e)=>setCompanyName(e.target.value)} value={companyName}
            placeholder="My Restaurant" />
          </div>

          <div className="input flex flex-col gap-2 sm:w-1/2">
            <label className='text-orange-500 font-semibold'>Owner Name</label>
            <input className=' border-b-2 rounded-2xl border-orange-400 p-2 pl-4 sm:w-full' 
            onChange={(e)=>setName(e.target.value)} value={name}
            placeholder="My Restaurant" />
          </div>
          </div>
         
         
          <div className="input flex flex-col gap-2">
            <label className='text-orange-500 font-semibold'>Contact email</label>
            <input className=' border-b-2 rounded-2xl border-orange-400 p-2 pl-4' type="email" 
            onChange={(e)=>setEmail(e.target.value)} value={email}
            placeholder="partner@example.com" />
          </div>
          
           <div className="input flex flex-col gap-2">
            <label className='text-orange-500 font-semibold'>Phone</label>
            <input className=' border-b-2 rounded-2xl border-orange-400 p-2 pl-4' type="tel"
            onChange={(e)=>setPhone(e.target.value)} value={phone}
            placeholder="+91 555 555 555" />
          </div>
          
          <div className="input flex flex-col gap-2">
            <label className='text-orange-500 font-semibold'>Password</label>
            <input className=' border-b-2 rounded-2xl border-orange-400 p-2 pl-4' type="password" 
            onChange={(e)=>setPassword(e.target.value)} value={password}
            placeholder="••••••••" />
          </div>
         
          <button className="submit bg-orange-500 p-2 rounded-2xl text-xl text-white font-semibold">Create partner account</button>
        </form>
        <div className='text-xs mt-5'>
        <div className="alt">Already a partner? <Link to="/partner/login">Sign in</Link></div>
        <div className="alt mt-1">Already have a user account? <Link to="/user/login">Sign in as user</Link></div>
        </div>
      </div>
    </div>
  )
}

export default PartnerRegister
