import Hero from '@/components/home/Hero';
import RoadmapSection from '@/components/home/RoadmapSection';
import ServicesGrid from '@/components/home/ServicesGrid';
import WorkSlideshow from '@/components/home/WorkSlideShow';
import ContactForm from '@/components/home/ContactForm';
import TestimonialsPage from '@/components/home/TestimonialsPage';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      
      <TestimonialsPage />
      <RoadmapSection />
      <ServicesGrid />
      <div id="work">
        <WorkSlideshow />
      </div>
      <ContactForm />
    </>
  );
};

export default Home;
