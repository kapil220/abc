"use client";

import React, { useState, useCallback, useRef, useMemo, useEffect } from "react";
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

// Memoized shuffle function to prevent unnecessary re-computations
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

// Performance optimization: Precompute shuffled works
const precomputedShuffledWorks = Object.keys(workCategories).reduce((acc, category) => {
  acc[category] = shuffleArray(workCategories[category]);
  return acc;
}, {} as CategoryMap);

// Memoized work item renderer with video thumbnail extraction
const MemoizedWorkItem: React.FC<{ 
  work: WorkItem, 
  index: number, 
  selectedCategory: string, 
  openImageModal: (work: WorkItem) => void,
  openVideoModal: (work: WorkItem) => void 
}> = React.memo(({ 
  work, 
  index, 
  selectedCategory, 
  openImageModal, 
  openVideoModal 
}) =>  {
  const isVideo = work.type === "video" && work.video;
  const heightClasses = ["h-80", "h-96", "h-72", "h-64", "h-84", "h-64", "h-80", "h-96", "h-72", "h-84"];
  const heightClass = heightClasses[index % heightClasses.length];

  // Video thumbnail extraction
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);

  useEffect(() => {
    if (isVideo && work.video) {
      const video = document.createElement('video');
      video.src = work.video;

      const handleLoadedMetadata = () => {
        video.currentTime = 1; // Seek to 1 second to get a representative frame
      };

      const handleTimeUpdate = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
        setVideoThumbnail(canvas.toDataURL());
        
        // Remove event listeners
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('timeupdate', handleTimeUpdate);

      // Cleanup function
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [work.video, isVideo]);

  if (isVideo) {
    return (
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
        onClick={() => openVideoModal(work)}
      >
        <div 
          className={`relative overflow-hidden rounded-xl shadow-md ${heightClass} min-h-[16rem] transform transition-all duration-500 ease-in-out hover:shadow-lg`}
        >
          <div className="absolute inset-0 w-full h-full">
            <Image 
              loading="lazy"
              src={videoThumbnail || "/placeholder.jpg"}
              alt={`${work.title} Thumbnail`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-125 will-change-transform" 
              onError={() => console.error(`Failed to load video thumbnail for: ${work.title}`)}
            />
            
            {/* Video Play Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 rounded-full p-3">
                <Play className="text-white w-8 h-8" />
              </div>
            </div>
            
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              aria-hidden="true"
            ></div>
            
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
        </div>
      </motion.div>
    );
  }

  return (
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
        <div className="absolute inset-0 w-full h-full">
          <Image 
            loading="lazy"
            src={work.image || "/placeholder.jpg"}
            alt={work.title || "Project image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-125 will-change-transform" 
            onError={() => console.error(`Failed to load image for: ${work.title}`)}
          />
          
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
            aria-hidden="true"
          ></div>
          
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
      </div>
    </motion.div>
  );
});
MemoizedWorkItem.displayName = 'MemoizedWorkItem';

function WorkPageClient() {
  const searchParams = useSearchParams();
  const categoryFromQuery = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery && categories.includes(categoryFromQuery) ? categoryFromQuery : "All");
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<WorkItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<WorkItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleItems, setVisibleItems] = useState(15);
  const [isLoading, setIsLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  
  // Performance optimization: Use precomputed shuffled works
  const filteredWorks = useMemo(() => {
    return precomputedShuffledWorks[selectedCategory] || [];
  }, [selectedCategory]);
  
  // Memoized infinite scroll setup
  const setupInfiniteScroll = useCallback(() => {
    // Disconnect any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create a new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleItems < filteredWorks.length) {
          setIsLoading(true);
          
          // Use requestAnimationFrame for smoother loading
          requestAnimationFrame(() => {
            setVisibleItems(prev => Math.min(prev + 12, filteredWorks.length));
            
            // Slight delay to ensure smooth transition
            setTimeout(() => {
              setIsLoading(false);
            }, 300);
          });
        }
      },
      { threshold: 0.1 }
    );

    // Observe the load more trigger
    if (loadMoreTriggerRef.current) {
      observerRef.current.observe(loadMoreTriggerRef.current);
    }
  }, [filteredWorks.length, visibleItems]);

  // Infinite scroll setup effect
  useEffect(() => {
    setupInfiniteScroll();

    // Cleanup observer
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [setupInfiniteScroll]);
  
  // Update selectedCategory when URL parameter changes
  useEffect(() => {
    if (categoryFromQuery && categories.includes(categoryFromQuery)) {
      setSelectedCategory(categoryFromQuery);
      setVisibleItems(15);
    }
  }, [categoryFromQuery]);
  
  // Memoized category change handler
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setVisibleItems(15);
    
    // Update URL with the selected category without refreshing the page
    const url = new URL(window.location.href);
    url.searchParams.set('category', category);
    window.history.pushState({}, '', url);
  }, []);
  
  // Memoized modal open/close handlers
  const openVideoModal = useCallback((work: WorkItem) => {
    setSelectedVideo(work);
    setVideoModalOpen(true);
    setIsPlaying(true);
  }, []);
  
  const closeVideoModal = useCallback(() => {
    setVideoModalOpen(false);
    setSelectedVideo(null);
    setIsPlaying(false);
  }, []);

  const openImageModal = useCallback((work: WorkItem) => {
    setSelectedImage(work);
    setImageModalOpen(true);
  }, []);
  
  const closeImageModal = useCallback(() => {
    setImageModalOpen(false);
    setSelectedImage(null);
  }, []);
  
  // Modal backdrop click handler
  const handleModalBackdropClick = useCallback((e: React.MouseEvent) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
      if (imageModalOpen) {
        closeImageModal();
      } else if (videoModalOpen) {
        closeVideoModal();
      }
    }
  }, [imageModalOpen, videoModalOpen, closeImageModal, closeVideoModal]);
  
  // Video play/pause toggle
  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  // Render method for work items with memoization
  const renderWorkItem = useCallback((work: WorkItem, index: number) => (
    <MemoizedWorkItem
      key={`${selectedCategory}-${index}-${work.title}`}
      work={work}
      index={index}
      selectedCategory={selectedCategory}
      openImageModal={openImageModal}
      openVideoModal={openVideoModal}
    />
  ), [selectedCategory, openImageModal, openVideoModal]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E6DED7] via-[#F8F4EF] to-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:py-40 py-12 pb-20">
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
        
        {/* Masonry Layout with Horizontal-like Loading */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredWorks.slice(0, visibleItems).map(renderWorkItem)}
          </motion.div>
        </AnimatePresence>
        
        {/* Infinite Scroll Trigger with Smooth Loading */}
        {visibleItems < filteredWorks.length && (
          <motion.div 
            ref={loadMoreTriggerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="h-10 w-full text-center mt-4"
          >
            {isLoading && <p className="text-gray-500">Loading more...</p>}
          </motion.div>
        )}
        
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
            className="relative rounded-xl overflow-hidden max-w-4xl w-full h-[80vh]"
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

      {/* Image Modal */}
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

