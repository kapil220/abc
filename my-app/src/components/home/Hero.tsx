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
        <source src="https://res.cloudinary.com/dmqkf89ib/video/upload/v1744107070/landing/videos/ccixh0oxilyzn0fftnfd.mp4" type="video/mp4" />
        Writing your Success Stories
      </video>
      <div className="absolute inset-0 " />
      <div className="relative z-10 text-center top-0 md:px-8">
        <h1 className="text-4xl  md:text-6xl lg:text-8xl font-heading font-bold  text-taupe mb-8">
        Writing your Success Stories
        </h1>
        <h3 className="text-xl lg:text-3xl font-subheading text-taupe/80 max-w-3xl mx-auto">
          Delivering top-notch solutions for your business needs.
        </h3>
      </div>
    </div>
  );
};

export default Hero;
