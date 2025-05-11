import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";

const About = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-4 py-16 lg:px-16 bg-gradient-to-b from-blue-50 to-white">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Our Healthcare Platform</h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Connecting patients with top medical professionals for exceptional care and treatment.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row gap-12 items-center max-w-6xl mx-auto mb-20">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <div
            className={`relative transition-all duration-700 ease-out transform ${
              animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
            }`}
          >
            <img
              src={assets.about_image}
              alt="About Us"
              className="w-full rounded-2xl shadow-xl border-8 border-white"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We're revolutionizing healthcare access by bridging the gap between patients and top-tier medical professionals. Our platform combines cutting-edge technology with compassionate care to deliver exceptional medical services.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Founded by a team of healthcare innovators, we understand the challenges patients face in finding quality care. That's why we've created a seamless experience that prioritizes your health and convenience.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Every feature we build, every doctor we onboard, and every service we offer is designed with one goal in mind: to make healthcare accessible, affordable, and effective for everyone.
          </p>
          <div className="pt-4">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg">
              Learn More About Our Team
            </button>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-8 bg-white py-16 rounded-2xl shadow-lg max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Platform</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine medical expertise with technological innovation to deliver exceptional healthcare experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-8">
          {/* Reason 1 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-blue-100">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Board-Certified Specialists</h3>
            <p className="text-gray-600 text-center">
              Our network includes only the most qualified and experienced medical professionals, rigorously vetted for excellence.
            </p>
          </div>

          {/* Reason 2 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-green-100">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Comprehensive Care Plans</h3>
            <p className="text-gray-600 text-center">
              Personalized treatment plans that address your unique health needs with holistic, patient-centered approaches.
            </p>
          </div>

          {/* Reason 3 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-yellow-100">
            <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Advanced Technology</h3>
            <p className="text-gray-600 text-center">
              Cutting-edge diagnostic tools and treatment technologies ensure the highest standard of medical care.
            </p>
          </div>

          {/* Reason 4 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-purple-100">
            <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">24/7 Availability</h3>
            <p className="text-gray-600 text-center">
              Access to care when you need it most, with emergency consultations and round-the-clock support.
            </p>
          </div>

          {/* Reason 5 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-red-100">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Compassionate Care</h3>
            <p className="text-gray-600 text-center">
              We treat every patient with empathy, respect, and dignity, creating a supportive healing environment.
            </p>
          </div>

          {/* Reason 6 */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-indigo-100">
            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Seamless Experience</h3>
            <p className="text-gray-600 text-center">
              Intuitive platform design makes booking appointments and managing your healthcare simple and stress-free.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-20 bg-blue-600 text-white py-16 rounded-2xl shadow-lg max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">10,000+</div>
            <div className="text-xl">Patients Served</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">500+</div>
            <div className="text-xl">Qualified Doctors</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">98%</div>
            <div className="text-xl">Patient Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;