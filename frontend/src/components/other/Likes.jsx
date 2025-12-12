import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

const Likes = () => {
  return (
    <div className=' absolute bottom-70 right-10 flex flex-col gap-8 text-3xl text-white/60' >
       <div className='bg-white/20 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer'> <FaRegHeart /></div>
       <div className='bg-white/20 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer'> <FaRegBookmark /></div>
    </div>
  )
}

export default Likes