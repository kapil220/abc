'use client';
import React from 'react';
import Image from 'next/image';

const clientLogos = [
  'https://res.cloudinary.com/dmqkf89ib/image/upload/v1744106771/landing/images/mdxmgryzg4iotixvdr5l.webp',
  'https://res.cloudinary.com/dmqkf89ib/image/upload/v1744131525/landing/images/oexll9rjqd46zyotxs6a.jpg',
  'https://res.cloudinary.com/dmqkf89ib/image/upload/v1744106772/landing/images/pguddll7yak6tplld2q2.webp',
 'https://res.cloudinary.com/dmqkf89ib/image/upload/v1744106778/landing/images/vkevdygiqjblo7mkdapo.webp',
  'https://res.cloudinary.com/dmqkf89ib/image/upload/v1744106773/landing/images/rhyrqca4vstx4taq0zcl.webp',
  'https://res.cloudinary.com/dmqkf89ib/image/upload/v1744106773/landing/images/mgvxfeno8ppyzccdbxwe.webp',
  'https://res.cloudinary.com/dmqkf89ib/image/upload/v1744106774/landing/images/kvgmoosjcjqy7syiml3p.webp',
  'https://res.cloudinary.com/dmqkf89ib/image/upload/v1744106775/landing/images/x8acrpcmphjxo8m6kvki.webp',
  'https://res.cloudinary.com/dmqkf89ib/image/upload/v1744106776/landing/images/pkfw7zrjjdfou8q8bq7f.webp',
  'https://res.cloudinary.com/dmqkf89ib/image/upload/v1744106777/landing/images/dhbeqapyfkyicgkhnguo.webp',
  'https://res.cloudinary.com/dmqkf89ib/image/upload/v1744131525/landing/images/oexll9rjqd46zyotxs6a.jpg',

  
  
];

const Clients = () => {
 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const extendedLogos = [...clientLogos, ...clientLogos];
  
  return (
    <section className="min-h-[80vh] md:min-h-[50vh] lg:min-h-[50vh] pt-12 md:pt-16 lg:pt-20 bg-gray-100 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium text-taupe text-center py-4 md:mb-16 ">
          Our Clients
        </h2>
        
      
<div className="block sm:hidden">
  <div className="grid grid-cols-2 gap-3 items-center">
    {clientLogos.map((logo, index) => {
      const isLastItem = index === clientLogos.length - 1;
      const isOdd = clientLogos.length % 2 !== 0;
      return (
        <div
          key={index}
          className={`flex items-center justify-center h-full py-4 ${
            isLastItem && isOdd ? 'col-span-2 justify-center' : ''
          }`}
        >
          <Image
            src={logo}
            alt={`Client ${index + 1}`}
            width={150}
            height={50}
            className="object-contain h-20"
            priority
          />
        </div>
      );
    })}
  </div>
</div>

        
        {/* Desktop/Tablet View - Continuous Slider */}
        <div className="hidden sm:block relative w-full overflow-hidden">
  {/* Left Fade Overlay */}
  <div className="absolute top-0 left-0 h-full w-48 bg-gradient-to-r from-gray-100 via-transparent to-transparent z-10 pointer-events-none"></div>

  {/* Right Fade Overlay */}
  <div className="absolute top-0 right-0 h-full w-48 bg-gradient-to-l from-gray-100 via-transparent to-transparent z-10 pointer-events-none"></div>

  <div className="flex animate-scroll">
    {/* First set of logos */}
    <div className="flex min-w-full">
      {clientLogos.map((logo, index) => (
        <div key={`first-${index}`} className="flex-shrink-0 w-1/4 lg:w-1/8 px-4">
          <div className="flex items-center justify-center py-12">
            <Image
              src={logo}
              alt={`Client ${index + 1}`}
              width={150}
              height={50}
              className="object-contain  h-60 md:h-24"
              priority
            />
          </div>
        </div>
      ))}
    </div>
    {/* Duplicate set of logos for seamless loop */}
   
  </div>
</div>

      </div>
    </section>
  );
};

export default Clients;