"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { socialMediaWork, digitalStrategyWork, contentCreationWork, photographyWork, brandingWork } from "@/lib/constant";

const categories = [
  "All",
  "Social Media Management",
  "Digital Strategy",
  "Content Creation",
  "Photography and Videography",
  "Branding and Logo Designing"
];

const workCategories = {
  "All": [...socialMediaWork, ...digitalStrategyWork, ...contentCreationWork, ...photographyWork, ...brandingWork],
  "Social Media Management": socialMediaWork,
  "Digital Strategy": digitalStrategyWork,
  "Content Creation": contentCreationWork,
  "Photography and Videography": photographyWork,
  "Branding and Logo Designing": brandingWork,
};

const WorkSlideshow: React.FC = () => {
  const router = useRouter();
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
        setItemsPerSlide(3);
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
    <section className="py-32 bg-gradient-to-b from-[#E6DED7] via-[#F8F4EF] to-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Our Work</h2>
          <h3 className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Explore our portfolio of successful projects and creative solutions
          </h3>
        </div>
        
        {/* Category Buttons in Grid Layout */}
        <div className="grid grid-cols-2 md:flex md:justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg font-semibold ${selectedCategory === category ? "bg-pineGreen text-white" : "bg-wisteria"}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Slideshow */}
        <div className="relative flex gap-4 overflow-hidden py-12">
          {visibleWorks.map(work => (
            <div key={work.slug} className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer`} onClick={() => router.push(`/work/${work.slug}`)}>
              <Image src={work.image} alt={work.title} width={300} height={200} className="w-full h-60 object-cover rounded-lg" />
              <h3 className="text-center mt-2 font-semibold">{work.title}</h3>
            </div>
          ))}
          <button
            onClick={() => setCurrentSlide(prev => (prev - 1 + Math.ceil(filteredWorks.length / itemsPerSlide)) % Math.ceil(filteredWorks.length / itemsPerSlide))}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrentSlide(prev => (prev + 1) % Math.ceil(filteredWorks.length / itemsPerSlide))}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WorkSlideshow;
