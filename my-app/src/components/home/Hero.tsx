'use client';
import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="h-screen relative flex items-center justify-center top-0">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/hero.mp4" type="video/mp4" />
        Writing your Success Stories
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-center text-white px-4 md:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  font-heading font-bold mb-4">
        Writing your Success Stories
        </h1>
        <h3 className="text-lg sm:text-xl md:text-2xl font-subheading">
          Delivering top-notch solutions for your business needs.
        </h3>
      </div>
    </div>
  );
};

export default Hero;
