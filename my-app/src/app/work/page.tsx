"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X } from "lucide-react";
import { 
  logoDesignWork, 
  realEstateWork, 
  foodRestaurantWork, 
  commercialsWork, 
  postWork 
} from "@/lib/constant";
import VideoAutoplay from "@/components/media/VideoAutoplay";
import { WorkItem } from "@/types"; // Import the shared interface

interface CategoryMap {
  [key: string]: WorkItem[];
}

const categories = [
  "All",
  "Logo Design",
  "Real Estate",
  "Food & Restaurant",
  "Commercials",
  "Post",
];

// Pre-compute the full work list to avoid recalculating on every render
const allWorks = [...logoDesignWork, ...realEstateWork, ...foodRestaurantWork, ...commercialsWork, ...postWork];

const workCategories: CategoryMap = {
  "All": allWorks,
  "Logo Design": logoDesignWork,
  "Real Estate": realEstateWork,
  "Food & Restaurant": foodRestaurantWork,
  "Commercials": commercialsWork,
  "Post": postWork,
};

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<WorkItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const filteredWorks = workCategories[selectedCategory] || [];
  
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);
  
  const getHeightClass = (index: number) => {
    const mod = index % 3;
    if (mod === 0) return "h-80";
    if (mod === 1) return "h-96";
    return "h-72";
  };
  
  const openVideoModal = (work: WorkItem) => {
    setSelectedVideo(work);
    setVideoModalOpen(true);
    setIsPlaying(true);
  };
  
  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setSelectedVideo(null);
    setIsPlaying(false);
  };
  
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E6DED7] via-[#F8F4EF] to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-40">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">Our Work</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our portfolio of successful projects and creative solutions
          </p>
        </div>
        
        {/* Category Buttons */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`
                  py-2 px-4 rounded-lg border transition-colors duration-300
                  ${selectedCategory === category
                    ? "bg-pineGreen text-white border-pineGreen"
                    : "bg-ashGray text-gray-800 border-gray-300 hover:bg-gray-200"}
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Creative Project Masonry-style Layout with Animations */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredWorks.map((work, index) => {
              const isVideo = work.type === "video" && work.video;
              
              return isVideo ? (
                // Only render VideoAutoplay for items with video property
                <VideoAutoplay 
                  key={`${selectedCategory}-${index}`}
                  work={work}
                  index={index}
                  openModal={openVideoModal}
                />
              ) : (
                <motion.div 
                  key={`${selectedCategory}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                  className="group cursor-pointer break-inside-avoid mb-6 will-change-transform"
                >
                  <div 
                    className={`relative overflow-hidden rounded-xl shadow-md ${getHeightClass(index)} transition-all duration-500 ease-in-out group-hover:h-96 group-hover:shadow-lg transform group-hover:scale-[1.02]`}
                  >
                    {/* Image container */}
                    <div className="h-full w-full relative">
                      <Image 
                        src={work.image || work.thumbnail || "/placeholder.jpg"}
                        alt={work.title || "Project image"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform" 
                        priority={index < 6}
                      />
                      
                      {/* Overlay that appears on hover */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                        aria-hidden="true"
                      ></div>
                    </div>
                    
                    {/* Content that appears on hover */}
                    <div 
                      className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out delay-75 pointer-events-none"
                      aria-hidden="true"
                    >
                      <div>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-pineGreen text-white rounded-md">
                          {work.category || selectedCategory}
                        </span>
                      
                        <div className="mt-4">
  {(work.tags?.length ? work.tags : ["Creative", "Design"]).map((tag, i) => (
    <span key={i} className="text-xs bg-white/20 text-white px-2 py-1 rounded backdrop-blur-sm mr-2 mb-2">
      {tag}
    </span>
  ))}
</div>

                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
        
        {/* Show message if no works found */}
        {filteredWorks.length === 0 && (
          <div className="text-center p-8 bg-white rounded-xl shadow-md">
            <p className="text-lg text-gray-600">No projects found in this category.</p>
          </div>
        )}
      </div>
      
      {/* Video Modal */}
      {videoModalOpen && selectedVideo && selectedVideo.video && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[80vh]">
            <div className="relative">
              <video 
                ref={videoRef}
                src={selectedVideo.video}
                className="w-full"
                controls={false}
                autoPlay
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {/* Video controls */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <button 
                  onClick={togglePlayPause}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>
                
                <h3 className="text-white text-sm md:text-base font-medium backdrop-blur-sm bg-black/30 px-3 py-1 rounded-full">
                  {selectedVideo.title}
                </h3>
              </div>
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
      )}
    </main>
  );
}