import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

const Reels = () => {

    const containerRef = useRef(null);
    const [videos, setVideos] = useState([]);
    const [current, setCurrent] = useState(null);

    // Fetch video items
    useEffect(() => {
        axios.get("http://localhost:3000/api/food", { withCredentials: true })
            .then((response) => {
                // console.log("API response:", response.data.foodItems);
                console.log(response.data);

                setVideos(response.data.foodItems || []);
            })
            .catch((err) => {
                console.log("API error:", err.response?.status, err.response?.data);
            });
    }, []);

    // Auto play/pause based on scroll
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const videoEls = Array.from(container.querySelectorAll("video"));
        if (!videoEls.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const vid = entry.target;
                    if (!(vid instanceof HTMLVideoElement)) return;

                    if (entry.isIntersecting) {
                        vid.play().catch((err) => console.log("Autoplay denied", err));
                        setCurrent(vid.dataset.id);
                    } else {
                        vid.pause();
                    }
                });
            },
            { root: container, threshold: 0.6 }
        );

        videoEls.forEach((v) => observer.observe(v));
        return () => observer.disconnect();
    }, [videos]);

    async function videoHandel(e) {
        const video = e.target
        if (video.paused) {
            video.play().catch(err => {
                console.error("play() failed:", err);
              
                video.muted = true;
                video.play().catch(e => console.error("retry failed:", e));
            });
        } else {
            video.pause();
        }

    }

    async function likeVideo(item) {

        const response = await axios.post("http://localhost:3000/api/food/like", { foodId: item._id }, { withCredentials: true })

        if (response.data.like) {
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, LikeCount: v.LikeCount + 1 } : v))
        } else {
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, LikeCount: v.LikeCount - 1 } : v))
        }

    }
    async function bookmarkVideo(item) {
        console.log(item);

        const response = await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })

        if (response.data.save) {
            console.log("Video save");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount + 1 } : v))
        } else {
            console.log("Video unsave");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount - 1 } : v))
        }

    }

    return (
        <div ref={containerRef} className="reel-container h-screen overflow-y-scroll no-scrollbar scroll-snap-y-mandatory scroll-smooth">
            {videos.length === 0 &&
                (<div className="text-center text-gray-300 mt-20">Loading reels...</div>)}

            {videos.map((item) => (
                <section key={item._id} className="w-full h-screen relative overflow-hidden scroll-snap-align-start flex items-center justify-center bg-black">
                    <video onClick={videoHandel} className="h-screen w-106  object-cover  md:h-[98vh] md:rounded-3xl"
                        src={item.video}
                        loop
                        playsInline
                        preload="metadata"
                        data-id={item._id} />

                    {/* Overlay */}

                    {/* Likes & Save Components */}

                    <div className=' aria-label="like" absolute bottom-70 right-10 flex flex-col gap-8 text-3xl text-white/60' >
                        <div className="text-center">
                            <button onClick={() => likeVideo(item)} className='bg-white/20 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer'><FaRegHeart /></button>
                            <p className="text-2xl">{item.LikeCount}</p>
                        </div>
                        <div className="text-center">
                            <button onClick={() => bookmarkVideo(item)} className='bg-white/20 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer'> <FaRegBookmark /></button>
                            <p className="text-2xl">{item.saveCount}</p>
                        </div>
                    </div>

                    {/* Food details */}
                    <div className="absolute bottom-0  w-106 h-56 py-1 px-4 flex flex-col ">

                        <h2 className="text-lg font-bold">{item.name}</h2>

                        <p className="text-sm text-gray-300 h-18 pt-1">{item.description}</p>

                        {item.foodPartner &&
                            (<Link to={"/food-partner/" + item.foodPartner} className="bg-orange-600 text-sm px-4 py-3 rounded-xl mt-1 w-28 hover:bg-orange-500" >
                                Visit Store
                            </Link>
                            )}
                    </div>
                </section>
            ))}
        </div>
    )
}

export default Reels