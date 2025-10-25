import React from "react";

function Navbar() {
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg p-2">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Pune Metro
            </span>
          </div>
          
          <div className="flex space-x-1 bg-gray-100 rounded-full p-1">
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium transition-all duration-300">
              Home
            </button>
            <button className="px-6 py-2 rounded-full hover:bg-white text-gray-700 font-medium transition-all duration-300">
              Booking
            </button>
            <button className="px-6 py-2 rounded-full hover:bg-white text-gray-700 font-medium transition-all duration-300">
              About Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
