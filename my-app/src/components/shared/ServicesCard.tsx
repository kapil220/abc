'use client';
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
      <div className="w-1/2 pr-4 flex flex-col items-center text-center">
  <h3 className="text-2xl font-base uppercase text-white font-subheading mb-2">
    {service.name}
  </h3>
  <h2 className="font-medium text-wisteria font-body text-md mb-4">
    {service.shortDescription}
  </h2>
  <div className="flex justify-center mt-4">
    <button className="px-4 py-1.5 bg-gradient-to-r font-subheading from-ashGray to-wisteria text-white font-semibold text-lg rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition duration-300">
      View Details
    </button>
  </div>
</div>


      {/* Image Section */}
      <div className="w-1/2">
  <div className="relative h-40  md:h-56 lg:h-72">
    <Image
      src={service.imageUrl}
      alt={service.name}
      layout="fill"
      objectFit="contain" // Change from "cover" to "contain"
      className=""
    />
  </div>
</div>

    </Link>
  );
};

export default ServiceCard;
