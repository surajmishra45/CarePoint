import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 lg:px-16">
      {/* Header */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Get In Touch With Us
        </h1>
        <p className="text-xl text-gray-600">
          Whether you need assistance or want to explore career opportunities, our team is here to help.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
        {/* Image Section */}
        <div
          className={`lg:w-1/2 transition-all duration-700 ease-out ${
            animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
          }`}
        >
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full rounded-2xl shadow-xl border-8 border-white"
          />
        </div>

        {/* Contact Information Section */}
        <div
          className={`lg:w-1/2 space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-opacity duration-700 ${
            animate ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Contact Information
          </h2>
          
          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Our Office</h3>
                <p className="text-gray-600">
                  543678 William Station<br />
                  Suite 340, Washington, USA
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Email Us</h3>
                <p className="text-gray-600">
                  info@company.com<br />
                  support@company.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Call Us</h3>
                <p className="text-gray-600">
                  +1 (555) 123-4567 (Office)<br />
                  +1 (555) 987-6543 (Support)
                </p>
              </div>
            </div>

            {/* Career Opportunities */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold text-blue-600 mb-3">
                Interested in joining our team?
              </h3>
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg">
                Explore Career Opportunities
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Contact Form Section */}
      <div className="mt-20 bg-white rounded-2xl shadow-lg max-w-4xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Send Us a Message
        </h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="What's this about?"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your message here..."
            ></textarea>
          </div>
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;