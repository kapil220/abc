import ServicesGrid from '@/components/home/ServicesGrid';

export default function ServicesPage() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
        <ServicesGrid />
      </div>
    </div>
  );
}
