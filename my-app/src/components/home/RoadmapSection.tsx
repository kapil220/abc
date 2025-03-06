'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, ArrowRight, ChevronDown } from 'lucide-react';

const steps = [
  { title: 'Consultation call', description: 'Initial discussion to understand your needs.', icon: CheckCircle },
  { title: 'Proposal', description: 'Providing a Tailored Proposal.', icon: CheckCircle },
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

  const [activeStep, setActiveStep] = useState<null | number>(null); // No step open initially

  const handleStepClick = (index: number) => {
    setActiveStep(prev => (prev === index ? null : index)); // Toggle step
  };

  return (
    <section className="pt-12 md:pt-16 lg:pt-20 bg-gradient-to-b from-[#E6DED7] via-[#F8F4EF] to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20"></div>
      <div className="absolute w-6 h-6 bg-pineGreen rounded-full bottom-0 left-1/4 animate-bounce-slow"></div>
      <div className="absolute w-8 h-8 bg-yellow-500 rounded-full bottom-0 left-3/4 animate-bounce-medium"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium mb-8 text-taupe">Our Process</h2>
          <p className="text-xl font-subheading text-taupe/80 max-w-3xl mx-auto">
            A proven roadmap to ensure your digital success
          </p>
        </div>

        {/* Desktop view */}
        <div className="hidden md:block relative py-8">
  {/* Background Line */}
  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-ashGray -translate-y-1/2" />

  <div className="grid grid-cols-6 gap-8 relative">
    {steps.map((step, index) => (
      <motion.div
        key={`desktop-${step.title}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative"
      >
        {/* Step Content */}
        <div className="flex flex-col items-center text-center">
          {/* Step Icon */}
          <div className="w-12 h-12 rounded-full bg-pineGreen text-white flex items-center justify-center relative z-10">
            <step.icon className="w-6 h-6" />
          </div>
          {/* Step Title & Description */}
          <h3 className="text-xl font-bold mt-16">{step.title}</h3>
          <p className="text-taupe/80 font-body">{step.description}</p>
        </div>

        {/* Arrow positioned exactly on the line */}
        {index < steps.length - 1 && (
          <motion.div
            className="absolute top-1/2 left-full -translate-y-1/2 -mt-122"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowRight className="w-5 h-5 text-pineGreen" />
          </motion.div>
        )}
      </motion.div>
    ))}
  </div>
</div>


        {/* Mobile view - Timeline style */}
        <div ref={ref} className="md:hidden">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-pineGreen/20"></div>
            
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={`mobile-${step.title}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <motion.div 
                    className="absolute  z-10 transform -translate-x-1/2"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  ></motion.div>
                  
                  {/* Step number badge */}
                  <div className="text-xs font-bold text-white bg-pineGreen rounded-full w-6 h-6 flex items-center justify-center absolute left-0 top-2">
                    {index + 1}
                  </div>
                  
                  {/* Card */}
                  <div 
  className={`ml-8 mr-4 pl-4 pr-2 py-3 rounded-lg transition-all ${activeStep === index ? 'bg-white shadow-md' : 'bg-transparent'}`}
  onClick={() => handleStepClick(index)}
>

                    <div className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-pineGreen/10 text-pineGreen flex items-center justify-center mr-3">
                          <step.icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold">{step.title}</h3>
                      </div>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform ${activeStep === index ? 'transform rotate-180' : ''}`} 
                      />
                    </div>
                    
                    <AnimatePresence>
                      {activeStep === index && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-taupe/80 font-body text-sm mt-3">{step.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Progress indicator */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-4 top-7 bottom-0 w-0.5 h-12">
                      <motion.div 
                        className="w-full bg-pineGreen"
                        initial={{ height: 0 }}
                        animate={inView ? { height: '100%' } : { height: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      ></motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
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