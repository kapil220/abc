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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const servicesDropdownRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const toggleServicesDropdown = () => {
    setIsServicesOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside menu and not on the hamburger
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <header className="bg-isabelline bg-transparent text-gray-900 fixed w-full z-50 shadow-xl backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 md:py-4">
        <div className="flex items-center justify-between h-16 ">
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <Image 
                  className="h-16 md:h-28 w-auto max-w-full object-contain"  
                  src="/images/logo.webp" 
                  alt="Logo" 
                  width={120}  
                  height={50}  
                  priority  
                />
                <span className="ml-2 text-2xl md:text-3xl lg:text-4xl font-heading font-medium text-taupe">
                  The Ink Pot Group
                </span>
              </div>
            </Link>
          </div>

          <div className="lg:hidden px-4">
            <button
              ref={hamburgerRef}
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
        <div
          className="lg:hidden absolute top-16 left-0 w-full bg-ashGray text-white py-4 px-6 z-50 flex flex-col space-y-2"
          ref={menuRef}
        >
          <NavLink href="/about" onClick={closeMenu}>About Us</NavLink>
          <ServicesDropdown
            isMobile
            ref={servicesDropdownRef}
            isOpen={isServicesOpen}
            toggleDropdown={toggleServicesDropdown}
            onLinkClick={closeMenu}
          />
          <NavLink href="/work" onClick={closeMenu}>Our Work</NavLink>
          <NavLink href="/#contact" onClick={closeMenu}>Contact Us</NavLink>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => (
  <Link href={href as Route} onClick={onClick}>
    <div className="hover:border-b-2 hover:border-pineGreen px-4 py-2 text-taupe font-heading text-xl cursor-pointer">
      {children}
    </div>
  </Link>
);

interface ServicesDropdownProps {
  isMobile?: boolean;
  isOpen: boolean;
  toggleDropdown: () => void;
  onLinkClick?: () => void;
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
    <div 
      ref={ref} 
      className="relative"
      // Remove onMouseLeave for mobile to prevent unintended closing
      {...(!props.isMobile ? { onMouseLeave: props.toggleDropdown } : {})}
    > 
      <div
        onClick={props.toggleDropdown}
        className="flex items-center gap-1 hover:border-b-2 font-heading text-taupe hover:border-pineGreen px-4 py-2 text-xl cursor-pointer transition duration-300"
      >
        Services{" "}
        <motion.div
          animate={{ rotate: props.isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="w-3 h-3" />
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
          <motion.div 
            key={slug} 
            variants={itemVariants} 
            initial="hidden" 
            animate="visible" 
            custom={index}
          >
            <Link 
              href={`/services/${slug}`} 
              passHref 
              onClick={() => {
                // Close dropdown and mobile menu when a link is clicked
                props.toggleDropdown();
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                props.onLinkClick && props.onLinkClick();
              }}
            >
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