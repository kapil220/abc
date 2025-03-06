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
    name: 'Josephine Ben',
    role: 'CEO, TechCorp',
    feedback: 'Partnering with The Ink Pot Group for our social media management was a game-changer. Their strategic approach and engaging content significantly boosted our online presence, leading to a 40% increase in follower engagement within just three months.',
    image: '/images/test1.jpg'
  },
  {
    name: 'Kamran Ahemad',
    role: 'Marketing Director, Startup Brand',
    feedback: 'As a startup, we needed a robust marketing strategy to make our mark. The Ink Pot Group delivered beyond our expectations, crafting a comprehensive plan that elevated our brand and attracted our target audience effectively.',
    image: '/images/test2.jpg'
  },
  {
    name: 'Julian Gennifer',
    role: 'Influencer & Content Creator',
    feedback: 'Collaborating with The Ink Pot Group for content creation has been a delight. Their creative team understands the influencer landscape, producing authentic and engaging content that resonates with my followers and enhances my brand.',
    image: '/images/test3.jpg'
  },
  {
    name: 'Delton Mark',
    role: 'Event Organizer & Entrepreneur',
    feedback: 'The Ink Pot Group videography team captured the essence of our event flawlessly. Their attention to detail and cinematic approach resulted in a stunning video that we will cherish and use for future promotions.',
    image: '/images/test4.jpg'
  },
  {
    name: 'Pushp Sharma',
    role: 'Real Estate Consultant',
    feedback: 'The Ink Pot Group real estate photography services are top-notch. Their keen eye for detail and ability to highlight property features have significantly enhanced our listings, attracting more potential buyers.',
    image: '/images/test5.jpg'
  },
  {
    name: 'Vennesa Tylor',
    role: 'Brand Owner & Entrepreneur',
    feedback: 'We approached The Ink Pot Group for a logo redesign, and they exceeded our expectations. The new logo perfectly encapsulates our brand identity and has received numerous compliments from our clients.',
    image: '/images/test6.jpg'
  },
  {
    name: 'Yemi',
    role: 'Digital Marketing Specialist',
    feedback: 'The Ink Pot Group holistic approach to digital marketing transformed our online presence. From social media management to content creation, their expertise has driven measurable growth and increased our customer base.',
    image: '/images/test7.jpg'
  },
  {
    name: 'Luca Ross',
    role: 'Influencer Marketing Strategist',
    feedback: 'Thanks to The Ink Pot Group strategic guidance, our influencer collaborations have been more impactful. Their insights into the influencer market ensured authentic partnerships that aligned with our brand values.',
    image: '/images/test8.jpg'
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
    <div className=" py-12 md:py-24 bg-gradient-to-b from-gray-100 via-[#F8F4EF] to-[#E6DED7]">


      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">


       
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-heading text-taupe font-medium text-center mb-8 md:mb-12">What Our Clients Say</h2>
          <h3 className="text-xl font-subheading text-taupe/80 max-w-3xl mx-auto">
            Hear what our clients have to say about working with us
          </h3>
        </div>

        <div className="relative h-[280px] md:h-[500px] flex justify-center items-center">


        <div className="absolute inset-0 flex justify-center items-center transform-style-3d">

        {testimonials.map((testimonial, index) => (
  <div
    key={index}
    className="absolute flex justify-center items-center w-[300px] md:w-[450px] h-[320px] md:h-[340px]"
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
          <h3 className="text-lg md:text-xl text-semibold font-heading text-pineGreen">
            {testimonial.name}
          </h3>
          <h3 className="text-md font-subheading text-taupe">
            {testimonial.role}
          </h3>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <p className="text-sm md:text-base text-center text-taupe/80 font-body mb-4">
        {testimonial.feedback.replace(/"/g, '&quot;')}

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