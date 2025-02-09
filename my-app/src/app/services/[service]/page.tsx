import { services } from '@/lib/constant';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';

interface Service {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  benefits: string[];
  targetAudience: string;
  imageUrl: string;
}

export async function generateMetadata({ 
  params 
}: { 
  params: { service: string } 
}): Promise<Metadata> {
  const service = services.find((s): s is Service => s.slug === params.service);
  
  return {
    title: service?.name || 'Service Not Found',
    description: service?.shortDescription || 'Service description not available',
  };
}

export async function generateStaticParams() {
  return services.map((service: Service) => ({
    service: service.slug,
  }));
}

interface PageParams {
  service: string;
}

export default function Page({ 
  params 
}: { 
  params: PageParams 
}) {
  const service = services.find((s): s is Service => s.slug === params.service);

  if (!service) {
    notFound();
  }

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 relative w-full h-[400px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <h1 className="text-4xl font-bold text-center mb-12">{service.name}</h1>

        <div className="max-w-3xl mx-auto">
          <div className="prose max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-gray-600">{service.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
              <ul className="list-disc pl-6">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-600">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Who is this for?</h2>
              <p className="text-gray-600">{service.targetAudience}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}