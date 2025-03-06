"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, X } from "lucide-react";
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
  onClick: () => void;
}

const VideoThumbnail = ({ work, onClick }: VideoThumbnailProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
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
    <div className="relative w-full h-60 rounded-lg shadow-md overflow-hidden" onClick={onClick}>
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
  // Shuffling function to mix video and image types
  const shuffleWorks = (works: WorkItem[]) => {
    const shuffled = [...works];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Use useMemo to prevent the array from being recreated on every render
  const featuredWorks = useMemo(() => {
    const allWorks = [
      ...logoDesignWork.slice(0, 8), 
      ...realEstateWork.slice(0, 8), 
      ...foodRestaurantWork.slice(0, 16), 
      ...commercialsWork.slice(0, 8),
    ];
    return shuffleWorks(allWorks);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<WorkItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
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

  // Handle modal open/close
  const openVideoModal = (work: WorkItem) => {
    setSelectedVideo(work);
    setVideoModalOpen(true);
    // Pause slideshow when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setSelectedVideo(null);
    setIsPlaying(false);
    document.body.style.overflow = 'auto';
  };

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

  // Add ESC key listener to close modal
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && videoModalOpen) {
        closeVideoModal();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [videoModalOpen]);

  const startIndex = currentSlide * itemsPerSlide;
  const visibleWorks = featuredWorks.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <section className="pt-12 md:pt-16 lg:pt-20 bg-gradient-to-b from-[#E6DED7] via-[#F8F4EF] to-gray-100 relative overflow-hidden">
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
                  <VideoThumbnail 
                    work={work} 
                    onClick={() => openVideoModal(work)}
                  />
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

      {/* Video Modal */}
      {videoModalOpen && selectedVideo && selectedVideo.video && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full h-[80vh]">
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <div className="w-full h-full flex items-center justify-center relative">
                <video 
                  ref={videoRef}
                  src={selectedVideo.video}
                  className="max-w-full max-h-full object-contain"
                  autoPlay
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                
                {/* Custom Play/Pause Button */}
                <button 
                  onClick={togglePlayPause}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </button>
              </div>
              
              {/* Close button */}
              <button 
                onClick={closeVideoModal}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default WorkSection;