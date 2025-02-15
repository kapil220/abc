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
    <section className="py-16 bg-gradient-to-b from-[#E6DED7] via-[#F8F4EF] to-gray-100 relative overflow-hidden">

      <div className="absolute inset-0 b opacity-20"></div>

      <div className="absolute w-6 h-6 bg-pineGreen rounded-full bottom-0 left-1/4 animate-bounce-slow"></div>
      <div className="absolute w-8 h-8 bg-yellow-500 rounded-full bottom-0 left-3/4 animate-bounce-medium"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-bold font-heading text-center mb-8 text-taupe">Our Process</h2>
          <p className="font-subheading text-xl md:text-2xl max-w-3xl mx-auto">
            A proven roadmap to digital success
          </p>
        </div>
        <div className="relative flex flex-col items-center">
          <div className="absolute w-1 bg-gray-600 h-full"></div>
          {steps.map((step, index) => (
            <div key={index} className="flex items-center mb-8 w-full">
              {index % 2 === 0 ? (
                <div className="w-full md:w-1/2 pr-8 text-right">
                  <div className="inline-block bg-wisteria shadow-lg rounded-xl p-4 border border-gray-700 transform transition-transform duration-300 hover:scale-105">
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-black">{step.description}</p>
                  </div>
                </div>
              ) : (
                <div className="w-1/2"></div>
              )}
              <div className="w-8 h-8 bg-pineGreen rounded-full border-4 border-gray-900 shadow-lg z-10"></div>
              {index % 2 !== 0 ? (
                <div className="w-full md:w-1/2 pl-8 text-left">
                  <div className="inline-block bg-wisteria shadow-lg rounded-xl p-4 border border-gray-700 transform transition-transform duration-300 hover:scale-105">
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-black">{step.description}</p>
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
