"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { Route } from "next";
import { services } from '@/lib/constant';
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";



const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false); // State for Services Dropdown
  const menuRef = useRef<HTMLDivElement | null>(null); // Reference to the menu bar
  const servicesDropdownRef = useRef<HTMLDivElement | null>(null); // Reference to the dropdown

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleServicesDropdown = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (menuRef.current && !menuRef.current.contains(event.target as Node)) &&
        (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node))
      ) {
        setIsMenuOpen(false); // Close the mobile menu
        setIsServicesOpen(false); // Close the services dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-isabelline   text-gray-900 fixed w-full z-50 shadow-xl backdrop-blur-lg ">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
        <div className="flex items-center justify-between h-16 ">
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <Image 
                  className="h-16 md:h-28 w-auto " 
                  src="/images/logo.webp" 
                  alt="Logo" 
                  width={120}  
                  height={50}  
                  priority  
                />
                <span className="ml-2 text-xl font-heading font-bold text-taupe">The Ink Pot Group</span>
              </div>
            </Link>
          </div>

          <div className="lg:hidden px-4">
            <button
              onClick={toggleMenu}
              className="text-taupe focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <nav className="hidden lg:flex space-x-4 items-center ">
            <NavLink href="/about">About Us</NavLink>
            <ServicesDropdown
              ref={servicesDropdownRef}
              isOpen={isServicesOpen}
              toggleDropdown={toggleServicesDropdown}
            />
            <NavLink href="/work">Our Work</NavLink>
            <NavLink href="/#contact">Contact Us</NavLink>
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-gray-800 text-white space-y-4 py-4 px-6 z-50">
          <NavLink href="/about">About Us</NavLink>
          <ServicesDropdown
            isMobile
            ref={servicesDropdownRef}
            isOpen={isServicesOpen}
            toggleDropdown={toggleServicesDropdown}
          />
          <NavLink href="/#work">Our Work</NavLink>
          <NavLink href="/#contact">Contact Us</NavLink>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <Link href={href as Route}>

    <div className="hover:border-b-2 hover:border-pineGreen px-3 py-2 text-taupe font-heading text-lg font-medium cursor-pointer">
      {children}
    </div>
  </Link>
);

interface ServicesDropdownProps {
  isMobile?: boolean; // To differentiate behavior for mobile
  isOpen: boolean; // Pass the open/close state from parent
  toggleDropdown: () => void; // Toggle the dropdown
}

const dropIn = {
  hidden: { opacity: 0, y: -20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 12 },
  },
  exit: { opacity: 0, y: -20, scale: 0.8, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.07, type: "spring", stiffness: 120 },
  }),
};

const ServicesDropdown = React.forwardRef<HTMLDivElement, ServicesDropdownProps>((props, ref) => {
  return (
    <div ref={ref} className="relative">
      <div
        onClick={props.toggleDropdown}
        className="flex items-center  gap-1 hover:border-b-2 font-heading text-taupe hover:border-pineGreen px-4 py-2 text-lg font-medium cursor-pointer transition duration-300"
      >
        Services{" "}
        <motion.div
          animate={{ rotate: props.isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        animate={props.isOpen ? "visible" : "hidden"}
        exit="exit"
        variants={dropIn}
        className={`absolute left-0 top-10 mt-3 w-64 bg-white text-black rounded-lg shadow-xl z-50 p-3 border border-gray-200 overflow-hidden ${
          props.isOpen ? "block" : "hidden"
        }`}
      >
        {services.map(({ slug, name, imageUrl }, index) => (
          <motion.div key={slug} variants={itemVariants} initial="hidden" animate="visible" custom={index}>
            <Link href={`/services/${slug}`} passHref>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-pineGreen cursor-pointer transition duration-300">
                <Image src={imageUrl} alt={name} width={40} height={40} className="rounded-full" />
                <div>
                  <p className="text-sm font-heading font-semibold">{name}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

ServicesDropdown.displayName = 'ServicesDropdown';

export default Header;
