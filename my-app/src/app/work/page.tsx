"use client";

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { 
  logoDesignWork, 
  realEstateWork, 
  foodRestaurantWork, 
  commercialsWork, 
  postWork 
} from "@/lib/constant";
import VideoAutoplay from "@/components/media/VideoAutoplay";
import { WorkItem } from "@/types";

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

// Shuffle function
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Explicitly ensure all works are included in the allWorks array
const allWorks = [
  ...logoDesignWork, 
  ...realEstateWork, 
  ...foodRestaurantWork, 
  ...commercialsWork, 
  ...postWork
].filter(Boolean); // Remove any potential null or undefined items

const workCategories: CategoryMap = {
  "All": allWorks,
  "Logo Design": logoDesignWork.filter(Boolean),
  "Real Estate": realEstateWork.filter(Boolean),
  "Food & Restaurant": foodRestaurantWork.filter(Boolean),
  "Commercials": commercialsWork.filter(Boolean),
  "Post": postWork.filter(Boolean),
};

// Create a client component that uses useSearchParams
function WorkPageClient() {
  const searchParams = useSearchParams();
  const categoryFromQuery = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery && categories.includes(categoryFromQuery) ? categoryFromQuery : "All");
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<WorkItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<WorkItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  
  // Update selectedCategory when URL parameter changes
  useEffect(() => {
    if (categoryFromQuery && categories.includes(categoryFromQuery)) {
      setSelectedCategory(categoryFromQuery);
    }
  }, [categoryFromQuery]);
  
  // Use useMemo to create shuffled works for each category
  const shuffledWorkCategories = useMemo(() => {
    return Object.keys(workCategories).reduce((acc, category) => {
      acc[category] = shuffleArray(workCategories[category]);
      return acc;
    }, {} as CategoryMap);
  }, []);
  
  const filteredWorks = shuffledWorkCategories[selectedCategory] || [];
  
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    
    // Update URL with the selected category without refreshing the page
    const url = new URL(window.location.href);
    url.searchParams.set('category', category);
    window.history.pushState({}, '', url);
  }, []);
  
  const getHeightClass = (index: number) => {
    // Modified to handle more varied heights if needed
    const heightClasses = ["h-80", "h-96", "h-72", "h-64", "h-84", "h-64", "h-80", "h-96", "h-72", "h-84"];
    return heightClasses[index % heightClasses.length];
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

  const openImageModal = (work: WorkItem) => {
    setSelectedImage(work);
    setImageModalOpen(true);
  };
  
  const closeImageModal = () => {
    setImageModalOpen(false);
    setSelectedImage(null);
  };
  
  const handleModalBackdropClick = (e: React.MouseEvent) => {
    // Check if the click is on the backdrop and not on the content
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
      if (imageModalOpen) {
        closeImageModal();
      } else if (videoModalOpen) {
        closeVideoModal();
      }
    }
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
      <div className="max-w-7xl mx-auto px-4 py-40 pb-20">
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
        
        {/* Masonry Layout with Animations */}
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
              // Assign base height class
              const heightClass = getHeightClass(index);
              
              return isVideo ? (
                // Video items
                <VideoAutoplay 
                  key={`${selectedCategory}-${index}-${work.title}`}
                  work={work}
                  index={index}
                  openModal={openVideoModal}
                />
              ) : (
                // Image items with varying heights that don't change on hover
                <motion.div 
                  key={`${selectedCategory}-${index}-${work.title}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                  className="group cursor-pointer break-inside-avoid mb-6 will-change-transform"
                  onClick={() => openImageModal(work)}
                >
                  <div 
                    className={`relative overflow-hidden rounded-xl shadow-md ${heightClass} min-h-[16rem] transform transition-all duration-500 ease-in-out hover:shadow-lg`}
                  >
                    {/* Image container */}
                    <div className="absolute inset-0 w-full h-full">
                      <Image 
                        loading="lazy"
                        src={work.image || work.thumbnail || "/placeholder.jpg"}
                        alt={work.title || "Project image"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain transition-transform duration-700 ease-out group-hover:scale-125 will-change-transform" 
                        onError={() => console.error(`Failed to load image for: ${work.title}`)}
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
                            <span key={i} className="text-xs bg-white/20 text-white px-2 py-1 rounded backdrop-blur-sm mr-2 mb-2 inline-block">
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
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={handleModalBackdropClick}
        >
          <div 
            ref={modalContentRef}
            className="relative  rounded-xl overflow-hidden max-w-4xl w-full h-[80vh]"
          >
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

      {/* Image Modal - Optimized for full image visibility */}
      {imageModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={handleModalBackdropClick}
        >
          <div 
            ref={modalContentRef}
            className="relative bg-transparent rounded-xl overflow-hidden max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Image with proper sizing to ensure it's fully visible */}
              <div className="relative w-full h-full max-h-[90vh] flex items-center justify-center">
                <Image 
                  src={selectedImage.image || selectedImage.thumbnail || "/placeholder.jpg"}
                  alt={selectedImage.title || "Project image"}
                  className="object-contain max-w-full max-h-[90vh]"
                  width={1920}
                  height={1080}
                  priority
                />
              </div>
              
              {/* Close button - made more visible */}
              <button 
                onClick={closeImageModal}
                className="absolute top-4 right-4 bg-black/70 text-white rounded-full p-2 hover:bg-black transition-colors z-10"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// Main export with Suspense boundary
export default function WorkPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <WorkPageClient />
    </Suspense>
  );
}