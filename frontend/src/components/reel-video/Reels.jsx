import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import Likes from "../other/Likes";
import BookmarkVideo from "../other/bookmark";
import FoodDetails from "../other/FoodDetails";

const Reels = () => {

    const containerRef = useRef(null);
    const [videos, setVideos] = useState([]);
    const [current, setCurrent] = useState(null);

    // Random videos
    const shuffleArray = (array) => {
        const shuffled = [...array]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
    }


    // Fetch video items
    useEffect(() => {
        axios.get("http://localhost:3000/api/food", { withCredentials: true })
            .then((response) => {
                // console.log("API response:", response.data.foodItems);
                console.log(response.data);

                const items = response.data.foodItems || []
                setVideos(shuffleArray(items))

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
            { root: container, threshold: 0.45 }
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
        console.log(response);

        if (response.data.save) {
            console.log("Video save");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount + 1 } : v))
        } else {
            console.log("Video unsave");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, saveCount: v.saveCount - 1 } : v))
        }

    }

    return (
        <div ref={containerRef} className="reel-container bg-black/80 z-10 h-screen overflow-y-scroll no-scrollbar scroll-snap-y-mandatory scroll-smooth">
            {videos.length === 0 &&
                (<div className="text-center text-gray-300 mt-20 w-106">Loading reels...</div>)}

            {videos.map((item) => (
                <section key={item._id} className="w-full h-screen relative overflow-hidden scroll-snap-align-start flex items-center justify-center">
                    <video onClick={videoHandel} className="h-screen w-106  object-cover"
                        src={item.video}
                        loop
                        playsInline
                        preload="metadata"
                        data-id={item._id} />

                    {/* Overlay */}

                    {/* Likes & Save Components */}

                    <div className=' aria-label="like" absolute bottom-70 right-10 flex flex-col gap-8 text-3xl text-white/60' >
                        <Likes item={item} onLike={likeVideo} likeCount={item.LikeCount} />
                        <BookmarkVideo item={item} onSave={bookmarkVideo} saveCount={item.saveCount} />
                    </div>

                    {/* Food details */}
                    <FoodDetails name={item.name} description={item.description} foodPartner={item.foodPartner} />
                </section>
            ))}
        </div>
    )
}

export default Reels