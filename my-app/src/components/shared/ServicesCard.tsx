import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Service {
  name: string;
  slug: string;
  shortDescription: string;
  imageUrl: string; // Image URL for each service
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Link 
      href={`/services/${service.slug}`}
      className="flex items-center p-8 bg-gray-900 border-t border-gray-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.02] duration-300 w-full space-x-6"
    >
      {/* Text Section */}
      <div className="w-1/2 pr-4">
        <h3 className="text-purple-400 text-sm uppercase font-medium mb-2">{service.name}</h3>
        <h2 className="text-3xl font-bold mb-4">{service.shortDescription}</h2>
        <button className="mt-4 px-4 py-2 bg-white text-gray-900 rounded-md shadow hover:bg-gray-200 transition duration-300">
          View Details
        </button>
      </div>

      {/* Image Section */}
      <div className="w-1/2">
        <div className="relative w-full h-40 md:h-56 lg:h-64">
          <Image
            src={service.imageUrl}
            alt={service.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
