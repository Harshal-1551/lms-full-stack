import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-cyan-800 to-blue-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 py-8 border-b border-white/20">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img 
              src={assets.logo} 
              alt="APARAITECH Logo" 
              className="w-28 md:w-32 mb-4 hover:scale-105 transition-transform duration-300" 
            />
            <p className="text-sm text-white/80 leading-relaxed mb-4 max-w-md">
              Empowering educators with cutting-edge tools to create, manage, and track learning experiences.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 md:gap-3 justify-center md:justify-start">
              <a
                href="https://www.youtube.com/@Aparaitech"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-red-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-red-500/25"
                aria-label="YouTube"
              >
                <FaYoutube className="text-white w-4 h-4 md:w-4 md:h-4" />
              </a>

              <a
                href="https://www.linkedin.com/company/aparaitech"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/25"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-white w-4 h-4 md:w-4 md:h-4" />
              </a>

              <a
                href="https://www.instagram.com/aparaitech_global/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-pink-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-pink-500/25"
                aria-label="Instagram"
              >
                <FaInstagram className="text-white w-4 h-4 md:w-4 md:h-4" />
              </a>

              <a
                href="https://twitter.com/aparaitech"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-black transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-black/25"
                aria-label="X (Twitter)"
              >
                <FaX className="text-white w-4 h-4 md:w-4 md:h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-semibold text-lg mb-4 text-white">Quick Links</h2>
            <ul className="grid grid-cols-2 gap-3 md:flex md:flex-col md:space-y-2 w-full max-w-xs">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-white/80 hover:text-cyan-300 transition-all duration-300 hover:translate-x-1 md:hover:translate-x-2 text-sm py-1 text-left"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <Link 
                  to="/educator/my-courses" 
                  className="text-white/80 hover:text-cyan-300 transition-all duration-300 hover:translate-x-1 md:hover:translate-x-2 text-sm py-1 block"
                >
                  My Projects
                </Link>
              </li>
              <li>
                <Link 
                  to="/educator/analytics" 
                  className="text-white/80 hover:text-cyan-300 transition-all duration-300 hover:translate-x-1 md:hover:translate-x-2 text-sm py-1 block"
                >
                  Analytics
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className="text-white/80 hover:text-cyan-300 transition-all duration-300 hover:translate-x-1 md:hover:translate-x-2 text-sm py-1 block"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link 
                  to="/support" 
                  className="text-white/80 hover:text-cyan-300 transition-all duration-300 hover:translate-x-1 md:hover:translate-x-2 text-sm py-1 block"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin Resources */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="font-semibold text-lg mb-4 text-white">Admin Resources</h2>
            <p className="text-sm text-white/80 mb-4 leading-relaxed max-w-md">
              Get the latest updates, tips, and resources for educators and administrators.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 border border-white/30 bg-white/10 placeholder-white/60 text-white px-3 py-2 rounded-lg sm:rounded-r-none sm:rounded-l-lg outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-200 backdrop-blur-sm text-sm"
              />
              <button className="bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-lg sm:rounded-l-none sm:rounded-r-lg font-medium shadow-lg hover:shadow-cyan-500/25 hover:scale-105 transition-all duration-300 whitespace-nowrap text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="py-4 text-center">
          <p className="text-xs text-white/60">
            &copy; 2025 APARAITECH Educator Dashboard. All Rights Reserved. 
            <span className="block sm:inline"> Designed for educators to excel.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;