"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type ServiceContentProps = {
  service: {
    imageUrl: string;
    name: string;
    image?: string;
    description: string;
    benefits: string[];
    targetAudience: string;
    gallery?: string[];
  };
};

export default function ServiceContent({ service }: ServiceContentProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <div className="relative h-[60vh] w-full">
        {/* Main Image */}
        <Image
          src={service.imageUrl || '/placeholder.jpg'}
          alt={service.name}
          fill
          className="object-cover"
          priority
        />
        
        {/* Gradient Overlay with improved aesthetics */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/75" />

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col justify-center px-8 max-w-7xl mx-auto"
        >
          {/* Service Category Tag */}
          <span className="inline-block px-4 py-1 bg-teal-600 text-white text-sm rounded-full mb-4 w-fit">
            Premium Service
          </span>

          {/* Title Section */}
          <div className="relative">
            <h1 className="text-6xl font-serif font-bold text-white mb-4">
              {service.name}
            </h1>
            
            {/* Animated Decorative Line */}
            <div className="relative h-1 w-24 mb-6 overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-teal-500"
              />
            </div>

            {/* Description with enhanced styling */}
            <p className="text-xl text-gray-100 max-w-2xl leading-relaxed">
              {service.description.slice(0, 150)}...
              <span className="ml-2 text-teal-400">Read more</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            <section>
              <h2 className="text-3xl font-serif font-semibold mb-6 text-gray-800">
                About This Service
              </h2>
              <div className="p-8 rounded-xl bg-white shadow-lg border border-gray-100">
                <p className="text-lg leading-relaxed text-gray-700">
                  {service.description}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-semibold mb-6 text-gray-800">
                Target Audience
              </h2>
              <div className="p-8 rounded-xl bg-teal-50 shadow-lg border border-teal-100">
                <p className="text-lg leading-relaxed text-gray-700">
                  {service.targetAudience}
                </p>
              </div>
            </section>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-serif font-semibold mb-6 text-gray-800">
              Key Benefits
            </h2>
            <div className="space-y-4 ">
              {service.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                  className="p-6 rounded-xl bg-white shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl border-l-4 border-teal-500"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-lg text-gray-700">
                      {benefit}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}