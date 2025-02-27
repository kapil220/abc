"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  logoDesignWork, 
  realEstateWork, 
  foodRestaurantWork, 
  commercialsWork, 
  postWork 
} from "@/lib/constant";

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

const workCategories = {
  "All": allWorks,
  "Logo Design": logoDesignWork,
  "Real Estate": realEstateWork,
  "Food & Restaurant": foodRestaurantWork,
  "Commercials": commercialsWork,
  "Post": postWork,
};

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredWorks = workCategories[selectedCategory] || [];
  
  // Memoize the category selection handler
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);
  
  // Define height classes outside the render loop for better performance
  const getHeightClass = (index) => {
    const mod = index % 3;
    if (mod === 0) return "h-80";
    if (mod === 1) return "h-96";
    return "h-72";
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
          
          <p className="text-center text-gray-600">
            {selectedCategory === "All" 
              ? `Showing all projects (${filteredWorks.length})` 
              : `Showing ${selectedCategory} projects (${filteredWorks.length})`}
          </p>
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
              const heightClass = getHeightClass(index);
              
              return (
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
                    className={`relative overflow-hidden rounded-xl shadow-md ${heightClass} transition-all duration-500 ease-in-out group-hover:h-96 group-hover:shadow-lg transform group-hover:scale-[1.02]`}
                  >
                    {/* Image container */}
                    <div className="h-full w-full relative">
                      <Image 
                        src={work.image} 
                        alt={work.title || "Project image"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform" 
                        priority={index < 6} // Prioritize loading for visible images
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
                        <h3 className="text-xl font-bold mt-2 text-white">{work.title}</h3>
                        
                        {work.description && (
                          <p className="text-gray-200 mt-3 text-sm line-clamp-3">{work.description}</p>
                        )}
                        
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {work.tags?.length > 0 ? work.tags.map((tag, i) => (
                              <span key={i} className="text-xs bg-white/20 text-white px-2 py-1 rounded backdrop-blur-sm">
                                {tag}
                              </span>
                            )) : (
                              ['Design', 'Creative', 'Portfolio'].map((tag, i) => (
                                <span key={i} className="text-xs bg-white/20 text-white px-2 py-1 rounded backdrop-blur-sm">
                                  {tag}
                                </span>
                              ))
                            )}
                          </div>
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
    </main>
  );
}