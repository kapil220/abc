'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
  { title: 'Consultation call', description: 'Initial discussion to understand your needs.', icon: CheckCircle },
  { title: 'Proposal', description: 'We provide a tailored proposal.', icon: CheckCircle },
  { title: 'Finalisation of contract', description: 'Agreement on terms and conditions.', icon: CheckCircle },
  { title: 'Ideation', description: 'Brainstorming creative solutions.', icon: CheckCircle },
  { title: 'Implementation', description: 'Executing the planned solutions.', icon: CheckCircle },
  { title: 'Follow up', description: 'Ensuring satisfaction and support.', icon: CheckCircle },
];

const RoadmapSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 bg-gradient-to-b from-[#E6DED7] via-[#F8F4EF] to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20"></div>
      <div className="absolute w-6 h-6 bg-pineGreen rounded-full bottom-0 left-1/4 animate-bounce-slow"></div>
      <div className="absolute w-8 h-8 bg-yellow-500 rounded-full bottom-0 left-3/4 animate-bounce-medium"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl  md:text-6xl lg:text-7xl font-heading font-medium mb-8 text-taupe">Our Process</h2>
          <p className="text-xl font-subheading text-taupe/80 max-w-3xl mx-auto">
            A proven roadmap to ensure your digital success
          </p>
        </div>

        <div ref={ref} className="relative py-6 md:py-20">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-ashGray -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-pineGreen text-white flex items-center justify-center  relative z-10">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mt-24">{step.title}</h3>
                  <p className="text-taupe/80 font-body ">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-pine" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
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
