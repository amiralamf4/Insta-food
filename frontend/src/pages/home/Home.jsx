import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const containerRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [current, setCurrent] = useState(null);

  // Fetch video items
  useEffect(() => {
    axios.get("http://localhost:3000/api/food", { withCredentials: true })
      .then((response) => {
        console.log("API response:", response.data.foodItems);
        // console.log(respond.data);
        
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

  return (
    <div className="w-full h-screen bg-gray-800 text-white overflow-hidden flex items-center justify-center">
      <div
        ref={containerRef}
        className="reel-container h-screen bg-gray-800 overflow-y-scroll no-scrollbar scroll-snap-y-mandatory scroll-smooth"
      >
        {videos.length === 0 && (
          <div className="text-center text-gray-300 mt-20">Loading reels...</div>
        )}

        {videos.map((item) => (
          <section
            key={item._id}
            className="w-full h-screen relative overflow-hidden scroll-snap-align-start flex items-center justify-center"
          >
            <video
              className="h-[98vh] w-[95vw]  sm:w-120 object-cover rounded-2xl"
              src={item.video}
              loop
              // muted
              playsInline
              preload="metadata"
              data-id={item._id}    
            />

            {/* Overlay */}
            <div className="absolute bottom-2 left-0 right-0 py-4 px-4 bg-linear-to-b from-transparent  to-black">
              
              <h2 className="text-lg font-bold">{item.name}</h2>

              <p className="text-sm text-gray-300">{item.description}</p>

              {item.foodPartner && (
                <Link
                  to={"/food-partner/" + item.foodPartner}
                  className="bg-orange-600 text-sm px-4 py-2 rounded-xl mt-3 inline-block hover:bg-orange-500"
                >
                  Visit Store
                </Link>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Home;
