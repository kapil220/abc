import React from 'react';

import { Instagram, Linkedin, Facebook, } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-center ">
      <div className="  text-center ">
    <div className=" flex flex-col items-center ">
      <div className="flex-shrink-0">
        <Link href="/">
          <div className="flex items-center filter brightness-51 cursor-pointer">
            <Image 
              className="h-40 w-auto" 
              src="/images/logowhite.png" 
              alt="Logo" 
              width={120}  
              height={50}  
              priority  
            />
            <span className="ml-2 text-4xl font-heading font-medium ">The Ink Pot Group</span>
          </div>
        </Link>
      </div>
      <p className="text-gray-400 font-subheading mb-6 max-w-md">
        Creating compelling digital experiences that transform brands and drive results. Your success story starts here.
      </p>
      <div className="flex space-x-4">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
          <Instagram className="h-6 w-6" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
          <Linkedin className="h-6 w-6" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
          <Facebook className="h-6 w-6" />
        </a>
      </div>
    </div>
  </div>
</div>


        <div className="border-t border-gray-600 mt-12 pt-8 text-center">
          <p className='font-subheading text-gray-400'>&copy; {new Date().getFullYear()} The Inkpot Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;