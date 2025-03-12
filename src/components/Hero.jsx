import React, { useState, useRef } from "react";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // video's index
  const [hasClicked, setHasClicked] = useState(false); // to check if the user has clicked on the minivideo player
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0); // number of videos loaded

  const totalVideos = 3; // total number of videos
  const nextVideoRef = useRef(null); // this ref is used to target the next video
  // we use ref to target a specific DOM element

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
    // setLoadedVideos(loadedVideos + 1);
  };

  // modulo operation
  // 0%4 = 0 + 1 = 1
  // 1%4 = 1 + 1 = 2
  // 2%4 = 2 + 1 = 3
  // 3%4 = 3 + 1 = 4
  // 4%4 = 0 + 1 = 1
  // we used maths to get the next video index in loop
  const upcommingVideoIndex = (currentIndex % totalVideos) + 1;

  // when we click the div of mini video player this function will be called
  const handleMiniVdClick = () => {
    setHasClicked(true); // to check if the user has clicked on the minivideo player
    setCurrentIndex(upcommingVideoIndex); // this provides which video will be played next
  };

  // this function provides the source of the video
  const getVideoSrc = (index) => {
    return `videos/hero-${index}.mp4`;
  };

  return (
    <div className="realtive h-dvh w-screen overflow-x-hidden">
      {/* dv is dynamic viewport-percentage unit */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden 
        rounded-lg bg-blue-75"
      >
        <div>
          <div
            className="mask-clip-path absolute-center absolute z-10 
            size-64 cursor-pointer overflow-hidden rounded-lg"
          >
            {/* the div below is the one that contains the mini video player */}
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all 
              duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcommingVideoIndex)}
                // the mini video is 1 index ahead of the current video because
                //  we want to show the next video in the mini video player
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover 
                object-center"
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
