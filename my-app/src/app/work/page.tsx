// app/work/page.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { logoDesignWork, realEstateWork, foodRestaurantWork, commercialsWork, postWork } from "@/lib/constant";

const categories = [
  "All",
  "Logo Design",
  "Real Estate",
  "Food & Restaurant",
  "Commercials",
  "Post",
];

const workCategories = {
  "All": [...logoDesignWork, ...realEstateWork, ...foodRestaurantWork, ...commercialsWork,],
  "Logo Design": logoDesignWork,
  "Real Estate": realEstateWork,
  "Food & Restaurant": foodRestaurantWork,
  "Commercials": commercialsWork,
  "Post": postWork,
  
};

export default function WorkPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredWorks, setFilteredWorks] = useState(workCategories["All"]);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  useEffect(() => {
    setFilteredWorks(workCategories[selectedCategory] || []);
    setCurrentSlide(0);
  }, [selectedCategory]);

  useEffect(() => {
    if (filteredWorks.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % Math.ceil(filteredWorks.length / itemsPerSlide));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [filteredWorks, itemsPerSlide]);

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

  const startIndex = currentSlide * itemsPerSlide;
  const visibleWorks = filteredWorks.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E6DED7] via-[#F8F4EF] to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-40">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Work</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 text-heading">
            Explore our portfolio of successful projects and creative solutions
          </p>
        </div>
        
        {/* Basic Category Buttons */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  py-2 px-4 rounded-lg border 
                  ${selectedCategory === category
                    ? "bg-pineGreen text-white border-pineGreen hover:bg-pineGreen hover:text-white"
                    : "bg-ashGray text-gray-800 border-gray-300 "}
                `}
              >
                {category}
              </button>
            ))}
          </div>
          
          <p className="text-center text-gray-600">
            {selectedCategory === "All" ? "Showing all projects" : `Showing ${selectedCategory} projects`}
          </p>
        </div>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleWorks.map((work) => (
            <div key={work.slug} className="bg-white rounded-lg shadow overflow-hidden">
              <Link href={`/work/${work.slug}`}>
                <div className="cursor-pointer">
                  <Image 
                    src={work.image} 
                    alt={work.title} 
                    width={300} 
                    height={200} 
                    className="w-full h-48 object-contain" 
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{work.title}</h3>
                    {work.description && (
                      <p className="text-sm text-gray-600 mt-2">{work.description}</p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        {/* Basic Navigation Controls */}
        {filteredWorks.length > itemsPerSlide && (
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={() => setCurrentSlide(prev => (prev - 1 + Math.ceil(filteredWorks.length / itemsPerSlide)) % Math.ceil(filteredWorks.length / itemsPerSlide))}
              className="bg-white rounded-full p-2 shadow hover:bg-gray-100"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => setCurrentSlide(prev => (prev + 1) % Math.ceil(filteredWorks.length / itemsPerSlide))}
              className="bg-white rounded-full p-2 shadow hover:bg-gray-100"
              aria-label="Next Slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}