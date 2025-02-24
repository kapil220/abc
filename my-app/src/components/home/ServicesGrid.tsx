'use client';
import ServiceCard from '../shared/ServicesCard';
import { services } from '@/lib/constant';

export default function ServicesGrid() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-100 via-[#F8F4EF] to-[#E6DED7] relative w-full">

      {/* Gradient Overlay for Color Effect */}
      <div className="absolute inset-0  opacity-20"></div>

      <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
       
        <div className="text-center mb-16">
          <h2 className="text-4xl  md:text-6xl lg:text-7xl font-heading font-medium text-taupe text-center mb-12">Our Services</h2>
          <p className="text-xl font-subheading text-taupe/80 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to elevate your brand
          </p>
        </div>

        {/* Stacking and scroll effect for all cards */}
        <div className="relative">
          {services.map((service, index) => (
            <div
              key={index}
              className="sticky top-20 transition-transform duration-300"
              style={{
                zIndex: index + 1,                       // Newer cards stack on top
                marginTop: index === 0 ? '0' : '5vh',    // 5% of the previous card visible from top
              }}
            >
              <div className="rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                <ServiceCard service={service} />
              </div>
            </div>
          ))}
        </div>
      </div>

    
    </section>
  );
}
