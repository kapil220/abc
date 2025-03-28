"use client";

import { useState, useEffect } from "react";
import Loading from "./loading"; // Import loading component
import Hero from "@/components/home/Hero";
import RoadmapSection from "@/components/home/RoadmapSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import WorkSlideshow from "@/components/home/WorkSlideShow";
import Contact from "@/components/home/Contact";
import TestimonialsPage from "@/components/home/TestimonialsPage";
import Clients from "@/components/home/Clients";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500); // Simulate loading delay
  }, []);

  useEffect(() => {
    // Only run this effect after loading is complete
    if (!isLoading) {
      const shouldScrollToContact = localStorage.getItem('scrollToContact');
      
      if (shouldScrollToContact === 'true') {
        // Clear the flag immediately
        localStorage.removeItem('scrollToContact');
        
        // Give the page time to fully render
        setTimeout(() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, [isLoading]); // This effect runs when isLoading changes to false

  if (isLoading) return <Loading />; // Show loading screen while loading

  return (
    <>
      <Hero />
      <Clients />
      <TestimonialsPage />
      <RoadmapSection />
      <ServicesGrid />
      <div id="work">
        <WorkSlideshow />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
};

export default Home;
