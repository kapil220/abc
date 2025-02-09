'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { workPortfolio } from "@/lib/constant";

const WorkSlideshow: React.FC = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % workPortfolio.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Slideshow Section */}
        <h2 className="text-3xl font-bold text-center my-12">Our Work</h2>
        <div className="relative">
          <div
            className="overflow-hidden rounded-lg cursor-pointer"
            onClick={() => router.push(`/work/${workPortfolio[currentSlide].slug}`)}
          >
            <img
              src={workPortfolio[currentSlide].image}
              alt={workPortfolio[currentSlide].title}
              className="w-full h-96 object-cover transition-all duration-500 ease-in-out transform hover:scale-105"
            />
          </div>
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + workPortfolio.length) % workPortfolio.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % workPortfolio.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Small Display Grid Below Slideshow */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {workPortfolio.map((work) => (
            <Link key={work.slug} href={`/work/${work.slug}`} className="group relative block rounded-lg overflow-hidden">
              <div className="relative w-full h-32">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  priority={true}
                />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm font-semibold">{work.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSlideshow;
