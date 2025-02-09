'use client';

import React from 'react';

const RoadmapSection: React.FC = () => {
  const steps = [
    { title: 'Consultation call', description: 'Initial discussion to understand your needs.' },
    { title: 'Proposal', description: 'We provide a tailored proposal.' },
    { title: 'Finalisation of contract', description: 'Agreement on terms and conditions.' },
    { title: 'Ideation', description: 'Brainstorming creative solutions.' },
    { title: 'Implementation', description: 'Executing the planned solutions.' },
    { title: 'Follow up', description: 'Ensuring satisfaction and support.' },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-purple-800 via-transparent to-blue-800 opacity-20"></div>
      {/* Bouncing Ball Animation */}
      <div className="absolute w-6 h-6 bg-pink-500 rounded-full bottom-0 left-1/4 animate-bounce-slow"></div>
      <div className="absolute w-8 h-8 bg-yellow-500 rounded-full bottom-0 left-3/4 animate-bounce-medium"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Our Roadmap</h2>
        <div className="relative flex flex-col items-center">
          <div className="absolute w-1 bg-gray-600 h-full"></div>
          {steps.map((step, index) => (
            <div key={index} className="flex items-center mb-8 w-full">
              {index % 2 === 0 ? (
                <div className="w-full md:w-1/2 pr-8 text-right">
                  <div className="inline-block bg-gray-800 shadow-lg rounded-xl p-4 border border-gray-700 transform transition-transform duration-300 hover:scale-105">
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </div>
                </div>
              ) : (
                <div className="w-1/2"></div>
              )}
              <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-gray-900 shadow-lg z-10"></div>
              {index % 2 !== 0 ? (
                <div className="w-full md:w-1/2 pl-8 text-left">
                  <div className="inline-block bg-gray-800 shadow-lg rounded-xl p-4 border border-gray-700 transform transition-transform duration-300 hover:scale-105">
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-gray-400">{step.description}</p>
                  </div>
                </div>
              ) : (
                <div className="w-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 5s infinite ease-in-out;
        }
        .animate-bounce-medium {
          animation: bounce 3s infinite ease-in-out;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-200px);
          }
        }
      `}</style>
    </section>
  );
};

export default RoadmapSection;
