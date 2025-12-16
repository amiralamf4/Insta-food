import React from 'react'
import {Link} from 'react-router-dom'
import { AiOutlineHome } from "react-icons/ai";
import { IoBookmarkOutline } from "react-icons/io5";


const Navbar = () => {
  return (
    <div className=' fixed z-20 bottom-0 items-center w-106 h-14 flex justify-evenly bg-transparent'>
        <Link to="/home"><AiOutlineHome  size={24}/></Link>
        <Link to="/save-reels"><IoBookmarkOutline size={24}/></Link>
    </div>
  )
}

export default Navbar