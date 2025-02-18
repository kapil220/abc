"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  name: string;
  phone: string;
  email: string;
  query: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    query: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const submissionData = {
      ...formData,
      submissionDate: new Date().toLocaleDateString(),
      timestamp: new Date().toISOString(),
    };
  
    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
  
      const data = await response.json();
      console.log("✅ Server Response:", data);
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }
      
      setSubmitStatus('success');
      setShowModal(true);
      setFormData({ name: "", phone: "", email: "", query: "" });
    } catch (error) {
      console.error("❌ Error submitting form:", error);
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
  
  return (
    <div className="h-screen flex flex-col lg:flex-row bg-isabelline md:h-[80vh] font-body">
      {/* Left Section - Schedule Meeting */}
      <motion.div 
        className="lg:w-1/2 p-6 lg:p-16 lg:pl-32 flex flex-col justify-center"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="max-w-md mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading text-taupe mb-6">Schedule a Free Session</h2>
          <p className="text-gray-900 mb-8 text-lg font-subheading">
            Book a complimentary 30-minute consultation with our experts. We will help you understand 
            how our services can benefit you and answer any questions you might have.
          </p>
          <motion.a
            href="YOUR_SCHEDULING_LINK_HERE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pineGreen text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule Meeting
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Right Section - Contact Form */}
      <motion.div 
        className="lg:w-1/2 bg-gray-100 py-12 lg:py-20 px-6 lg:pr-32"
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
          <h2 className="text-3xl md:text-4xl lg:text-7xl font-heading text-taupe mb-6">Contact Us</h2>
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
                className="w-full border-b-2 border-ashGray py-2 px-3 bg-transparent focus:border-pineGreen outline-none transition-colors"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                disabled={isLoading}
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <label className="block text-sm font-subheading text-pineGreen mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full border-b-2 border-ashGray py-2 px-3 bg-transparent focus:border-pineGreen outline-none transition-colors"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                disabled={isLoading}
              />
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
                className="w-full border-b-2 border-ashGray py-2 px-3 bg-transparent focus:border-pineGreen outline-none transition-colors"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                disabled={isLoading}
              />
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
                className="w-full border-b-2 border-ashGray py-2 px-3 bg-transparent focus:border-pineGreen outline-none resize-none transition-colors"
                value={formData.query}
                onChange={handleChange}
                placeholder="How can we help you?"
                disabled={isLoading}
              />
            </motion.div>

            <motion.button
              type="submit"
              className={`w-full py-4 rounded-lg text-white text-lg font-semibold ${
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
                      ? 'Your message has been submitted successfully. We will get back to you soon!'
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