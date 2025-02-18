"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, Users, MessageSquare } from "lucide-react";

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const features = [
    {
      icon: Target,
      title: "Data-Driven",
      description: "Strategic insights that drive results"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Diverse experience across digital marketing"
    },
    {
      icon: MessageSquare,
      title: "Storytelling",
      description: "Crafting compelling brand narratives"
    }
  ];

  return (
    <main className="bg-gradient-to-b from-[#E6DED7] via-[#F8F4EF] to-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-36 space-y-24">
        {/* Hero Section */}
        <motion.header 
          {...fadeIn} 
          className="text-center space-y-6"
        >
          <h1 className="text-5xl font-bold text-gray-900">The Ink Pot Group</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We are dedicated to writing your success stories through innovative digital marketing strategies.
          </p>
        </motion.header>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-16">
          {/* About Section */}
          <motion.section 
            {...fadeIn}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Our Philosophy</h2>
              <p className="text-gray-700 leading-relaxed">
                We believe in the power of storytelling to connect brands with their audiences. By blending creativity with data-driven insights, we develop strategies that not only capture attention but also foster lasting relationships.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Our Team</h2>
              <p className="text-gray-700 leading-relaxed">
                Our diverse team of experts brings together a wealth of experience in social media management, branding, content creation, and community engagement. We are dedicated to understanding your unique challenges and delivering tailored solutions.
              </p>
            </div>
          </motion.section>

          {/* Features Grid */}
          <motion.section 
            {...fadeIn}
            className="grid gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                {...fadeIn}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#F8F4EF] rounded-lg">
                    <feature.icon className="w-6 h-6 text-[#2C3E50]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.section>
        </div>

        {/* Commitment Section */}
        <motion.section 
          {...fadeIn}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-900">Our Commitment</h2>
          <p className="text-gray-700 leading-relaxed">
            Transparency, collaboration, and excellence are at the core of everything we do. We are committed to helping your brand navigate the digital landscape, ensuring your story is told authentically and effectively.
          </p>
          <p className="text-lg font-medium text-gray-800">
            Let The Ink Pot Group be your partner in writing your success stories.
          </p>
        </motion.section>
      </div>
    </main>
  );
};

export default AboutPage;