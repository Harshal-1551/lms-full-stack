import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-cyan-800 to-blue-900 text-white w-full mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 py-12 border-b border-white/20">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img 
              src={assets.logo} 
              alt="APARAITECH Logo" 
              className="w-32 md:w-36 mb-6 hover:scale-105 transition-transform duration-300" 
            />
            <p className="text-sm text-white/80 leading-relaxed mb-6 max-w-md">
              Learn anytime, anywhere with APARAITECH. Explore top-quality courses taught by industry experts and elevate your skills today.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 md:gap-4 justify-center md:justify-start">
              <a
                href="https://www.youtube.com/@Aparaitech"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-red-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-red-500/25"
                aria-label="YouTube"
              >
                <FaYoutube className="text-white w-4 h-4 md:w-5 md:h-5" />
              </a>

              <a
                href="https://www.linkedin.com/company/aparaitech"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/25"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-white w-4 h-4 md:w-5 md:h-5" />
              </a>

              <a
                href="https://www.instagram.com/aparaitech_global/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-pink-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-pink-500/25"
                aria-label="Instagram"
              >
                <FaInstagram className="text-white w-4 h-4 md:w-5 md:h-5" />
              </a>

              <a
                href="https://twitter.com/aparaitech"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-black transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-black/25"
                aria-label="X (Twitter)"
              >
                <FaX className="text-white w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-semibold text-lg md:text-xl mb-6 text-white">Company</h2>
            <ul className="grid grid-cols-2 gap-3 md:flex md:flex-col md:space-y-3 w-full max-w-xs">
               <li>
                <Link 
                  to="/" 
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-white/80 hover:text-cyan-300 transition-all duration-300 hover:translate-x-1 md:hover:translate-x-2 text-sm md:text-base py-1 block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-white/80 hover:text-cyan-300 transition-all duration-300 hover:translate-x-1 md:hover:translate-x-2 text-sm md:text-base py-1 block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/course-list" 
                  className="text-white/80 hover:text-cyan-300 transition-all duration-300 hover:translate-x-1 md:hover:translate-x-2 text-sm md:text-base py-1 block"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-white/80 hover:text-cyan-300 transition-all duration-300 hover:translate-x-1 md:hover:translate-x-2 text-sm md:text-base py-1 block"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-white/80 hover:text-cyan-300 transition-all duration-300 hover:translate-x-1 md:hover:translate-x-2 text-sm md:text-base py-1 block"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="font-semibold text-lg md:text-xl mb-6 text-white">Stay Updated</h2>
            <p className="text-sm text-white/80 mb-6 leading-relaxed max-w-md">
              Get weekly updates on new projects, tips, and exclusive offers delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border border-white/30 bg-white/10 placeholder-white/60 text-white px-4 py-3 rounded-lg sm:rounded-r-none sm:rounded-l-lg outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-200 backdrop-blur-sm"
              />
              <button className="bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg font-medium shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="py-6 text-center">
          <p className="text-xs md:text-sm text-white/60">
            &copy; 2025 APARAITECH LMS. All Rights Reserved. Designed with passion to help learners excel.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;