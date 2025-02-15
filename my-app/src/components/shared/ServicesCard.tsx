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
      className="flex items-center p-8 bg-taupe bg-blur border-t border-gray-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.02] duration-300 w-full space-x-6"
    >
      {/* Text Section */}
      <div className="w-1/2 pr-4">
        <h3 className="text-2xl font-bold uppercase text-white  mb-2">{service.name}</h3>
        <h2 className=" font-medium text-wisteria text-lg mb-4">{service.shortDescription}</h2>
        <button className="mt-4 px-4 py-2 bg-white text-gray-900 rounded-md shadow hover:bg-gray-300 transition duration-300">
          View Details
        </button>
      </div>

      {/* Image Section */}
      <div className="w-1/2">
        <div className="relative  h-40 md:h-56 lg:h-72">
          <Image
            src={service.imageUrl}
            alt={service.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-md object-contain"
          />
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
