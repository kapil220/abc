'use client';

import Image from 'next/image';

const clientLogos: string[] = [
  '/images/client1.jpg',
  '/images/client2.jpg',
  '/images/client3.jpg',
  '/images/client4.jpg'
];

const Clients: React.FC = () => {
  return (
    <section className="h-[50vh] bg-gray-100 flex items-center">
    <div className="max-w-7xl mx-auto px-4 w-full">
      <h2 className="text-7xl font-heading text-taupe text-center mb-8">Our Clients</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
        {clientLogos.map((logo, index) => (
          <div key={index} className="flex items-center justify-center h-full py-12">
            <Image
              src={logo}
              alt={`Client ${index + 1}`}
              width={150}
              height={50}
              className="object-contain h-12 md:h-24"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Clients;  // ✅ Ensure default export
