"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <main className="pt-24 ">
      <section className="py-20 bg-gradient-to-b from-[#E6DED7] via-[#F8F4EF] to-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="font-heading text-3xl  md:text-5xl lg:text-7xl font-bold mb-12">About The Inkpot Group</h1>
            <h3 className="font-subheading max-w-3xl mx-auto text-xl md:text-2xl lg:text-4xl">
              Crafting digital excellence since 2020
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                The Inkpot Group was founded with a vision to transform how brands connect with their audience in the digital space. We believe in the power of authentic storytelling and data-driven strategies to create meaningful connections.
              </p>
              <p className="text-gray-600">
                Our team of creative professionals and digital strategists work together to deliver exceptional results that help our clients stand out in todays competitive landscape.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Users,
                title: 'Expert Team',
                description: 'Talented professionals with diverse expertise',
              },
              {
                icon: Target,
                title: 'Results Driven',
                description: 'Focused on delivering measurable outcomes',
              },
              {
                icon: Award,
                title: 'Quality First',
                description: 'Committed to excellence in every project',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-block p-4 bg-isabelline rounded-full mb-4">
                  <item.icon className="w-8 h-8 text-pine" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;