import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="w-full border-t bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300">
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <img
          className="hidden md:block w-16 md:w-20 opacity-90 hover:opacity-100 transition-opacity"
          src={assets.logo}
          alt="logo"
        />
        <div className="hidden md:block h-6 w-px bg-gray-400/50"></div>
        <p className="text-xs md:text-sm">
          © 2025 <span className="font-semibold text-gray-800 dark:text-gray-200">APARAITECH LMS</span>. All rights reserved.
        </p>
      </div>

      {/* Right Section - Social Icons */}
      <div className="flex items-center gap-5">
        <a
          href="#"
          className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/40 hover:bg-blue-200 dark:hover:bg-blue-800 transition-all"
        >
          <img className="w-5 md:w-6 invert-0 dark:invert" src={assets.facebook_icon} alt="facebook_icon" />
        </a>
        <a
          href="#"
          className="p-2 rounded-full bg-sky-100 dark:bg-sky-900/40 hover:bg-sky-200 dark:hover:bg-sky-800 transition-all"
        >
          <img className="w-5 md:w-6 invert-0 dark:invert" src={assets.twitter_icon} alt="twitter_icon" />
        </a>
        <a
          href="#"
          className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/40 hover:bg-pink-200 dark:hover:bg-pink-800 transition-all"
        >
          <img className="w-5 md:w-6 invert-0 dark:invert" src={assets.instagram_icon} alt="instagram_icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
