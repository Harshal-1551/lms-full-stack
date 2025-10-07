import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-cyan-800 to-blue-900 text-white w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-36 justify-between gap-10 py-12 border-b border-white/20">

        {/* Logo & Description */}
        <div className="flex flex-col md:items-start items-center w-full md:w-1/3">
          <img src={assets.logo} alt="logo" className="w-36 mb-4" />
          <p className="text-center md:text-left text-sm text-white/80">
            Learn anytime, anywhere with APARAITECH. Explore top-quality courses taught by industry experts and elevate your skills today.
          </p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col md:items-start items-center w-full md:w-1/3">
          <h2 className="font-semibold text-lg mb-5">Company</h2>
          <ul className="flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2">
            <li><a href="#" className="hover:text-cyan-300 transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-cyan-300 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-cyan-300 transition-colors">Courses</a></li>
            <li><a href="#" className="hover:text-cyan-300 transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-cyan-300 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
          <h2 className="font-semibold text-lg mb-5">Subscribe to our newsletter</h2>
          <p className="text-sm text-white/80 mb-4 text-center md:text-left">
            Get weekly updates on new courses, tips, and exclusive offers delivered straight to your inbox.
          </p>
          <div className="flex items-center gap-2 w-full max-w-md">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 border border-white/30 bg-white/10 placeholder-white/60 text-white px-3 py-2 rounded-l-md outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
            />
            <button className="bg-cyan-500 hover:bg-blue-500 text-white px-5 py-2 rounded-r-md font-medium shadow-md hover:shadow-lg transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <p className="py-6 text-center text-xs md:text-sm text-white/60">
        &copy; 2024 APARAITECH LMS. All Rights Reserved. Designed with passion to help learners excel.
      </p>
    </footer>
  );
};

export default Footer;
