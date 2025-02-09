'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa'; // Import icons

interface FormData {
  name: string;
  phone: string;
  email: string;
  query: string;
}

const ContactForm: React.FC = () => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  const center = {
    lat: 40.748817,  // Replace with your preferred latitude
    lng: -73.985428, // Replace with your preferred longitude
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 p-4">
          {/* Map Section */}
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
            <div className="w-full h-96">
              <LoadScript googleMapsApiKey="AIzaSyCRh5VbZm30PWxkSx-oQ60qCDJT46S7_94">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={12}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mx-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Query</label>
                <textarea
                  name="query"
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3"
                  value={formData.query}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-1/2 bg-gray-800 text-white py-2 px-4 hover:rounded-xl"
              >
                Send Message
              </button>
            </form>

            {/* Social Media Links */}
            <div className="mt-8">
              
              <div className="flex justify-center space-x-4">
              <h3 className="text-xl font-semibold mb-4">Follow Us:</h3>
                <a href="https://www.instagram.com" target="_blank" className="text-gray-800">
                  <FaInstagram size={30} />
                </a>
                <a href="https://www.linkedin.com" target="_blank" className="text-gray-800">
                  <FaLinkedin size={30} />
                </a>
                <a href="https://www.facebook.com" target="_blank" className="text-gray-800">
                  <FaFacebook size={30} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
