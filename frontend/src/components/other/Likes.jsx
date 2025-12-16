import React from 'react'
import { FaRegHeart } from "react-icons/fa"; 

const Likes = ({item, onLike, likeCount}) => {
    
  return (
     <div className="text-center">
        <button  onClick={() => onLike(item)} className='bg-white/20 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer'><FaRegHeart /></button>
        <p className="text-2xl">{likeCount}</p>
      </div>
  )
}

export default Likes