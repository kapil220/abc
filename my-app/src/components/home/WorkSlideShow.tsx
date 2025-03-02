"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { logoDesignWork, realEstateWork, foodRestaurantWork, commercialsWork } from "@/lib/constant";

// Define proper interfaces
interface WorkItem {
  title: string;
  type: string;
  video?: string;
  image?: string;
  category?: string;
  description?: string;
  tags?: string[];
}

interface VideoThumbnailProps {
  work: WorkItem;
}

const VideoThumbnail = ({ work }: VideoThumbnailProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  // Properly type the ref
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleCanPlay = () => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                videoElement.play()
                  .then(() => {
                    setIsPlaying(true);
                    setIsVideoLoaded(true);
                  })
                  .catch((error) => {
                    console.log("Autoplay prevented:", error);
                    setIsVideoLoaded(true);
                  });
              } else {
                videoElement.pause();
                setIsPlaying(false);
              }
            });
          },
          { threshold: 0.5 }
        );
        
        observer.observe(videoElement);
        return () => observer.disconnect();
      };
      
      videoElement.addEventListener("canplay", handleCanPlay);
      videoElement.muted = true;
      
      return () => {
        videoElement.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, []);
  
  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.log("Play prevented:", error));
      }
    }
  };
  
  return (
    <div className="relative w-full h-60 rounded-lg shadow-md overflow-hidden">
      <video
        ref={videoRef}
        src={work.video}
        className={`w-full h-full object-contain transition-opacity duration-300 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        loop
        playsInline
        muted
        preload="metadata"
        onCanPlay={() => setIsVideoLoaded(true)}
      />
      
      {/* Loading indicator */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-4 border-pineGreen border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Video Controls */}
      <div 
        className="absolute bottom-2 left-2 bg-black/50 rounded-full p-1"
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 text-white" />
        ) : (
          <Play className="h-5 w-5 text-white" />
        )}
      </div>
    </div>
  );
};

const WorkSection: React.FC = () => {
  // Use useMemo to prevent the array from being recreated on every render
  const featuredWorks = useMemo(() => [
    ...logoDesignWork.slice(0, 4), 
    ...realEstateWork.slice(0, 5), 
    ...foodRestaurantWork.slice(0, 4), 
    ...commercialsWork.slice(0, 4),
  ], []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  
  // Adjust number of slides based on screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(4);
      }
    };
    
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  useEffect(() => {
    if (featuredWorks.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % Math.ceil(featuredWorks.length / itemsPerSlide));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [featuredWorks, itemsPerSlide]);

  const startIndex = currentSlide * itemsPerSlide;
  const visibleWorks = featuredWorks.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <section className="py-40 bg-gradient-to-b from-[#E6DED7] via-[#F8F4EF] to-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium text-taupe mb-4">Featured Work</h2>
          <p className="text-xl font-subheading text-taupe/80 max-w-3xl mx-auto">
            A glimpse of our projects and creative solutions
          </p>
        </div>
        
        {/* Slideshow with autoplaying videos */}
        <div className="relative flex gap-4 overflow-hidden py-8">
          {visibleWorks.map((work, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
              <div className="cursor-pointer transition-transform hover:scale-105 duration-300 relative">
                {work.type === "video" ? (
                  <VideoThumbnail work={work} />
                ) : (
                  <Image 
                    src={work.image || "/placeholder.jpg"} // Add fallback image
                    alt={work.title} 
                    width={300} 
                    height={200} 
                    className="w-full h-60 object-contain rounded-lg shadow-md" 
                  />
                )}
             
              </div>
            </div>
          ))}
          <button
            onClick={() => setCurrentSlide(prev => (prev - 1 + Math.ceil(featuredWorks.length / itemsPerSlide)) % Math.ceil(featuredWorks.length / itemsPerSlide))}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrentSlide(prev => (prev + 1) % Math.ceil(featuredWorks.length / itemsPerSlide))}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
        
        {/* View All Work Button */}
        <div className="text-center mt-12">
          <Link href="/work" className="inline-block px-8 py-3 bg-pineGreen font-subheading text-white font-medium rounded-lg hover:bg-pineGreen/90 transition-colors shadow-md">
            View All Work
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;