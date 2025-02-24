// components/WorkSection.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { logoDesignWork, realEstateWork, foodRestaurantWork, commercialsWork } from "@/lib/constant";

const WorkSection: React.FC = () => {
  // Select just a few featured works for the homepage preview
  const featuredWorks = [...logoDesignWork.slice(0, 3), ...realEstateWork.slice(0, 3), ...foodRestaurantWork.slice(0, 3), ...commercialsWork.slice(0, 3),];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  
  // Adjust number of slides based on screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
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
          <h2 className="text-4xl  md:text-6xl lg:text-7xl font-heading font-medium text-taupe mb-4">Featured Work</h2>
          <p className="text-xl font-subheading text-taupe/80 max-w-3xl mx-auto">
            A glimpse of our projects and creative solutions
          </p>
        </div>
        
        {/* Slideshow */}
        <div className="relative flex gap-4 overflow-hidden py-8">
          {visibleWorks.map(work => (
            <div key={work.slug} className="w-full sm:w-1/2 lg:w-1/3">
              <Link href={`/work/${work.slug}`}>
                <div className="cursor-pointer transition-transform hover:scale-105 duration-300">
                  <Image 
                    src={work.image} 
                    alt={work.title} 
                    width={300} 
                    height={200} 
                    className="w-full h-60 object-contain rounded-lg shadow-md" 
                  />
                  <h3 className="text-center mt-4 font-semibold">{work.title}</h3>
                </div>
              </Link>
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