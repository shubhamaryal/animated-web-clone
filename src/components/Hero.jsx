import React, { useState, useRef } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // video's index
  const [hasClicked, setHasClicked] = useState(false); // to check if the user has clicked on the minivideo player
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0); // number of videos loaded

  const totalVideos = 4; // total number of videos
  const nextVdRef = useRef(null); // this ref is used to target the next video
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
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  // when we click the div of mini video player this function will be called
  const handleMiniVdClick = () => {
    setHasClicked(true); // to check if the user has clicked on the mini video player
    setCurrentIndex(upcomingVideoIndex); // this provides which video will be played next
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",

        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: " polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      // clippath link is given below
      // https://bennettfeely.com/clippy/
      borderRadius: "0 0 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: " polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  // this function provides the source of the video
  const getVideoSrc = (index) => {
    return `videos/hero-${index}.mp4`;
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* dv is dynamic viewport-percentage unit */}
      {/* relative for positioning the elements and overflow-x-hidden is for avoiding horizontal scrollbar */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* flex-center is flex, justify-center, item-center */}
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden 
        rounded-lg bg-blue-75"
      >
        <div>
          <div
            className="mask-clip-path absolute-center absolute z-50 
            size-64 cursor-pointer overflow-hidden rounded-lg"
          >
            {/* the div below is the one that contains the mini video player */}
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all 
              duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVdRef}
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
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
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          ></video>

          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          ></video>
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
          {/* 'a' is in bold tag cuz we need to have different design of 'a' */}
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              REDEFI<b>N</b>E
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/* when we scroll down, this h1 will be shown in the animation */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;
