import React from "react";
import Reels from "../../components/reel-video/Reels";
import Navbar from "../../components/nav/Navbar";

const Home = () => {
  

  return (
    <div className="w-full h-screen text-white overflow-hidden flex items-center justify-center relative">
      <Reels/>
      <Navbar/>
    </div>
  );
};

export default Home;
