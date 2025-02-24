"use client";
import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { Service } from "@/lib/constant";
import Link from "next/link";

type ServiceContentProps = {
  service: Service;
};

export default function ServiceContent({ service }: ServiceContentProps) {
  return (
    <main className="min-h-screen py-24 bg-gradient-to-b from-[#E6DED7] via-[#F8F4EF] to-gray-100">
      {/* Hero Section with Staggered Elements */}
      <div className="relative min-h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 flex flex-col justify-center p-8 md:p-16"
          >
            <motion.span
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-6 py-2 bg-pineGreen text-isabelline font-body text-sm rounded-full mb-6 w-fit"
            >
              Premium Service
            </motion.span>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-7xl font-heading  text-taupe mb-6"
            >
              {service.name}
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl font-subheading text-taupe/80 max-w-xl"
            >
              {service.shortDescription}
            </motion.p>
          </motion.div>

          {/* Right Image with Overlay */}
          <motion.div 
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-full min-h-[50vh]"
          >
            <Image
              src={service.imageUrl || '/placeholder.jpg'}
              alt={service.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#E6DED7] via-transparent to-transparent md:from-transparent" />
          </motion.div>
        </div>
      </div>

      {/* Main Content with Creative Layouts */}
      <div className="max-w-7xl mx-auto px-8 py-24">
        {/* Services Cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="p-10 rounded-3xl  bg-white shadow-xl">
            <p className="text-xl leading-relaxed text-taupe/80 font-body ">
              {service.fullContent.introduction}
            </p>
          </div>
        </motion.section>
        <motion.section 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="mb-32"
>
  <h2 className="text-4xl font-subheading font-bold  mb-16 text-center text-taupe">
    {service.fullContent.services.title}
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {service.fullContent.services.items.map((item, index) => (
      <motion.div
        key={index}
        className="group relative h-full"
        initial={{ y: 0, scale: 1 }}
        whileHover={{ y: -5, scale: 1.02 }}
      >
        {/* Background Layer */}
        <div className="absolute inset-0 bg-pineGreen rounded-2xl transition-transform" />

        {/* Card Content */}
        <motion.div
          className="relative p-8 bg-white rounded-2xl h-full flex flex-col items-center justify-center text-center"
          initial={{ x: 0, y: 0 }}
          whileHover={{ x: -8, y: -8 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="w-12 h-12 rounded-full bg-wisteria/20 text-wisteria text-xl font-bold flex items-center justify-center">
              {index + 1}
            </span>
            <strong className="text-xl font-bold font-subheading text-taupe">{item.title}:</strong>
            <p className="text-md  font-body text-taupe/80">{item.description}</p>
          </div>
        </motion.div>
      </motion.div>
    ))}
  </div>
</motion.section>


        {/* Process Steps with Curved Flow */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h2 className="text-4xl font-subheading font-bold mb-16 text-center text-taupe">
            {service.fullContent.process.title}
          </h2>
          <div className="relative">
            <div className="absolute top-0 left-1/2 w-px h-full bg-pineGreen/20" />
            {service.fullContent.process.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`relative mb-16 last:mb-0 ${
                  index % 2 === 0 ? 'md:pr-[50%]' : 'md:pl-[50%] md:flex md:justify-end'
                }`}
              >
                <div className="relative p-8 bg-white rounded-2xl shadow-lg max-w-lg">
                  <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-pineGreen transform -translate-x-11 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <h3 className="text-xl font-semibold font-subheading text-taupe mb-4">Step {step.step}</h3>
                  <p className="text-md font-body text-taupe/80">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Benefits with Floating Cards */}
        <motion.section 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="mb-32"
>
  <h2 className="text-4xl font-subheading font-bold mb-16 text-center text-taupe">
    Key Benefits
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {service.benefits.map((benefit, index) => (
      <motion.div
        key={index}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="relative p-1 h-full"
      >
        {/* Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-pineGreen to-wisteria rounded-2xl opacity-80" />

        {/* Card Content */}
        <div className="relative p-8 bg-white rounded-2xl h-full flex flex-col items-center justify-center text-center">
          <span className="w-12 h-12 rounded-xl bg-[#E6DED7] text-taupe text-xl font-bold flex items-center justify-center mb-4">
            {index + 1}
          </span>
          <p className="text-md font-body  text-taupe/80">{benefit}</p>
        </div>
      </motion.div>
    ))}
  </div>
</motion.section>


        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative p-1 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pineGreen via-wisteria to-pineGreen animate-gradient-x" />
            <div className="relative p-12 bg-white rounded-2xl">
              <p className="text-xl font-body  text-center text-taupe/80 mb-10 max-w-3xl mx-auto">
                {service.fullContent.conclusion}
              </p>
              <div className="flex justify-center">
      <Link href="/#contact">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-pineGreen font-subheading font-bold text-white rounded-full shadow-xl hover:bg-pineGreen/90 transition-colors"
        >
          Get Started Today
        </motion.button>
      </Link>
    </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}