'use client';
import ServiceCard from '../shared/ServicesCard';
import { services } from '@/lib/constant';

export default function ServicesGrid() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative">
      {/* Gradient Overlay for Color Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-transparent to-blue-800 opacity-20"></div>

      <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        <h2 className="text-4xl font-bold text-center text-white mb-16">Our Services</h2>

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

      {/* Custom Pulse Animation */}
      <style jsx>{`
        .animate-pulse {
          animation: pulse 3s infinite ease-in-out;
        }

        @keyframes pulse {
          0% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.2;
          }
        }
      `}</style>
    </section>
  );
}
