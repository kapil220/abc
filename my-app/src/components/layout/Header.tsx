"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Route } from "next";


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

  // Close the menu and dropdown if clicked outside
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
    <header className="bg-gray-800 text-white sticky top-0 z-50 shadow-md w-full" ref={menuRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img className="h-10 w-auto" src="/images/logo.webp" alt="Logo" />
                <span className="ml-2 font-bold">ACB Limited</span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
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

          {/* Navigation Links */}
          <nav className="hidden lg:flex space-x-4 items-center">
            <NavLink href="/about">About Us</NavLink>
            <ServicesDropdown
              ref={servicesDropdownRef}
              isOpen={isServicesOpen}
              toggleDropdown={toggleServicesDropdown}
            />
            <NavLink href="#work">Our Work</NavLink>
            <NavLink href="/#contact">Contact Us</NavLink>
          </nav>
        </div>
      </div>

      {/* Mobile Menu (Dropdown for smaller screens) */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-gray-800 text-white space-y-4 py-4 px-6 z-50">
          <NavLink href="/about">About Us</NavLink>
          <ServicesDropdown
            isMobile
            ref={servicesDropdownRef}
            isOpen={isServicesOpen}
            toggleDropdown={toggleServicesDropdown}
          />
          <NavLink href="#work">Our Work</NavLink>
          <NavLink href="/#contact">Contact Us</NavLink>
        </div>
      )}
    </header>
  );
};

// Component for individual navigation links
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <Link href={href as Route}>

    <div className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
      {children}
    </div>
  </Link>
);

// Component for the Services Dropdown
interface ServicesDropdownProps {
  isMobile?: boolean; // To differentiate behavior for mobile
  isOpen: boolean; // Pass the open/close state from parent
  toggleDropdown: () => void; // Toggle the dropdown
}

const ServicesDropdown = React.forwardRef<HTMLDivElement, ServicesDropdownProps>((props, ref) => {
  const services = ['Yoga1', 'Yoga2', 'Yoga3', 'Yoga4', 'Yoga5']; // Replace with your actual services

  return (
    <div ref={ref} className="relative">
      {/* Main Services Tab */}
      <div
        onClick={props.toggleDropdown} // Toggle dropdown on click
        className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
      >
        Services
      </div>

      {/* Dropdown Menu */}
      {props.isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
          {services.map((service) => (
            <Link key={service} href={`/services/${service.toLowerCase()}`} passHref>
              <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                {service}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
});

// Set the displayName for the component to avoid ESLint warning
ServicesDropdown.displayName = 'ServicesDropdown';

export default Header;
