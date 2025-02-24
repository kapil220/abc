"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  logoDesignWork, 
  realEstateWork, 
  foodRestaurantWork, 
  commercialsWork, 
  postWork 
} from "@/lib/constant";

// Assuming you'll need to modify your data structure in lib/constant.js
// to remove slug dependencies and use id or index instead
const categories = [
  "All",
  "Logo Design",
  "Real Estate",
  "Food & Restaurant",
  "Commercials",
  "Post",
];

const workCategories = {
  "All": [...logoDesignWork, ...realEstateWork, ...foodRestaurantWork, ...commercialsWork, ...postWork],
  "Logo Design": logoDesignWork,
  "Real Estate": realEstateWork,
  "Food & Restaurant": foodRestaurantWork,
  "Commercials": commercialsWork,
  "Post": postWork,
};

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredWorks = workCategories[selectedCategory] || [];
  
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
                onClick={() => setSelectedCategory(category)}
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
        
        {/* Project Grid - No slugs used */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWorks.map((work, index) => (
            <div 
              key={index} // Using index as key instead of slug
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="h-full flex flex-col">
                <div className="relative h-48 w-full">
                  <Image 
                    src={work.image} 
                    alt={work.title} 
                    fill
                    className="object-contain p-2" 
                  />
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="font-semibold text-lg">{work.title}</h3>
                  {work.description && (
                    <p className="text-sm text-gray-600 mt-2">{work.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show message if no works found */}
        {filteredWorks.length === 0 && (
          <div className="text-center p-8 bg-white rounded-lg shadow">
            <p className="text-lg text-gray-600">No projects found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}