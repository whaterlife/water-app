import React, { useState } from "react";
import { Info, Box, Wrench, Mail, BookOpen, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isProductsOpen, setProductsOpen] = useState(false);
  const [isEducationOpen, setEducationOpen] = useState(false);
  const [showPlumberLabel, setShowPlumberLabel] = useState(false);
  const [showSignupLabel, setShowSignupLabel] = useState(false);

  return (
    <nav className="text-cyan-600 px-8 relative z-10">
      <div className="container mx-auto flex justify-between items-center gap-x-4">
        <img src="./src/assets/images/hat.jpg" alt="logo" />
        <ul className="hidden md:flex space-x-8">
          <li className="flex items-center space-x-1">
            <Info size={18} />
            <a href="#about" className="hover:text-blue-800">About</a>
          </li>
          <li
            className="relative flex items-center space-x-1"
            onClick={() => setProductsOpen((prev) => !prev)}
          >
            <Box size={18} />
            <a href="#products" className="hover:text-blue-800">
              Products & Services
            </a>
            {isProductsOpen && (
              <div className="absolute top-full left-0 mt-2 w-40 bg-white text-cyan-600 shadow-lg rounded-md z-20">
                <a href="#plumbing-materials" className="block px-4 py-2 hover:bg-blue-800">
                  Plumbing Materials
                </a>
                <a href="#services" className="block px-4 py-2 hover:bg-blue-700">
                  Services
                </a>
              </div>
            )}
          </li>
          <li
            className="relative flex items-center space-x-1"
            onClick={() => setEducationOpen((prev) => !prev)}
          >
            <BookOpen size={18} />
            <a href="#education" className="hover:text-blue-700">
              Education
            </a>
            {isEducationOpen && (
              <div className="absolute top-full left-0 mt-2 w-40 bg-white text-cyan-600 shadow-lg rounded-md z-20">
                <a href="res">
                  <Link to="/res" className="block px-4 py-2 hover:bg-blue-100">Resources</Link>
                </a>
                <a href="pipe">
                  <Link to="/pipe" className="block px-4 py-2 hover:bg-blue-100">Pipes & Fittings</Link>
                </a>
                <a href="water">
                  <Link to="/water" className="block px-4 py-2 hover:bg-blue-100">Water Conservation Tips</Link>
                </a>
                <a href="camp">
                  <Link to="/camp" className="block px-4 py-2 hover:bg-blue-100">Events & Campaign</Link>
                </a>
              </div>
            )}
          </li>
          <li className="flex items-center space-x-1">
            <Wrench size={18} />
            <a href="#plumberlist"><Link to="/list" className="hover:text-blue-800">Plumberlist</Link></a>
          </li>
          <li className="flex items-center space-x-1">
            <Mail size={18} />
            <a href="#contact" className="hover:text-blue-800">Contact Us</a>
          </li>
        </ul>

        {/* Plumber Shortcut Icon with Tooltip */}
        <div
          onMouseEnter={() => setShowPlumberLabel(true)}
          onMouseLeave={() => setShowPlumberLabel(false)}
          className="relative flex items-center justify-center w-14 h-14 bg-white rounded-full hover:bg-gray-200 mr-6"
        >
          <Link to="/psign">
            <User size={35} className="text-blue-800" />
          </Link>
          {showPlumberLabel && (
            <span className="absolute right-full mr-2 px-2 py-1 bg-blue-400 text-blue-950 text-xs rounded-md">
              Plumber
            </span>
          )}
        </div>

        {/* Sign Up Button with Tooltip */}
        <div
          className="hidden md:block relative"
          onMouseEnter={() => setShowSignupLabel(true)}
          onMouseLeave={() => setShowSignupLabel(false)}
        >
          <Link to="/sign" className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-blue-800">Sign Up</Link>
          {showSignupLabel && (
            <span className="absolute right-full mr-2 px-2 py-1  bg-blue-400 text-blue-950 text-xs rounded-md">
              User here
            </span>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button className="text-blue-800">&#9776;</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



