import Hero from '@/components/home/Hero';
import RoadmapSection from '@/components/home/RoadmapSection';
import ServicesGrid from '@/components/home/ServicesGrid';
import WorkSlideshow from '@/components/home/WorkSlideShow';
import Contact from '@/components/home/Contact';
import TestimonialsPage from '@/components/home/TestimonialsPage';
import Clients from '@/components/home/Clients';


const Home: React.FC = () => {
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
      <div id='contact'><Contact /></div>
      
    </>
  );
};

export default Home;
