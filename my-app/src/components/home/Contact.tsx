"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';

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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString();
    const submissionData = {
      ...formData,
      submissionDate: currentDate,
      timestamp: new Date().toISOString()
    };
  
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
  
      const data = await response.json();
      console.log('Form submitted successfully!', data);
  
      alert('Your message has been submitted successfully!');
  
      // Clear form after successful submission
      setFormData({
        name: '',
        phone: '',
        email: '',
        query: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit the form. Please try again.');
    }
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
        className="lg:w-1/2 bg-gray-100 py-6 lg:py-20 px-6 lg:pr-32"
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
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-taupe text-white py-4 rounded-lg hover:bg-opacity-90 transition-colors text-lg font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
