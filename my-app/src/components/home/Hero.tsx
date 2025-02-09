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
    <div className="relative h-screen flex items-center justify-center">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/video/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-center text-white px-4 md:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
          We are the best
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl">
          Delivering top-notch solutions for your business needs.
        </p>
      </div>
    </div>
  );
};

export default Hero;
