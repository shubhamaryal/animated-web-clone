import React, { useState, useRef } from "react";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 3;
  const nextVideoRef = useRef(null); // we use ref to target a specific DOM element

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // 0%4 = 0 + 1 = 1
  // 1%4 = 1 + 1 = 2
  // 2%4 = 2 + 1 = 3
  // 3%4 = 3 + 1 = 4
  // 4%4 = 0 + 1 = 1
  const upcommingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcommingVideoIndex);
  };

  const getVideoSrc = (index) => {
    return `videos/hero-${index}.mp4`;
  };

  return (
    <div className="realtive h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden 
        rounded-lg bg-blue-75"
      >
        <div>
          <div
            className="mask-clip-path absolute-center absolute z-10 size-64 
          cursor-pointer overflow-hidden rounded-lg"
          >
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(currentIndex + 1)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              ></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
