import React, { useEffect, useState } from 'react'
import Navbar from '../../components/nav/Navbar'
import { FaRegBookmark } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios"
import { Link } from "react-router-dom";



const SaveReels = () => {

  const [videos, setVideo] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/api/food/save", { withCredentials: true })
      .then(response => {

        const saveVideos = response.data.saveFoods.map((item) => ({
          _id: item.food._id,
          name: item.food.name,
          video: item.food.video,
          description: item.food.description,
          LikeCount: item.food.LikeCount,
          saveCount: item.food.saveCount,
          foodPartner_id: item.food.foodPartner._id,
        }))
        console.log(response.data.saveFoods);

        setVideo(saveVideos);
      })


  }, [])


  async function likeVideo(item) {

    const response = await axios.post("http://localhost:3000/api/food/like", { foodId: item._id }, { withCredentials: true })

    if (response.data.like) {
      console.log("Video liked");
      setVideo((prev) => prev.map((v) => v._id === item._id ? { ...v, LikeCount: v.LikeCount + 1 } : v))
    } else {
      console.log("Video unliked");
      setVideo((prev) => prev.map((v) => v._id === item._id ? { ...v, LikeCount: v.LikeCount - 1 } : v))
    }

  }
  async function bookmarkVideo(item) {
    console.log(item);

    const response = await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })
    console.log(response);

    if (response.data.save) {
      console.log("Video save");
      setVideo((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount + 1 } : v))
    } else {
      console.log("Video unsave");
      setVideo((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount - 1 } : v))
    }

  }

  return (
   <div className="w-full h-screen flex justify-center text-white bg-[url('/wallpaper.png')] bg-cover bg-center bg-no-repeat">
     <div className="reel-container bg-black  z-10 h-screen overflow-y-scroll no-scrollbar scroll-snap-y-mandatory scroll-smooth ">
      {videos.length === 0 &&
        (<div className="text-center text-gray-300 mt-20 w-106">NO saved video found...</div>)}

      {videos.map((item) => (
        <section key={item._id} className="w-full h-screen relative overflow-hidden scroll-snap-align-start flex items-center justify-center">
          <video className="h-screen w-106  object-cover"
            src={item.video}
            loop
            playsInline
            preload="metadata"
            data-id={item._id} />

          {/* Likes & Save Components */}

          <div className="absolute bottom-70 right-10 flex flex-col gap-8 text-3xl">
            {/* Like */}
            <div className="text-center">
              <button onClick={() => likeVideo(item)} className="bg-white/20 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer">
                <FaRegHeart /></button>
              <p className="text-2xl">{item.LikeCount}</p>
            </div>

            {/* Bookmark */}
            <div className="text-center">
              <button onClick={() => bookmarkVideo(item)} className="bg-white/20 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer">
                <FaRegBookmark /></button>
              <p className="text-2xl">{item.saveCount}</p>
            </div>
          </div>

          {/* Videos details */}
          <div className="absolute bottom-0 w-106 h-56 py-1 px-4 flex flex-col">

            <h2 className="text-lg font-bold">{item.name}</h2>

            <p className="text-sm text-gray-300 h-18 pt-1">{item.description}  </p>

            <Link to={`/food-partner/${item.id}`} className="bg-orange-600 text-sm px-4 py-3 rounded-xl mt-1 w-28 hover:bg-orange-500">
              Visit Store
            </Link>

          </div>
        </section>
      ))}

      <Navbar/>
    </div>
   </div>
  )
}

export default SaveReels








{/*<div className="absolute bottom-70 right-10 flex flex-col gap-8 text-3xl text-white/60">
    
    <div className="text-center">
      <button
        onClick={() => likeVideo(item)}
        className="bg-white/20 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer"
      >
        <FaRegHeart />
      </button>
      <p className="text-2xl">{item.LikeCount}</p>
    </div>

    <div className="text-center">
      <button
        onClick={() => bookmarkVideo(item)}
        className="bg-white/20 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer"
      >
        <FaRegBookmark />
      </button>
      <p className="text-2xl">{item.saveCount}</p>
    </div>*/}