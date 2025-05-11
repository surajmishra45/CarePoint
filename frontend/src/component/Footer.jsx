import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Footer = () => {
  return (
    <div className="bg-white text-gray-800 py-10 px-6 sm:px-10 md:px-16">
      {/* Main Footer Content */}
      <div className="flex flex-col lg:flex-row justify-between gap-36">
        {/* -----left section----- */}
        <div className="flex-1 text-center lg:text-left">
          <img src={assets.logo} alt="Logo" className="w-32 mx-auto lg:mx-0 mb-4" />
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, ex nostrum quod, velit iure
            aliquid beatae repellat reiciendis. Expedita.
          </p>
        </div>
        {/* -----center section----- */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-lg font-bold mb-4">Company</p>
          <ul className="space-y-2">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">About Us</li>
            <li className="hover:text-blue-600 cursor-pointer">Contact Us</li>
            <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
        {/* -----right section----- */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-lg font-bold mb-4">Get in Touch</p>
          <ul className="space-y-2">
            <li>+1-234-456-6543</li>
            <li>getTrackdev@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* Copyright Section */}
      <div className="mt-10">
        <hr className="border-gray-300" />
        <p className="text-center text-gray-500 mt-4">
          Copyright 2024 @ Prescripto - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
