'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  feedback: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'John Doe',
    role: 'CEO, TechCorp',
    feedback: 'This yoga program has transformed my life. The instructors are top-notch and the sessions are incredibly effective.',
    image: '/images/2.jpg'
  },
  {
    name: 'Jane Smith',
    role: 'Marketing Director',
    feedback: 'A perfect blend of mindfulness and exercise. I feel more energized and focused throughout the day.',
    image: '/images/2.jpg'
  },
  {
    name: 'Emily Johnson',
    role: 'Designer',
    feedback: 'The therapeutic yoga sessions helped tremendously. Highly recommended for anyone with back issues!',
    image: '/images/2.jpg'
  },
  {
    name: 'Michael Brown',
    role: 'Entrepreneur',
    feedback: 'The power yoga sessions are intense and rewarding. Its my go-to workout routine now.',
    image: '/images/2.jpg'
  },
  {
    name: 'Emily Johnson',
    role: 'Designer',
    feedback: 'The therapeutic yoga sessions helped tremendously. Highly recommended for anyone with back issues!',
    image: '/images/2.jpg'
  },
  {
    name: 'Michael Brown',
    role: 'Entrepreneur',
    feedback: 'The power yoga sessions are intense and rewarding. Its my go-to workout routine now.',
    image: '/images/2.jpg'
  }
];

const TestimonialsPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const moveCarousel = (direction: 'prev' | 'next') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex(prev => {
      if (direction === 'next') {
        return prev === testimonials.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? testimonials.length - 1 : prev - 1;
      }
    });
    
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleCardClick = (clickedIndex: number) => {
    if (isAnimating || clickedIndex === activeIndex) return;
    
    setIsAnimating(true);
    setActiveIndex(clickedIndex);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const getCardStyle = (index: number) => {
    const diff = (index - activeIndex + testimonials.length) % testimonials.length;
    const center = 0;
    
    let translateX = 0;
    let translateZ = 0;
    let opacity = 1;
    let scale = 1;
    let cursor = 'pointer';

    if (isMobile) {
      // Mobile styles
      if (diff === center) {
        translateX = 0;
        opacity = 1;
        scale = 1;
      } else {
        translateX = diff > 0 ? 100 : -100;
        opacity = 0;
        scale = 0.8;
      }
      translateZ = 0;
    } else {
      // Desktop styles
      if (diff === center) {
        translateZ = 0;
        scale = 1;
        cursor = 'default';
      } else if (diff === 1 || diff === testimonials.length - 1) {
        translateX = diff === 1 ? 150 : -150;
        translateZ = -100;
        scale = 0.8;
        opacity = 0.8;
      } else if (diff === 2 || diff === testimonials.length - 2) {
        translateX = diff === 2 ? 300 : -300;
        translateZ = -200;
        scale = 0.6;
        opacity = 0.6;
      } else {
        translateX = diff > center ? 450 : -450;
        translateZ = -300;
        scale = 0.4;
        opacity = 0;
      }
    }

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex: 1000 - Math.abs(diff),
      transition: 'all 0.4s ease-out',
      cursor
    };
  };

  return (
    <div className="py-12 md:py-24 bg-gradient-to-b from-gray-100 via-[#F8F4EF] to-[#E6DED7]">


      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">


       
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-heading text-taupe text-center mb-8 md:mb-12">What Our Clients Say</h2>
          <h3 className="text-xl font-subheading text-gray-600 max-w-3xl mx-auto">
            Hear what our clients have to say about working with us
          </h3>
        </div>

        <div className="relative h-[500px] md:h-[500px] flex justify-center items-center">


        <div className="absolute inset-0 flex justify-center items-center transform-style-3d">

        {testimonials.map((testimonial, index) => (
  <div
    key={index}
    className="absolute flex justify-center items-center w-[300px] md:w-[450px] h-[300px] md:h-[340px]"
    style={getCardStyle(index)}
    onClick={() => handleCardClick(index)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleCardClick(index);
      }
    }}
    aria-label={`View testimonial from ${testimonial.name}`}
  >
    <div className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow h-full">
      <div className="p-4 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 border-b border-gray-100">
        <Image
         
          src={testimonial.image}
          alt={testimonial.name}
          width={150}
          height={50}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="text-center md:text-left">
          <h3 className="text-lg md:text-xl text-bold font-heading text-pineGreen">
            {testimonial.name}
          </h3>
          <h3 className="text-sm font-subheading text-taupe">
            {testimonial.role}
          </h3>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <p className="text-sm md:text-base text-gray-900 font-body">
        <p>{testimonial.feedback.replace(/"/g, '&quot;')}</p>

        </p>
      </div>
    </div>
  </div>
))}

          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8 md:mt-12">
          <button
            onClick={() => moveCarousel('prev')}
            className="p-2 rounded-full bg-pineGreen/10 hover:bg-pineGreen/20 transition-colors"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-6 h-6 text-pineGreen" />
          </button>
          <button
            onClick={() => moveCarousel('next')}
            className="p-2 rounded-full bg-pineGreen/10 hover:bg-pineGreen/20 transition-colors"
            disabled={isAnimating}
          >
            <ChevronRight className="w-6 h-6 text-pineGreen" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;