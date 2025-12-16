import React from 'react'
import { FaRegBookmark } from "react-icons/fa";

const BookmarkVideo = ({ item, onSave, saveCount }) => {
     

    return (
        <div className="text-center">
            <button onClick={() => onSave(item)} className='bg-white/20 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer'> <FaRegBookmark /></button>
            <p className="text-2xl">{item.saveCount}</p>
        </div>
    )
}

export default BookmarkVideo