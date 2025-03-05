"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  name: string;
  countryCode: string;
  phone: string;
  email: string;
  query: string;
}

interface FormErrors {
  name?: string;
  countryCode?: string;
  phone?: string;
  email?: string;
  query?: string;
}

interface CountryCode {
  code: string;
  name: string;
  flag: string;
}

// Define type for country data from API
interface CountryApiResponse {
  name: {
    common: string;
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  flags: {
    png: string;
  };
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    countryCode: '',
    phone: '',
    email: '',
    query: ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([]);
  const [filteredCodes, setFilteredCodes] = useState<CountryCode[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoadingCodes, setIsLoadingCodes] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch country codes from API
  useEffect(() => {
    const fetchCountryCodes = async () => {
      setIsLoadingCodes(true);
      try {
        // Using the REST Countries API to get country codes
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,flags');
        const data = await response.json() as CountryApiResponse[];
        
        // Process the API response to extract country codes
        const formattedCodes = data
          .filter((country) => country.idd && country.idd.root && country.idd.suffixes && country.idd.suffixes.length > 0)
          .map((country) => {
            // Some countries have multiple suffixes, we'll use the first one
            const suffix = country.idd.suffixes[0] || '';
            return {
              code: `${country.idd.root}${suffix}`,
              name: country.name.common,
              flag: country.flags.png
            };
          })
          // Remove duplicates by using a Map with code as the key
          .reduce((uniqueCodes, country) => {
            if (!uniqueCodes.has(country.code)) {
              uniqueCodes.set(country.code, country);
            }
            return uniqueCodes;
          }, new Map<string, CountryCode>());
        
        // Convert Map back to array and sort
        const uniqueFormattedCodes = Array.from(formattedCodes.values())
          .sort((a, b) => a.name.localeCompare(b.name));
        
        setCountryCodes(uniqueFormattedCodes);
        setFilteredCodes(uniqueFormattedCodes);
        
        // Set default country code (e.g., India +91)
        const indiaCode = uniqueFormattedCodes.find((c) => c.code === '+91');
        if (indiaCode) {
          setFormData(prevData => ({
            ...prevData,
            countryCode: indiaCode.code
          }));
        }
      } catch (error) {
        console.error('Error fetching country codes:', error);
        // Fallback to a minimal set of country codes if API fails
        const fallbackCodes = [
          { code: '+1', name: 'United States', flag: '/api/placeholder/24/16' },
          { code: '+91', name: 'India', flag: '/api/placeholder/24/16' },
        ];
        setCountryCodes(fallbackCodes);
        setFilteredCodes(fallbackCodes);
        setFormData(prevData => ({
          ...prevData,
          countryCode: '+91'
        }));
      } finally {
        setIsLoadingCodes(false);
      }
    };

    fetchCountryCodes();
  }, []);

  // Filter country codes based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCodes(countryCodes);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = countryCodes.filter(
        country => 
          country.name.toLowerCase().includes(query) || 
          country.code.includes(query)
      );
      setFilteredCodes(filtered);
    }
  }, [searchQuery, countryCodes]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    // Input validation as user types
    if (name === 'name') {
      // Only allow alphabets and spaces
      const nameValue = value.replace(/[^A-Za-z\s]/g, '');
      setFormData(prevData => ({
        ...prevData,
        [name]: nameValue
      }));
    } else if (name === 'countryCode') {
      // Only allow + and numbers
      const codeValue = value.replace(/[^0-9+]/g, '');
      setFormData(prevData => ({
        ...prevData,
        [name]: codeValue
      }));
    } else if (name === 'phone') {
      // Only allow numbers
      const phoneValue = value.replace(/[^0-9]/g, '');
      setFormData(prevData => ({
        ...prevData,
        [name]: phoneValue
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const selectCountryCode = (code: string) => {
    setFormData(prevData => ({
      ...prevData,
      countryCode: code
    }));
    
    // Clear any errors for country code
    if (formErrors.countryCode) {
      setFormErrors(prev => ({
        ...prev,
        countryCode: undefined
      }));
    }
    
    setIsDropdownOpen(false);
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    // Name validation - must contain only alphabets and spaces
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      errors.name = "Name should contain only alphabets";
    }
    
    // Country code validation
    if (!formData.countryCode.trim()) {
      errors.countryCode = "Country code is required";
    } else if (!/^\+[0-9]{1,4}$/.test(formData.countryCode)) {
      errors.countryCode = "Invalid country code format (e.g. +1, +91)";
    }
    
    // Phone validation - must be 10 digits
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (formData.phone.length !== 10) {
      errors.phone = "Phone number must be 10 digits";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    
    // Query validation
    if (!formData.query.trim()) {
      errors.query = "Please enter your message";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
  
    setIsLoading(true);
    setSubmitStatus(null);
  
    try {
      const submissionData = {
        ...formData,
        fullPhone: `${formData.countryCode}${formData.phone}`,
        submissionDate: new Date().toLocaleDateString(),
        timestamp: new Date().toISOString(),
      };
  
      const response = await fetch("/api/contact", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });
  
      // Log full response for debugging
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
  
      // Clone the response to allow multiple reads
      const responseClone = response.clone();
  
      // Check if response is ok
      if (!response.ok) {
        // Try to parse error message
        let errorData;
        try {
          errorData = await responseClone.json();
          console.error('Error response:', errorData);
          throw new Error(errorData.message || 'An unknown error occurred');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (parseError) {
          // If JSON parsing fails, try text
          const errorText = await responseClone.text();
          console.error('Error text:', errorText);
          throw new Error(errorText || 'An unknown error occurred');
        }
      }
  
      // Parse successful response
      const responseData = await response.json();
      console.log('Success response:', responseData);
  
      setSubmitStatus('success');
      setShowModal(true);
  
      // Reset form, keeping country code
      setFormData({
        name: "",
        countryCode: formData.countryCode,
        phone: "",
        email: "",
        query: ""
      });
  
    } catch (error) {
      console.error('❌ Complete Error Object:', error);
  
      // More detailed error logging
      console.error('Error Details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        name: error instanceof Error ? error.name : 'Unknown error type',
        stack: error instanceof Error ? error.stack : 'No stack trace'
      });
  
      setSubmitStatus('error');
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  const closeModal = () => {
    setShowModal(false);
    setSubmitStatus(null);
  };

  // Find selected country info
  const selectedCountry = countryCodes.find(c => c.code === formData.countryCode);
  
  return (
    <div className="h-full flex flex-col lg:flex-row bg-gradient-to-b from-gray-100 via-[#F8F4EF] to-[#E6DED7] font-body">
      {/* Left Section - Schedule Meeting */}
      <motion.div 
          className="lg:w-1/2 p-6 lg:p-6 lg:pl-44 md:pl-24 flex flex-col justify-center items-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="max-w-md w-full rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Card Image Section */}
            <div className="h-48 bg-taupe relative">
              <div className="absolute inset-0 bg-gradient-to-r from-taupe/90 to-taupe/70">
                <div className="p-6 h-full flex flex-col justify-end">
                  <span className="bg-white text-pineGreen px-3 py-1 rounded-full text-sm font-semibold inline-block w-fit mb-2">
                    Limited Time
                  </span>
                  <h3 className="text-white text-subheading font-bold text-xl">
                    Free 30-Minute Consultation
                  </h3>
                </div>
              </div>
            </div>
            
            {/* Card Content */}
            <div className="p-6">
              <h2 className="text-2xl md:text-3xl text-heading text-taupe mb-4">
                Schedule a Free Session
              </h2>
              <p className="text-taupe/80 mb-6 text-base font-body">
                Book a complimentary 30-minute consultation with our experts. We will help you understand 
                how our services can benefit you and answer any questions you might have.
              </p>
              
              {/* Benefits List */}
              <ul className="mb-6 space-y-2">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-pineGreen" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-taupe/80 text-base font-body">Personalized analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-pineGreen" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-taupe/80 text-base font-body">No obligation required</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-pineGreen" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-taupe/80 text-base font-body">Expert advice tailored to you</span>
                </li>
              </ul>
              
              <motion.a
                href="https://calendly.com/inkpotmediagroup/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full font-subheading text-center bg-taupe text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Meeting
              </motion.a>
              
              <p className="text-gray-500 text-sm mt-4 italic text-center">
                Join our list of satisfied clients who booked our consultation
              </p>
            </div>
          </motion.div>
        </motion.div>

      {/* Right Section - Contact Form */}
      <motion.div 
        className="lg:w-1/2 py-12 lg:py-20 px-6 lg:pr-32"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="max-w-md mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium text-taupe mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <label className="block text-sm font-subheading text-pineGreen mb-2">Name</label>
              <input
                type="text"
                name="name"
                required
                className={`w-full border-b-2 ${formErrors.name ? 'border-red-500' : 'border-ashGray'} py-2 px-3 bg-transparent focus:border-pineGreen outline-none transition-colors`}
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                disabled={isLoading}
              />
              {formErrors.name && (
                <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex space-x-3"
            >
              {/* Country Code Dropdown */}
              <div className="w-1/3 relative" ref={dropdownRef}>
                <label className="block text-sm font-subheading text-pineGreen mb-2">Country Code</label>
                <div 
                  className={`flex items-center border-b-2 ${formErrors.countryCode ? 'border-red-500' : 'border-ashGray'} py-2 px-3 bg-transparent focus:border-pineGreen cursor-pointer`}
                  onClick={() => !isLoading && setIsDropdownOpen(!isDropdownOpen)}
                >
                  {selectedCountry && selectedCountry.flag ? (
                    <img 
                      src={selectedCountry.flag} 
                      alt={selectedCountry.name} 
                      className="w-6 h-4 mr-2 object-cover"
                    />
                  ) : (
                    <div className="w-6 h-4 bg-gray-200 mr-2 rounded"></div>
                  )}
                  <span className="flex-1 truncate">{formData.countryCode || '+91'}</span>
                  <svg 
                    className={`w-4 h-4 text-taupe transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <motion.div 
                    className="absolute z-50 mt-1 w-64 max-h-64 overflow-y-auto bg-white rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Search input */}
                    <div className="p-2 border-b">
                      <input
                        type="text"
                        placeholder="Search countries..."
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pineGreen"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    
                    {isLoadingCodes ? (
                      <div className="p-4 text-center text-gray-500">Loading...</div>
                    ) : filteredCodes.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">No results found</div>
                    ) : (
                      <div className="py-2">
                        {filteredCodes.map((country) => (
                          <div
                            key={`${country.code}-${country.name}`}
                            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => selectCountryCode(country.code)}
                          >
                            {country.flag ? (
                              <img src={country.flag} alt={country.name} className="w-6 h-4 mr-3 object-cover" />
                            ) : (
                              <div className="w-6 h-4 bg-gray-200 mr-3 rounded"></div>
                            )}
                            <span className="flex-1 truncate">{country.name}</span>
                            <span className="text-gray-600 text-sm">{country.code}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
                
                {formErrors.countryCode && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.countryCode}</p>
                )}
              </div>

              <div className="w-2/3">
                <label className="block text-sm font-subheading text-pineGreen mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className={`w-full border-b-2 ${formErrors.phone ? 'border-red-500' : 'border-ashGray'} py-2 px-3 bg-transparent focus:border-pineGreen outline-none transition-colors`}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  maxLength={10}
                  disabled={isLoading}
                />
                {formErrors.phone && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <label className="block text-sm font-subheading text-pineGreen mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                className={`w-full border-b-2 ${formErrors.email ? 'border-red-500' : 'border-ashGray'} py-2 px-3 bg-transparent focus:border-pineGreen outline-none transition-colors`}
                value={formData.email}
                onChange={handleChange}
                placeholder="abc@id.com"
                disabled={isLoading}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <label className="block text-sm font-subheading text-pineGreen mb-2">Query</label>
              <textarea
                name="query"
                required
                rows={4}
                className={`w-full border-b-2 ${formErrors.query ? 'border-red-500' : 'border-ashGray'} py-2 px-3 bg-transparent focus:border-pineGreen outline-none resize-none transition-colors`}
                value={formData.query}
                onChange={handleChange}
                placeholder="How can we help you?"
                disabled={isLoading}
              />
              {formErrors.query && (
                <p className="text-red-500 text-xs mt-1">{formErrors.query}</p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              className={`w-full py-4 rounded-lg font-subheading text-white text-lg font-semibold ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-taupe hover:bg-opacity-90 transition-colors'
              }`}
              whileHover={isLoading ? {} : { scale: 1.02 }}
              whileTap={isLoading ? {} : { scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      {/* Fancy Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl overflow-hidden"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ 
                    background: submitStatus === 'success' ? 'linear-gradient(135deg, #84fab0, #8fd3f4)' : 'linear-gradient(135deg, #ff9a9e, #fad0c4)'
                  }}
                />
                
                <div className="relative z-10">
                  <div className="mb-4 flex justify-between items-start">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                      {submitStatus === 'success' ? (
                        <span className="flex items-center justify-center w-16 h-16 bg-green-100 text-green-500 rounded-full text-3xl">
                          ✓
                        </span>
                      ) : (
                        <span className="flex items-center justify-center w-16 h-16 bg-red-100 text-red-500 rounded-full text-3xl">
                          !
                        </span>
                      )}
                    </motion.div>
                    
                    <motion.button
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={closeModal}
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                  
                  <motion.h3
                    className="text-2xl font-bold mb-2 font-heading"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {submitStatus === 'success' ? 'Thank you!' : 'Oops!'}
                  </motion.h3>
                  
                  <motion.p
                    className="mb-6 text-gray-600"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {submitStatus === 'success'
                      ? 'Your message has been submitted successfully. We will get back to you in 24 hours!'
                      : 'There was an error submitting your form. Please try again or contact us directly.'}
                  </motion.p>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <button
                      onClick={closeModal}
                      className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors ${
                        submitStatus === 'success' ? 'bg-pineGreen hover:bg-opacity-90' : 'bg-taupe hover:bg-opacity-90'
                      }`}
                    >
                      {submitStatus === 'success' ? 'Got it!' : 'Try Again'}
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;