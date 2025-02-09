'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'John Doe',
    role: 'CEO, TechCorp',
    feedback: 'This yoga program has transformed my life. The instructors are top-notch and the sessions are incredibly effective.',
    image: '/images/2.jpg'
  },
  {
    name: 'Jane Smith',
    role: 'Marketing Director, HealthPlus',
    feedback: 'A perfect blend of mindfulness and physical exercise. I feel more energized and focused throughout the day.',
    image: '/images/2.jpg'
  },
  {
    name: 'Emily Johnson',
    role: 'Freelance Designer',
    feedback: 'The therapeutic yoga sessions helped me recover from a chronic back issue. Highly recommended!',
    image: '/images/2.jpg'
  },
  {
    name: 'Michael Brown',
    role: 'Entrepreneur',
    feedback: 'The power yoga sessions are intense and rewarding. It’s my go-to workout routine now.',
    image: '/images/2.jpg'
  }
];

const clientLogos = [
  '/images/client1.jpg',
  '/images/client2.jpg',
  '/images/client3.jpg',
  '/images/client4.jpg'
];

const TestimonialsPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-16">What Our Clients Say</h2>

          {/* User Images as Selectors with Zig-Zag Layout */}
          <div className="flex justify-center space-x-4 mb-8">
            {testimonials.map((testimonial, index) => (
              <img
                key={index}
                src={testimonial.image}
                alt={testimonial.name}
                onClick={() => setActiveIndex(index)}
                className={`w-16 h-16 rounded-full object-cover cursor-pointer border-4 transition-transform transform ${
                  activeIndex === index ? 'border-gray-500 scale-110 ' : 'border-transparent'
                } ${index % 2 === 0 ? 'translate-y-0' : 'translate-y-4'}`}
              />
            ))}
          </div>

          {/* Active Testimonial with Navigation */}
          <div className="relative p-8 rounded-2xl mx-auto max-w-xl   transition-transform duration-300">
            <button
              onClick={handlePrev}
              className="absolute -left-8 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-300 transition-all"
            >
              <ChevronLeft size={30} />
            </button>

            <div>
              <h3 className="text-xl font-semibold mb-2">{testimonials[activeIndex].name}</h3>
              <p className="text-gray-500 mb-4">{testimonials[activeIndex].role}</p>
              <p className="text-gray-700 italic">&quot;{testimonials[activeIndex].feedback}&quot;</p>

            </div>

            <button
              onClick={handleNext}
              className="absolute -right-8 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-300 transition-all"
            >
              <ChevronRight size={30} />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-black scale-125' : 'bg-gray-300'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Client Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Clients</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {clientLogos.map((logo, index) => (
              <div
                key={index}
                className="aspect-video flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt={`Client ${index + 1}`}
                  className="object-contain h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsPage;
